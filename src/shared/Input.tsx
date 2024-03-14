import { TextField } from "@mui/material";
import React from "react";

type InputProps =  React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  multiline?: boolean;
};

export default function Input({
  type,
  className,
  label,
  value,
  onChange,
  multiline = false
}: InputProps) {
  return (
    <div className={className}>
      <TextField
        multiline={multiline}
        type={type}
        value={value}
        onChange={onChange}
        label={label}
        variant="outlined"
        sx={{
          width: "100%",
          maxWidth: "400px",
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
            color: "#6A7D91",
            lineHeight: 1,
            marginTop: "-2px",
          },
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#17212B",
            borderRadius: "10px",
            "& fieldset": {
              borderRadius: "10px",
              // height: "44px",
              borderColor: "#232E39",
              borderWidth: 2,
            },
            "&:hover fieldset": {
              borderRadius: "10px",
              // height: "44px",
              borderColor: "#5288C1",
            },
            "&Mui-active": {},
            "&.Mui-focused fieldset": {
              borderColor: "#5288C1",
              // backgroundColor: "#17212B",
              color: "white",
              // height: "44px",
              borderRadius: "10px",
            },
          },
          "&.Mui-focused label": {
            marginTop: "20px",
          },
        }}
      />
    </div>
  );
}
