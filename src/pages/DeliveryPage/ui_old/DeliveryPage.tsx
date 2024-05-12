import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks.ts";
import React, { useState } from "react";
import Button from "../../../shared/Button.tsx";
import CompanyCards from "../../../widget/CompanyCards.tsx";
import Input from "../../../shared/Input.tsx";
import {
  setAddress,
  setExactAddress,
} from "../../../store/slices/orderSlice.ts";
import { useNavigate } from "react-router-dom";
import MainMap from "./MainMap.tsx";
import DeliverySwitch from "./DeliverySwitch.tsx";
import SelectCard from "../../../entities/SelectCard.tsx";
import Icon from "../../../shared/Icon";

const DeliveryPage = () => {
  const orderState = useAppSelector((state) => state.order);
  const companyState = useAppSelector((state) => state.companies);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isDelivery, setIsDelivery] = useState(true);
  const [errorText, setErrorText] = useState("");
  const emptyAddressParsed = "Адрес указан на карте";

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
    setErrorText("");
  };

  const onSubmit = () => {
    if (
      (orderState.address.lat === -1 || orderState.address.lat === 0) &&
      orderState.address.parsed === ""
    ) {
      setErrorText(
        "Выберите адрес на карте или введите адрес перед сохранением",
      );
    } else {
      navigate("/cart");
    }
  };

  return (
    <div className="relative flex min-h-[100vh] flex-col justify-between">
      <div>
        <MainMap
          setErrorText={setErrorText}
          isDelivery={isDelivery}
          companyState={companyState}
          orderState={orderState}
        />

        <div className="mx-5 mb-[30px]">
          <DeliverySwitch
            className="my-[30px]"
            isDelivery={isDelivery}
            setIsDelivery={setIsDelivery}
          />

          {!isDelivery && (
            <CompanyCards companySpots={companyState.companies} />
          )}

          {isDelivery && (
            <div className="mt-[20px] flex flex-col gap-5">
              <SelectCard
                className="my-0"
                name="Прошлые адреса"
                description="Нажмите, чтобы выбрать"
                leftIcon="geo"
              >
                <Icon type="arrowRight" />
              </SelectCard>

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
      </div>
      <Button
        className={"z-10 h-[50px] w-full rounded-none"}
        onClick={onSubmit}
        text="Сохранить"
      />
    </div>
  );
};
export default DeliveryPage;
