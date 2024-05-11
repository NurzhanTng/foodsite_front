import Popup from "../../../shared/Popup.tsx";
import React, { useEffect, useState } from "react";
import Icon from "../../../shared/Icon";
import Input from "../../../shared/Input.tsx";
import { useAppSelector } from "../../../store/hooks.ts";
import Button from "../../../shared/Button.tsx";
import useManager from "../../../hooks/useManager.ts";

type RejectedTextPopupProps = React.HTMLProps<HTMLDivElement> & {
  order_id: number | null;
  show: boolean;
  toggleShow: () => void;
};

const RejectedTextPopup = ({
  show,
  toggleShow,
  order_id,
}: RejectedTextPopupProps) => {
  const rejectedText = useAppSelector(
    (state) =>
      state.manager.orders.find((order) => order.id === order_id)
        ?.rejected_text,
  );
  const [text, setText] = useState(rejectedText);
  const { changeRejectedText } = useManager();

  useEffect(() => {
    setText(rejectedText);
  }, [rejectedText]);

  if (rejectedText === undefined) return <div />;

  return (
    <Popup show={show} toggleShow={toggleShow}>
      <Icon type="comment" className="mx-auto mb-[10px] h-[90px] w-[90px]" />

      <h2 className="mb-[10px] text-center text-base font-medium text-white">
        Опишите проблему
      </h2>

      <p className="mb-[20px] text-center font-medium text-fontSecondary">
        Данный текст будет показан клиенту и сохранен в заказе
      </p>

      <Input
        className="mb-[30px]"
        label=""
        multiline={true}
        onChange={(event) => setText(event.target.value)}
        value={typeof text !== "string" ? undefined : text}
      />

      <div className="flex flex-col gap-[10px]">
        <Button
          text="Сохранить"
          onClick={() => {
            console.log("Before save comment", text);
            if (text === undefined || order_id === null) return;
            changeRejectedText(text, order_id);
            toggleShow();
          }}
        />
        <Button text="Отмена" onClick={toggleShow} styleType="secondary" />
      </div>
    </Popup>
  );
};

export default RejectedTextPopup;
