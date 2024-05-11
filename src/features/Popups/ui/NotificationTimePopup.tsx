import Icon from "../../../shared/Icon";
import Button from "../../../shared/Button.tsx";
import React from "react";
import Popup from "../../../shared/Popup.tsx";
import useNotificationTime from "../hooks/useNotificationTime.ts";
import TimePicker from "../../../shared/TimePicker";

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
  const { hour, minute, onTimeChange, isValid, errorText, handleStart } =
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

      <TimePicker hour={hour} minute={minute} onChange={onTimeChange} />

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
