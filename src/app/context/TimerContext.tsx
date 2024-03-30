import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from "react";

type Timer = {
  id: number;
  remainingTime: number;
};

type TimerContextType = {
  timers: Timer[];
  startTimer: (id: number, duration: number) => void;
  stopTimer: (id: number) => void;
};

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [timers, setTimers] = useState<Timer[]>([]);

  const startTimer = (id: number, duration: number) => {
    setTimers((prevTimers) => [...prevTimers, { id, remainingTime: duration }]);
  };

  const stopTimer = (id: number) => {
    setTimers((prevTimers) => prevTimers.filter((timer) => timer.id !== id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((timer) => ({
          ...timer,
          remainingTime: timer.remainingTime > 0 ? timer.remainingTime - 1 : 0,
        })),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <TimerContext.Provider value={{ timers, startTimer, stopTimer }}>
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
