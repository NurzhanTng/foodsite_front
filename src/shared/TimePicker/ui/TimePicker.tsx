import Input from "../../Input.tsx";
import { useRef, useState } from "react";

type TimePickerProps = {
  hour: number | undefined;
  minute: number | undefined;
  onChange: (hour: number | undefined, minute: number | undefined) => void;
};

const parseTime = (hour: number | undefined, minute: number | undefined) => {
  let hourString = "";
  if (hour === undefined) {
    hourString = "00";
  } else if (hour < 10) {
    hourString = `0${hour}`;
  } else {
    hourString = `${hour}`;
  }

  let minuteString = "";
  if (minute === undefined) {
    minuteString = "00";
  } else if (minute < 10) {
    minuteString = `0${minute}`;
  } else {
    minuteString = `${minute}`;
  }
  return { hour: hourString, minute: minuteString };
};

const TimePicker = ({ hour, minute, onChange }: TimePickerProps) => {
  const parsed = parseTime(hour, minute);
  const minuteRef = useRef<HTMLInputElement>(null);
  const [focusElement, setFocusElement] = useState<null | "hour" | "minute">(
    null,
  );

  const onTimeChange = (value: string | undefined) => {
    let hour: number | undefined;
    let minute: number | undefined;

    let hourString = focusElement === "hour" ? value : parsed.hour;
    let minuteString = focusElement === "minute" ? value : parsed.minute;

    console.log(hourString, minuteString, focusElement);

    if (hourString === undefined) {
      hour = undefined;
    } else {
      if (hourString.endsWith("00") && hourString.length === 3)
        hourString = hourString[0];
      hour = parseInt(hourString);
      if (hour > 23) hour = 23;
      if (hour < 0) hour = 0;
      if (hour > 9) onFocus();
    }

    if (minuteString === undefined) {
      minute = undefined;
    } else {
      if (minuteString.endsWith("00") && minuteString.length === 3)
        minuteString = minuteString[0];
      minute = parseInt(minuteString);
      if (minute > 59) minute = 59;
      if (minute < 0) minute = 0;
    }

    onChange(hour, minute);
  };

  function onFocus() {
    const input = minuteRef.current?.querySelector("input");
    if (input) {
      input.focus();
      setFocusElement("minute");
    }
  }

  return (
    <div className="flex flex-row">
      <Input
        type="number"
        label="Введите час"
        value={parsed.hour}
        onClick={() => setFocusElement("hour")}
        onBlur={() => setFocusElement(null)}
        onChange={(e) => onTimeChange(e.target.value)}
      />
      <p className="px-2 text-2xl">:</p>
      <Input
        ref={minuteRef}
        type="number"
        label="Введите минуту"
        value={parsed.minute}
        onClick={() => setFocusElement("minute")}
        onBlur={() => setFocusElement(null)}
        onChange={(e) => onTimeChange(e.target.value)}
      />
    </div>
  );
};

export default TimePicker;
