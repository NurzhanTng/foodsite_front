import { Notification as NotificationType } from "../../../store/slices/managerSlice.ts";
import Button from "../../../shared/Button.tsx";
import React from "react";

type NotificationProps = NotificationType & {
  onClick: (order_id: number) => void;
  onClose: (order_id: number) => void;
};

const Notification = ({ order_id, onClick, onClose }: NotificationProps) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let target: EventTarget | null = event.target;
    while (target !== null) {
      if ((target as HTMLElement).id === "click_ignore" || (target as HTMLElement)?.id?.startsWith("menu")) {
        return; // Ignore clicks on buttons
      }
      target = (target as HTMLElement).parentNode;
    }
    onClick(order_id)
  }

  return (
    <div
      onClick={handleClick}
      className="mx-auto flex w-full flex-row justify-between gap-5 rounded-2xl bg-secondary px-5 py-3 mt-[30px]"
    >
      <p className="my-auto h-fit text-balance">
        Напоминание о заказе № {order_id}
      </p>
      <Button
        id="click_ignore"
        onClick={() => onClose(order_id)}
        styleType="inactive"
        className="my-auto rounded-full bg-secondary p-2"
        showText={false}
        showIcon={true}
        iconType="close"
      />
    </div>
  );
};

export default Notification;
