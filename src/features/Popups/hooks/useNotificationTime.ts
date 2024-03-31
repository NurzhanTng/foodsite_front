import { useTimer } from "../../../app/context/TimerContext.tsx";
import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { setNotifications } from "../../../store/slices/managerSlice.ts";

const useNotificationTime = () => {
  const { startTimer } = useTimer();
  const notifications = useAppSelector((state) => state.manager.notifications);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<Dayjs | null>(() => {
    const currentDate = new Date();
    return dayjs()
      .set("hour", currentDate.getHours())
      .set("minute", currentDate.getMinutes());
  });
  const [isValid, setIsValid] = useState(true);
  const [errorText, setErrorText] = useState("");

  const handleStart = (order_id: number, togglePopup: () => void) => {
    const time = value?.toDate();
    const now = new Date()

    if (time === undefined) {
      setIsValid(false);
      setErrorText("Чтобы создать напоминание необходимо выбрать время");
      return;
    }

    time.setFullYear(now.getFullYear())
    console.log(time)
    console.log(now)

    const milliseconds =  time.getTime() - new Date().getTime()
    console.log(milliseconds)

    startTimer(order_id, milliseconds, () => {
      console.log("notification added: ", order_id, notifications);
      if (notifications === undefined) {
        dispatch(setNotifications([{ order_id: order_id }]));
      } else {
        dispatch(setNotifications([...notifications, { order_id: order_id }]));
      }
    });

    togglePopup();
  };

  return {
    handleStart,
    value,
    setValue,
    isValid,
    errorText,
  };
};

export default useNotificationTime;
