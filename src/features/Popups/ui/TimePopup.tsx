import Popup from "../../../shared/Popup.tsx";
import React, { useState } from "react";
import Icon from "../../../shared/Icon";
import { setDoneTime } from "../../../store/slices/orderSlice.ts";
import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
import Button from "../../../shared/Button.tsx";
import { TimeField } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import dayjs from 'dayjs';

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
  const [value, setValue] = useState<Dayjs | null>(() => {
    const currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() + (isDelivery ? 40 : 20));
    return dayjs().set('hour', currentDate.getHours()).set('minute', currentDate.getMinutes());
  });
  const [isValid, setIsValid] = useState(true);
  const [errorText, setErrorText] = useState("");

  const timeToString = (value: Dayjs) => {
    return `${value.get("hour")}:${value.get("minute")}`;
  };

  function isTimeInRange(time: Dayjs): boolean {
    console.log(time);
    // Get current time
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    // Parse given time string
    const givenHours = time.get("hour");
    const givenMinutes = time.get("minute");

    // Calculate time difference in minutes
    const timeDifference =
      (givenHours - currentHours) * 60 + (givenMinutes - currentMinutes);

    if (timeDifference < 20 && isDelivery) {
      setErrorText("Время ожидания заказа не менее 20 минут");
    } else if (timeDifference < 40) {
      setErrorText("Время ожидания заказа не менее 40 минут");
    } else if (givenHours < 22) {
      setErrorText("Нельзя заказывать после 22");
    } else {
      setErrorText("");
    }

    // Check if time difference is greater than 20 minutes and less than 22:00
    setIsValid(timeDifference > 20 && givenHours < 22);
    return timeDifference > 20 && givenHours < 22;
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
          <TimeField
            label="Укажите время"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            ampm={false}
            sx={{
              width: "100%",
              maxWidth: "400px",
              backgroundColor: "#17212B",
              borderRadius: "10px",
              boxShadow: "md",
              color: "white",
              "& input": {
                borderColor: "white",
                borderRadius: "30px",
                padding: "10px 20px",
                fontSize: "16px",
                color: "white",
                height: "fit-content",
              },
              "& label": {
                borderColor: "white",
                color: "#6A7D91",
                lineHeight: 1,
                marginTop: "-2px",
              },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#17212B",
                borderRadius: "10px",
                "& fieldset": {
                  borderRadius: "10px",
                  borderColor: "#232E39",
                  borderWidth: 2,
                },
                "&:hover fieldset": {
                  borderRadius: "10px",
                  borderColor: "#5288C1",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#5288C1",
                  borderRadius: "10px",
                },
              },
              "&.Mui-focused label": {
                marginTop: "20px",
              },
            }}
          />
          {!isValid && (
            <p className="mt-[10px] mb-[30px] text-center font-medium text-fontSecondary">
              {errorText}
            </p>
          )}
        </>
      )}

      <div className="mt-[10px] flex flex-col gap-[10px]">
        <Button
          text="Сохранить"
          onClick={() => {
            if (value === null) {
              setErrorText("Укажите время перед сохранением");
              setIsValid(false);
            } else if (isTimeInRange(value) || isFastest) {
              toggleShow();
              dispatch(setDoneTime(isFastest ? "00:00" : timeToString(value)));
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
