import { useTimer } from "../../../app/context/TimerContext.tsx";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks.ts";
import { useState } from "react";
import { setNotifications } from "../../../store/slices/managerSlice.ts";

const useNotificationTime = () => {
  const { startTimer } = useTimer();
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((state) => state.manager.notifications);

  const [isValid, setIsValid] = useState(true);
  const [errorText, setErrorText] = useState("");

  const [hour, setHour] = useState<number>();
  const [minute, setMinute] = useState<number>();

  const onTimeChange = (
    hour: number | undefined,
    minute: number | undefined,
  ) => {
    setHour(hour);
    setMinute(minute);
  };

  const handleStart = (order_id: number, togglePopup: () => void) => {
    if (hour === undefined || minute === undefined) {
      setIsValid(false);
      setErrorText("Чтобы создать напоминание необходимо выбрать время");
      return;
    }

    const time = new Date();
    time.setHours(hour);
    time.setMinutes(minute);
    const milliseconds = time.getTime() - new Date().getTime();
    console.log(milliseconds);

    startTimer(order_id, milliseconds, () => {
      if (notifications === undefined) {
        dispatch(setNotifications([{ order_id: order_id }]));
      } else {
        dispatch(setNotifications([...notifications, { order_id: order_id }]));
      }
    });

    togglePopup();
  };

  return {
    isValid,
    errorText,
    hour,
    minute,
    onTimeChange,
    handleStart,
  };
};

export default useNotificationTime;
