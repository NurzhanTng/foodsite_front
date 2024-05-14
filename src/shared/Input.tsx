import { TextField } from "@mui/material";
import React, { ForwardedRef, forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  multiline?: boolean;
  isCorrect?: boolean;
};

const Input = forwardRef(
  (
    {
      isCorrect = true,
      type,
      className,
      label,
      value,
      onChange,
      multiline = false,
      id,
      onClick,
      onFocus,
      onBlur,
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement> | undefined,
  ) => {
    return (
      <div id={id} ref={ref} className={className}>
        <TextField
          multiline={multiline}
          type={type}
          value={value}
          onClick={onClick}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          label={label}
          variant="outlined"
          sx={{
            width: "100%",
            // maxWidth: "400px",
            // height: "44px",
            backgroundColor: "#17212B",
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
              borderColor: "white",
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
              backgroundColor: "#17212B",
              borderRadius: "10px",
              "& fieldset": {
                borderRadius: "10px",
                // height: "44px",
                borderColor: isCorrect ? "#232E39" : "#8B3A3A",
                borderWidth: 2,
              },
              "&:hover fieldset": {
                borderRadius: "10px",
                // height: "44px",
                borderColor: isCorrect ? "#5288C1" : "#BA4747",
              },
              "&Mui-active": {},
              "&.Mui-focused fieldset": {
                borderColor: isCorrect ? "#5288C1" : "#BA4747",
                // backgroundColor: "#17212B",
                color: "white",
                // height: "44px",
                borderRadius: "10px",
              },
            },
          }}
        />
      </div>
    );
  },
);

export default Input;
