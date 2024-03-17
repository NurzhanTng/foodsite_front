import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
import React, { useEffect, useState } from "react";
import Button from "../../../shared/Button.tsx";
import CompanyCards from "../../../widget/CompanyCards.tsx";
import Input from "../../../shared/Input.tsx";
import {
  setAddress,
  setExactAddress,
} from "../../../store/slices/orderSlice.ts";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [isDelivery, setIsDelivery] = useState(true);
  const [companySpots, setCompanySpots] = useState<Array<CompanySpot>>([]);
  const [errorText, setErrorText] = useState("");
  const emptyAddressParsed = "Адрес указан на карте";

  useEffect(() => {
    setCompanySpots([
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
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let pattern = event.target.value;
    pattern = pattern.replace(emptyAddressParsed, "");
    pattern = pattern.replace(
      emptyAddressParsed.slice(0, emptyAddressParsed.length - 1),
      "",
    );
    dispatch(
      setAddress({
        long: -1,
        lat: -1,
        parsed: pattern,
      }),
    );
    setErrorText("")
  };

  const onSubmit = () => {
    if (
      (orderState.address.lat === -1 ||
      orderState.address.lat === 0) &&
      orderState.address.parsed === ""
    ) {
      setErrorText(
        "Выберите адрес на карте или введите адрес перед сохранением",
      );
    } else {
      navigate("/cart");
    }
  };

  const onClick = (props: any) => {
    const [lat, long] = props.get("coords");
    dispatch(setAddress({ lat: lat, long: long, parsed: "" }));
    setErrorText("")
  };

  return (
    <div className="relative h-[100vh]">
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

      <div className="mx-5 mb-[80px]">
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
          <div className="mt-[50px] flex flex-col gap-5">
            {/*<SelectCard*/}
            {/*  name="Прошлые адреса"*/}
            {/*  description="Нажмите, чтобы выбрать"*/}
            {/*  leftIcon="geo"*/}
            {/*>*/}
            {/*  <Icon type="arrowRight" />*/}
            {/*</SelectCard>*/}

            <Input
              onChange={handleChange}
              value={
                orderState.address.lat === -1 || orderState.address.lat === 0
                  ? orderState.address.parsed
                  : emptyAddressParsed
              }
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

        {errorText !== "" && (
          <p className="mb-[30px] mt-[30px] font-medium text-fontSecondary">
            {errorText}
          </p>
        )}
      </div>
      <Button
        className={"absolute bottom-0 z-10 h-[50px] w-full rounded-none"}
        onClick={onSubmit}
        text="Сохранить"
      />
    </div>
  );
};
export default DeliveryPage;