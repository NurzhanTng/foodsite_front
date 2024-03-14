import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
import { useEffect, useState } from "react";
import Button from "../../../shared/Button.tsx";
import { getAddress, getCoordinates } from "../../../utils/fetchAddress.ts";
import CompanyCards from "../../../widget/CompanyCards.tsx";
import SelectCard from "../../../entities/SelectCard.tsx";
import Icon from "../../../shared/Icon";
import Input from "../../../shared/Input.tsx";
import {
  setAddress,
  setExactAddress,
} from "../../../store/slices/orderSlice.ts";
import { useNavigate } from "react-router-dom";
import { set } from "@pbe/react-yandex-maps/typings/util/set";

export type CompanySpot = {
  id: number;
  name: string;
  link: string;
  manager_id: number;
  address: { long: number; lat: number; parsed?: string };
  address_link: string;
  deliveryLayers: Array<[number, number][]>;

  open_time: string;
  close_time: string;
};

const DeliveryPage = () => {
  const orderState = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();
  const [isDelivery, setIsDelivery] = useState(true);
  const [companySpots, setCompanySpots] = useState<Array<CompanySpot>>([
    {
      id: 0,
      name: "Название точки 1",
      link: "ссылка на точку",
      manager_id: 0,
      address: { long: 76.91607387419788, lat: 43.251934750000004 },
      address_link: "",
      deliveryLayers: [],

      open_time: "10:00",
      close_time: "21:00",
    },
    {
      id: 1,
      name: "Название точки 2",
      link: "ссылка на точку",
      manager_id: 0,
      address: { long: 76.92607387419788, lat: 43.22193475000004 },
      address_link: "",
      deliveryLayers: [],

      open_time: "10:00",
      close_time: "21:00",
    },
  ]);

  const [address, setMapAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useeffect");
    if (orderState.address.parsed === "") {
      getAddress(orderState.address.lat, orderState.address.long).then(
        (data) => {
          dispatch(
            setAddress({
              ...orderState.address,
              parsed: data === "" ? " " : data,
            }),
          );
        },
      );
    } else {
      setMapAddress(orderState.address.parsed);
    }
  }, [dispatch, orderState.address.lat]);

  let typingTimer: NodeJS.Timeout;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setMapAddress(event.target.value);
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      console.log("Address found started");
      getCoordinates(event.target.value).then((data) => {
        console.log(data);
        dispatch(
          setAddress({
            long: data?.lon,
            lat: data?.lat,
            parsed: event.target.value,
          }),
        );
      });
    }, 3000); // Adjust the delay as needed (in milliseconds)
  };

  const onClick = (props: any) => {
    console.log(props);
    const [lat, long] = props.get("coords");
    dispatch(setAddress({ long: long, lat: lat }));
  };

  useEffect(() => {
    const newSpots = [...companySpots];
    for (let i = 0; i < companySpots.length; i++) {
      getAddress(
        companySpots[i].address.lat,
        companySpots[i].address.long,
      ).then((data) => {
        newSpots[i].address.parsed = data;
      });
    }
    setCompanySpots(newSpots);
  }, [companySpots]);

  return (
    <>
      <YMaps>
        <Map
          width="100%"
          height="340px"
          defaultState={{ center: [43.244077, 76.916799], zoom: 11 }}
          onClick={onClick}
        >
          {!isDelivery &&
            companySpots.map((companySpot, index) => {
              return (
                <Placemark
                  options={{
                    iconColor:
                      orderState.company_id === companySpot.id
                        ? "#5288C1"
                        : "#6A7D91",
                  }}
                  key={index}
                  geometry={[companySpot.address.lat, companySpot.address.long]}
                />
              );
            })}
          {isDelivery && (
            <Placemark
              options={{
                iconColor: "#5288C1",
              }}
              geometry={[orderState.address.lat, orderState.address.long]}
            />
          )}
        </Map>
      </YMaps>

      <div className="mx-5 mb-[30px]">
        <div className="my-[30px] flex flex-row justify-between rounded-full border-2 border-button">
          <Button
            className="py-auto h-10 rounded-full px-5"
            text="Доставка"
            showIcon={true}
            iconType="delivery"
            styleType={isDelivery ? "primary" : "secondary"}
            onClick={() => setIsDelivery(true)}
          />

          <Button
            className="py-auto h-10 rounded-full px-5"
            text="С собой"
            showIcon={true}
            iconType="humanWalk"
            styleType={!isDelivery ? "primary" : "secondary"}
            onClick={() => setIsDelivery(false)}
          />
        </div>

        {!isDelivery && <CompanyCards companySpots={companySpots} />}
        {isDelivery && (
          <div className="flex flex-col gap-5">
            <SelectCard
              name="Прошлые адреса"
              description="Нажмите, чтобы выбрать"
              leftIcon="geo"
            >
              <Icon type="arrowRight" />
            </SelectCard>

            <Input
              onChange={handleChange}
              value={address}
              label="Введите адрес доставки"
            />

            <Input
              onChange={(event) =>
                dispatch(setExactAddress(event.target.value))
              }
              value={orderState.exactAddress}
              label="Введите номер квартиры / офиса"
            />
          </div>
        )}
      </div>
      <Button
        className={"z-10 h-[50px] w-full rounded-none"}
        onClick={() => navigate("/cart")}
        text="Сохранить"
      />
    </>
  );
};
export default DeliveryPage;
