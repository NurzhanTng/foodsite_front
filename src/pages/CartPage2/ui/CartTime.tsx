import Icon from "../../../shared/Icon";
import Button from "../../../shared/Button.tsx";
import TimePicker from "../../../shared/TimePicker";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks.ts";
import { useEffect, useState } from "react";
import { setDoneTime } from "../../../store/slices/orderSlice.ts";
import { setErrors } from "../../../store/slices/mainSlice.ts";
import SelectCard from "../../../entities/SelectCard.tsx";
import { useNavigate } from "react-router-dom";

const CartTime = () => {
  const orderState = useAppSelector((state) => state.order);
  const navigate = useNavigate();
  const isDelivery = useAppSelector((state) => state.order.isDelivery);
  const errors = useAppSelector((state) => state.main.errors);
  const oldTime = useAppSelector((state) => state.order.done_time);
  const dispatch = useAppDispatch();
  const [isFastest, setIsFastest] = useState(oldTime === "00:00");
  const [isValid, setIsValid] = useState(true);
  const [errorText, setErrorText] = useState("");

  const [hour, setHour] = useState<number>();
  const [minute, setMinute] = useState<number>();

  useEffect(() => {
    const currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() + (isDelivery ? 40 : 20));
    setHour(currentDate.getHours());
    setMinute(currentDate.getMinutes());
  }, []);

  const onTimeChange = (
    hour: number | undefined,
    minute: number | undefined,
  ) => {
    setHour(hour);
    setMinute(minute);

    if (hour === undefined || minute === undefined) {
      setErrorText("Укажите время перед сохранением");
      setIsValid(false);
    } else if (isTimeInRange(hour, minute) || isFastest) {
      dispatch(
        setDoneTime(
          isFastest
            ? "00:00"
            : `${hour < 10 ? "0" + hour : hour}:${minute < 10 ? "0" + minute : minute}`,
        ),
      );
      dispatch(
        setErrors({
          ...errors,
          time: false,
        }),
      );
    }
  };

  function isTimeInRange(hour: number, minute: number): boolean {
    // Get current time
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    const timeDifference =
      (hour - currentHours) * 60 + (minute - currentMinutes);

    console.log(timeDifference);
    let isValid = false;
    if (hour >= 23) {
      setErrorText("Нельзя заказывать после 23");
    } else if (hour < 10) {
      setErrorText("Нельзя заказывать до 10");
    } else if (timeDifference < 20 && !isDelivery) {
      setErrorText("Время ожидания заказа не менее 20 минут");
    } else if (timeDifference < 40 && isDelivery) {
      setErrorText("Время ожидания заказа не менее 40 минут");
    } else {
      setErrorText("");
      isValid = true;
    }

    setIsValid(isValid);
    return isValid;
  }
  return (
    <div className="flex flex-col gap-[10px]">
      <h3 className="mb-4 text-base font-medium text-textSecondary">
        Адрес и время заказа
      </h3>

      <div>
        {/*<Icon type="clock" className="mx-auto mb-[10px] h-[90px] w-[90px]" />*/}

        {/*<h2 className="mb-[10px] text-center text-base font-medium text-white">*/}
        {/*  Выберите время*/}
        {/*</h2>*/}

        {/*<p className="mb-[20px] text-center font-medium text-fontSecondary">*/}
        {/*  Выберите время для приготовления заказа*/}
        {/*</p>*/}

        <div className="mb-[10px] flex flex-row justify-between rounded-full border-2 border-button">
          <Button
            className="py-auto rounded-full px-5"
            text="Как можно быстрее"
            styleType={isFastest ? "primary" : "secondary"}
            onClick={() => setIsFastest(true)}
          />

          <Button
            className="py-auto rounded-full px-5"
            text="Ко времени"
            showIcon={true}
            iconType="humanWalk"
            styleType={!isFastest ? "primary" : "secondary"}
            onClick={() => setIsFastest(false)}
          />
        </div>

        {!isFastest && (
          <div className="mt-[20px]">
            <TimePicker hour={hour} minute={minute} onChange={onTimeChange} />

            {!isValid && (
              <p className="mb-[30px] mt-[10px] text-center font-medium text-fontSecondary">
                {errorText}
              </p>
            )}
          </div>
        )}
      </div>

      <SelectCard
        id="delivery_input"
        isError={errors.address}
        leftIcon="delivery"
        // borderBottom={true}
        name={
          orderState.isDelivery
            ? orderState.address.parsed
              ? orderState.address.parsed
              : "Ваш адрес"
            : "С собой"
        }
        description={
          orderState.address.parsed && orderState.isDelivery ? "Ваш адрес" : ""
        }
        onClick={() => navigate("/delivery")}
      >
        <Icon className="my-auto h-5 w-5" type="arrowRight" />
      </SelectCard>
    </div>
  );
};

export default CartTime;
