import Popup from "../../../shared/Popup.tsx";
import React, { useEffect, useState } from "react";
import Icon from "../../../shared/Icon";
import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
import Button from "../../../shared/Button.tsx";
import TimePicker from "../../../shared/TimePicker";
import { setDoneTime } from "../../../store/slices/orderSlice.ts";

type TimePopupProps = React.HTMLProps<HTMLDivElement> & {
  show: boolean;
  toggleShow: () => void;
};

const TimePopup = ({ show, toggleShow }: TimePopupProps) => {
  const isDelivery = useAppSelector(
    (state) => state.order.address.parsed !== "",
  );
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
  };

  function isTimeInRange(hour: number, minute: number): boolean {
    // Get current time
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    const timeDifference =
      (hour - currentHours) * 60 + (minute - currentMinutes);

    if (timeDifference < 20 && isDelivery) {
      setErrorText("Время ожидания заказа не менее 20 минут");
    } else if (timeDifference < 40) {
      setErrorText("Время ожидания заказа не менее 40 минут");
    } else if (hour < 22) {
      setErrorText("Нельзя заказывать после 22");
    } else {
      setErrorText("");
    }

    // Check if time difference is greater than 20 minutes and less than 22:00
    setIsValid(timeDifference > 20 && hour < 22);
    return timeDifference > 20 && hour < 22;
  }

  return (
    <Popup show={show} toggleShow={toggleShow}>
      <Icon type="clock" className="mx-auto mb-[10px] h-[90px] w-[90px]" />

      <h2 className="mb-[10px] text-center text-base font-medium text-white">
        Выберите время
      </h2>

      <p className="mb-[20px] text-center font-medium text-fontSecondary">
        Выберите время для приготовления заказа
      </p>

      <div className="my-[30px] flex flex-row justify-between rounded-full border-2 border-button">
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
        <>
          <TimePicker hour={hour} minute={minute} onChange={onTimeChange} />

          {!isValid && (
            <p className="mb-[30px] mt-[10px] text-center font-medium text-fontSecondary">
              {errorText}
            </p>
          )}
        </>
      )}

      <div className="mt-[20px] flex flex-col gap-[10px]">
        <Button
          text="Сохранить"
          onClick={() => {
            if (hour === undefined || minute === undefined) {
              setErrorText("Укажите время перед сохранением");
              setIsValid(false);
            } else if (isTimeInRange(hour, minute) || isFastest) {
              toggleShow();
              dispatch(
                setDoneTime(
                  isFastest
                    ? "00:00"
                    : `${hour < 10 ? "0" + hour : hour}:${minute < 10 ? "0" + minute : minute}`,
                ),
              );
            } else {
              setErrorText("В выбранное время мы не принимаем заказы");
              setIsValid(false);
            }
          }}
        />
        <Button text="Отмена" onClick={toggleShow} styleType="secondary" />
      </div>
    </Popup>
  );
};

export default TimePopup;
