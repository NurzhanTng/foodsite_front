import Icon from "../../../shared/Icon";
import Button from "../../../shared/Button.tsx";
import { TimePicker } from "@mui/x-date-pickers";
import React from "react";
import Popup from "../../../shared/Popup.tsx";
import useNotificationTime from "../hooks/useNotificationTime.ts";

type NotificationTimePopupProps = React.HTMLProps<HTMLDivElement> & {
  order_id: number;
  show: boolean;
  toggleShow: () => void;
};

const NotificationTimePopup = ({
  order_id,
  show,
  toggleShow,
}: NotificationTimePopupProps) => {
  const { value, setValue, isValid, errorText, handleStart } =
    useNotificationTime();

  return (
    <Popup show={show} toggleShow={toggleShow}>
      <Icon type="clock" className="mx-auto mb-[10px] h-[90px] w-[90px]" />

      <h2 className="mb-[10px] text-center text-base font-medium text-white">
        Выберите время
      </h2>

      <p className="mb-[20px] text-center font-medium text-fontSecondary">
        Выберите время для напоминания
      </p>

      <TimePicker
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
        <p className="mb-[30px] mt-[10px] text-center font-medium text-fontSecondary">
          {errorText}
        </p>
      )}

      <div className="mt-[10px] flex flex-col gap-[10px]">
        <Button
          text="Сохранить"
          onClick={() => handleStart(order_id, toggleShow)}
        />
        <Button text="Отмена" onClick={toggleShow} styleType="secondary" />
      </div>
    </Popup>
  );
};

export default NotificationTimePopup;
