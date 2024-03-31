import {
  createContext,
  useContext,
  ReactNode,
  FC,
  useEffect,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import {
  deleteAllTimers,
  setTimers as mainSetTimers,
} from "../../store/slices/timerSlice.ts";
import { setNotifications } from "../../store/slices/managerSlice.ts";

type Timer = {
  timerId: NodeJS.Timeout;
  id: number | string;
  remainingTime: number;
  callback: () => void;
};

type TimerContextType = {
  startTimer: (id: number, duration: number, callback: () => void) => void;
  stopTimer: (id: number) => void;
};

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const timerState = useAppSelector((state) => state.timer);
  const notifications = useAppSelector((state) => state.manager.notifications);
  const [timers, setTimers] = useState<Timer[]>([]);
  const dispatch = useAppDispatch();

  const startTimer = (
    id: number | string,
    duration: number,
    callback: () => void,
  ) => {
    const timerId = setTimeout(() => {
      callback();
      stopTimer(id);
    }, duration);

    const currentDate = new Date();
    currentDate.setSeconds(
      currentDate.getSeconds() + Math.floor(duration / 1000),
    );
    dispatch(
      mainSetTimers([
        ...timerState.timers,
        { id, timerId, endTimestamp: currentDate.getTime() },
      ]),
    );
    setTimers([...timers, { timerId, id, remainingTime: duration, callback }]);
  };

  const stopTimer = (id: number | string) => {
    const timer = timerState.timers.find((timer) => timer.id === id);
    clearTimeout(timer?.timerId);
    dispatch(
      mainSetTimers(timerState.timers.filter((timer) => timer.id !== id)),
    );
    setTimers(timers.filter((timer) => timer.id === id));
  };

  useEffect(() => {
    const timers = timerState.timers;
    dispatch(deleteAllTimers());
    const now = new Date().getTime();
    for (const timer of timers) {
      if (now > timer.endTimestamp) {
        dispatch(
          setNotifications([...notifications, { order_id: Number(timer.id) }]),
        );
      } else {
        startTimer(timer.id, timer.endTimestamp - now, () =>
          dispatch(
            setNotifications([
              ...notifications,
              { order_id: Number(timer.id) },
            ]),
          ),
        );
      }
    }
  }, []);

  return (
    <TimerContext.Provider value={{ startTimer, stopTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
};
