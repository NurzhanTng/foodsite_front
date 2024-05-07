import Input from "../../Input.tsx";

type TimePickerProps = {
  hour: number;
  minute: number;
  onClick: (hour: number, minute: number) => void;
};

const TimePicker = ({ hour, minute, onClick }: TimePickerProps) => {
  return (
    <div className="flex flex-row">
      <Input
        type="number"
        label="Введите час"
        value={hour}
        onChange={(e) => onClick(Number(e.target.value), minute)}
      />
      <p>:</p>
      <Input
        type="number"
        label="Введите минуту"
        value={minute}
        onChange={(e) => onClick(hour, Number(e.target.value))}
      />
    </div>
  );
};

export default TimePicker;
