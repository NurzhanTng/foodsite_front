import Popup from "../../../shared/Popup.tsx";
import React, { useState } from "react";
import Button from "../../../shared/Button.tsx";
import { useAppSelector } from "../../../store/hooks/hooks.ts";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Icon from "../../../shared/Icon";
import { Orders } from "../../../store/slices/managerSlice.ts";
import useManager from "../../../hooks/useManager.ts";

type DeliveryUserPopupProps = React.HTMLProps<HTMLDivElement> & {
  show: boolean;
  toggleShow: () => void;
  order: Orders;
};

const DeliveryUserPopup = ({
  show,
  toggleShow,
  order,
}: DeliveryUserPopupProps) => {
  const managerState = useAppSelector((state) => state.manager);
  const { changeDeliveryId } = useManager();
  const [activeDelivery, setActiveDelivery] = useState(
    managerState.deliveries[0].telegram_id,
  );

  return (
    <Popup show={show} toggleShow={toggleShow}>
      <Icon type="magnifier" className="mx-auto mb-[10px] h-[90px] w-[90px]" />

      <h2 className="mb-[10px] text-center text-base font-medium text-white">
        Выберите доставщика
      </h2>

      <p className="mb-[20px] text-center font-medium text-fontSecondary">
        Введите одного доставщика из списка ниже
      </p>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Доставщик</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="click_ignore"
          value={activeDelivery}
          label="Доставщик"
          onChange={(event) => {
            setActiveDelivery(String(event.target.value));
          }}
          sx={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "#17212B",
            borderRadius: "10px",
            boxShadow: "md",
            color: "white",
            "& fieldset": {
              borderRadius: "10px",
              borderColor: "#232E39",
              borderWidth: 2,
            },
            "& label": {
              color: "#232E39",
            },
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#17212B",
              borderRadius: "10px",
              "& label": {
                color: "#232E39",
              },
              "& fieldset": {
                borderRadius: "10px",
                borderColor: "#232E39",
                borderWidth: 2,
              },
              "&:hover fieldset": {
                borderRadius: "10px",
                borderColor: "#5288C1",
              },
              "& .Mui-focused fieldset": {
                borderColor: "#5288C1",
                color: "white",
                borderRadius: "10px",
              },
            },
            "& .Mui-focused label": {
              marginTop: "20px",
            },
          }}
        >
          {managerState.deliveries.map((user) => {
            return (
              <MenuItem
                id="click_ignore"
                key={user.telegram_id}
                value={user.telegram_id}
              >
                {user.telegram_fullname}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <div>
        <div className="mb-4 mt-8 flex w-full justify-center">
          <Button
            className="w-full"
            text="Сохранить"
            onClick={async () => {
              await changeDeliveryId(order, activeDelivery);
              toggleShow();
            }}
          />
        </div>

        <div className="flex w-full justify-center">
          <Button
            className="w-full" text="Закрыть" onClick={toggleShow} />
        </div>
      </div>
    </Popup>
  );
};

export default DeliveryUserPopup;
