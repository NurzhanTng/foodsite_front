import React, { useEffect, useState } from "react";

import DeliverySwitch from "../ui_old/DeliverySwitch.tsx";
import BottomSlide from "../../../features/BottomSlide";
import CompanyCards from "../../../widget/CompanyCards.tsx";
import Input from "../../../shared/Input.tsx";
import Button from "../../../shared/Button.tsx";
import fetchAddressesByName, {
  Address,
} from "../fetch/fetchAddressesByName.ts";
import { useDispatch } from "react-redux";
import {
  OrderState,
  setAddress,
  setExactAddress,
} from "../../../store/slices/orderSlice.ts";
import getCenterOfPolygon from "../../../utils/getCenterOfPolygon.ts";
import { useNavigate } from "react-router-dom";
import { CompanyState } from "../../../store/slices/companySlice.ts";
import checkIsInPolygon from "../../../utils/checkIsInPolygon.ts";

type SlideMenuProps = {
  errorText: string;
  setErrorText: (text: string) => void;
  isDelivery: boolean;
  setIsDelivery: (isDelivery: boolean) => void;
  companyState: CompanyState;
  orderState: OrderState;
};

const SlideMenu = ({
  errorText,
  setErrorText,
  isDelivery,
  setIsDelivery,
  companyState,
  orderState,
}: SlideMenuProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [stage, setStage] = useState<0 | 1 | 2>(1);
  const [address, setAddressText] = useState(orderState.address.parsed);
  const [fetchResult, setFetchResult] = useState<Address[] | null>(null);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const handleAddressChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const text = event.target.value;
    setAddressText(text);

    if (timerId) clearTimeout(timerId);
    const newTimerId = setTimeout(() => {
      fetchAddressesByName(text)
        .then((data) => {
          console.log("Adresses:", data);
          return data;
        })
        .then((data) => {
          if (data.length === 1) {
            handleChooseAddress(data[0]);
            return;
          }

          setFetchResult(data);
        });
    }, 300);
    setTimerId(newTimerId);
  };

  const handleChooseAddress = (address: Address) => {
    setFetchResult(null);
    setAddressText(address.address);
    const [lat, long] = getCenterOfPolygon(address.coordinates);
    dispatch(
      setAddress({
        lat: lat,
        long: long,
        parsed: address.address,
      }),
    );
  };

  useEffect(() => {
    // Clear the timer when the component unmounts
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, []);

  const handleSaveButton = () => {
    if (isDelivery && orderState.address.parsed === "") {
      setErrorText("Необходимо выбрать адрес для доставки");
      return;
    }
    if (isDelivery && orderState.exactAddress === "") {
      setErrorText("Необходимо выбрать квартиру/офис");
      return;
    }
    if (!isDelivery && orderState.company_id === -1) {
      setErrorText("Необходимо выбрать точку для самовывоза");
      return;
    }
    if (
      !checkIsInPolygon(companyState.companies[0].delivery_layers[0].points, [
        orderState.address.long,
        orderState.address.lat,
      ])
    ) {
      setErrorText("Ваш адрес вне зоны доставки");
      return;
    }

    navigate("/cart");
  };

  return (
    <BottomSlide
      className="z-0 overflow-y-auto bg-bgColor px-[20px] pb-[70px]"
      setStage={setStage}
    >
      <div className="absolute left-[50%] top-[7px] h-[3px] w-[50px] translate-x-[-50%] rounded-[90px] bg-button "></div>

      <DeliverySwitch
        className="my-[30px]"
        isDelivery={isDelivery}
        setIsDelivery={setIsDelivery}
      />

      {stage !== 0 && !isDelivery && (
        <CompanyCards companySpots={companyState.companies} />
      )}

      {stage !== 0 && isDelivery && (
        <div className="mt-[20px] flex flex-col gap-5">
          {/*<SelectCard*/}
          {/*  className="my-0"*/}
          {/*  name="Прошлые адреса"*/}
          {/*  description="Нажмите, чтобы выбрать"*/}
          {/*  leftIcon="geo"*/}
          {/*>*/}
          {/*  <Icon className="h-4 w-4" type="arrowRight" />*/}
          {/*</SelectCard>*/}

          <Input
            onChange={handleAddressChange}
            value={address}
            label="Введите адрес доставки"
          />

          {fetchResult && (
            <ul>
              <h3 className="mb-4 text-base font-medium text-textSecondary">
                Выберите адрес
              </h3>
              {fetchResult.map((item, index) => (
                <li
                  className="pb-2 pl-4 text-sm text-fontSecondary transition active:text-button"
                  key={index}
                  onClick={() => handleChooseAddress(item)}
                >
                  {item.address}
                </li>
              ))}
            </ul>
          )}

          <Input
            onChange={(event) => dispatch(setExactAddress(event.target.value))}
            value={orderState.exactAddress}
            label="Введите номер квартиры / офиса"
          />
        </div>
      )}

      {errorText !== "" && (
        <p className="mb-[30px] mt-[30px] font-medium text-[#BA4747]">
          {errorText}
        </p>
      )}

      <Button
        className=" fixed bottom-0 left-0 z-20 h-[50px] w-full rounded-none"
        onClick={handleSaveButton}
        text="Сохранить"
      />
    </BottomSlide>
  );
};

export default SlideMenu;
