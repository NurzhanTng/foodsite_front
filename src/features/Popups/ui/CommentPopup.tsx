import Popup from "../../../shared/Popup.tsx";
import React, { useEffect, useState } from "react";
import Icon from "../../../shared/Icon";
import Input from "../../../shared/Input.tsx";
import { setClientComment } from "../../../store/slices/orderSlice.ts";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks.ts";
import Button from "../../../shared/Button.tsx";

type CommentPopupProps = React.HTMLProps<HTMLDivElement> & {
  show: boolean;
  toggleShow: () => void;
};

const CommentPopup = ({ show, toggleShow }: CommentPopupProps) => {
  const oldComment = useAppSelector((state) => state.order.client_comment);
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState(oldComment);

  useEffect(() => {
    setComment(oldComment);
  }, [oldComment]);

  return (
    <Popup show={show} toggleShow={toggleShow}>
      <Icon type="comment" className="mx-auto mb-[10px] h-[90px] w-[90px]" />

      <h2 className="mb-[10px] text-center text-base font-medium text-white">
        Оставьте комментарий
      </h2>

      <p className="mb-[20px] text-center font-medium text-fontSecondary">
        Введите комментарий в поле ниже
      </p>

      <Input
        className="mb-[30px]"
        label=""
        multiline={true}
        onChange={(event) => setComment(event.target.value)}
        value={comment}
      />

      <div className="flex flex-col gap-[10px]">
        <Button
          text="Сохранить"
          onClick={() => {
            console.log("Before save comment", comment);
            dispatch(setClientComment(comment));
            toggleShow();
          }}
        />
        <Button text="Отмена" onClick={toggleShow} styleType="secondary" />
      </div>
    </Popup>
  );
};

export default CommentPopup;
