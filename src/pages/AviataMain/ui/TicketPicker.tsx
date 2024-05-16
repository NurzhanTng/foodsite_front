import Button from "../../../shared/Button.tsx";
import { DatePicker } from "@mui/x-date-pickers";
import Input from "../../../shared/Input.tsx";

const TicketPicker = () => {
  const isCorrect = true;

  return (
    <div className="relative mt-[-10px] flex flex-col gap-[15px] rounded-[10px] bg-white px-5 py-5">
      <h2 className="font-['Sen'] text-base font-bold leading-normal text-stone-900">
        Купить или забронировать авиабилеты онлайн в Казахстан
      </h2>

      <Input label={"Откуда"} />
      <Input label={"Куда"} />

      <DatePicker
        label={"Туда"}
        sx={{
          width: "100%",
          maxWidth: "400px",
          // height: "44px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "md",
          color: "white",
          "& input": {
            borderColor: "white",
            borderRadius: "30px",
            padding: "10px 20px",
            fontSize: "16px",
            color: "white",
            height: "fit-content",
          },
          "& textarea": {
            borderColor: "white",
            padding: "0px 5px",
            fontSize: "16px",
            color: "white",
            height: "fit-content",
          },
          "& label": {
            borderColor: "52B788",
            color: isCorrect ? "#6A7D91" : "#8B3A3A",
            lineHeight: 1,
            marginTop: "-2px",
            "&.MuiFormLabel-filled": {
              // color: isCorrect ? "#5288C1" : "#BA4747",
              marginTop: "2px",
            },
            "&.Mui-focused": {
              color: isCorrect ? "#5288C1" : "#BA4747",
              marginTop: "2px",
            },
          },
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#fff",
            borderRadius: "10px",
            "& fieldset": {
              borderRadius: "10px",
              // height: "44px",
              borderColor: isCorrect ? "#52B788" : "#8B3A3A",
              borderWidth: 2,
            },
            "&:hover fieldset": {
              borderRadius: "10px",
              // height: "44px",
              borderColor: isCorrect ? "#52B788" : "#BA4747",
            },
            "&Mui-active": {},
            "&.Mui-focused fieldset": {
              borderColor: isCorrect ? "#52B788" : "#BA4747",
              // backgroundColor: "#17212B",
              color: "white",
              // height: "44px",
              borderRadius: "10px",
            },
          },
        }}
      />
      <DatePicker
        label={"Обратно"}
        sx={{
          width: "100%",
          maxWidth: "400px",
          // height: "44px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "md",
          color: "white",
          "& input": {
            borderColor: "white",
            borderRadius: "30px",
            padding: "10px 20px",
            fontSize: "16px",
            color: "white",
            height: "fit-content",
          },
          "& textarea": {
            borderColor: "white",
            padding: "0px 5px",
            fontSize: "16px",
            color: "white",
            height: "fit-content",
          },
          "& label": {
            borderColor: "52B788",
            color: isCorrect ? "#6A7D91" : "#8B3A3A",
            lineHeight: 1,
            marginTop: "-2px",
            "&.MuiFormLabel-filled": {
              // color: isCorrect ? "#5288C1" : "#BA4747",
              marginTop: "2px",
            },
            "&.Mui-focused": {
              color: isCorrect ? "#5288C1" : "#BA4747",
              marginTop: "2px",
            },
          },
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#fff",
            borderRadius: "10px",
            "& fieldset": {
              borderRadius: "10px",
              // height: "44px",
              borderColor: isCorrect ? "#52B788" : "#8B3A3A",
              borderWidth: 2,
            },
            "&:hover fieldset": {
              borderRadius: "10px",
              // height: "44px",
              borderColor: isCorrect ? "#52B788" : "#BA4747",
            },
            "&Mui-active": {},
            "&.Mui-focused fieldset": {
              borderColor: isCorrect ? "#52B788" : "#BA4747",
              // backgroundColor: "#17212B",
              color: "white",
              // height: "44px",
              borderRadius: "10px",
            },
          },
        }}
      />
      <Button
        text="Найти билеты"
        className="bg-green2 w-full py-2"
        onClick={() => {}}
      />
    </div>
  );
};

export default TicketPicker;
