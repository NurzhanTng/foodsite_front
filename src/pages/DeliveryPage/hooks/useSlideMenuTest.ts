import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import fetchAddressesByName, {
  Address,
} from "../fetch/fetchAddressesByName.ts";
import getCenterOfPolygon from "../../../utils/getCenterOfPolygon.ts";
import {
  OrderState,
  setAddress,
  setExactAddress,
} from "../../../store/slices/orderSlice.ts";
import checkIsInPolygon from "../../../utils/checkIsInPolygon.ts";
import { CompanyState } from "../../../store/slices/companySlice.ts";
import { useAppSelector } from "../../../store/hooks/hooks.ts";

type useSlideMenuProps = {
  setErrorText: (text: string) => void;
  isDelivery: boolean;
  companyState: CompanyState;
  orderState: OrderState;
};

type OrderAddress = {
  long: number;
  lat: number;
  parsed: string;
};

const useSlideMenu = ({
  setErrorText,
  isDelivery,
  companyState,
  orderState,
}: useSlideMenuProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [stage, setStage] = useState<0 | 1 | 2>(1);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const user_id = useAppSelector((state) => state.user.telegram_id);
  const [address, setAddressText] = useState(orderState.address.parsed);
  const [fetchResult, setFetchResult] = useState<Address[] | null>(null);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [oldAddresses, setOldAddresses] = useState<OrderAddress[] | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_REACT_APP_API_BASE_URL}service/addresses/${user_id}/`,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: { address: OrderAddress }[]) =>
        setOldAddresses(data.map((address) => address.address)),
      )
      .catch((error) => {
        console.error(
          "There was a problem with your fetch operation:",
          error.message,
        );
        throw error;
      });

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, []);

  const handleAddressChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const text = event.target.value;
    setAddressText(text);

    if (timerId) clearTimeout(timerId);
    const newTimerId = setTimeout(() => {
      fetchAddressesByName(text).then((data) => {
        if (data.length === 1) {
          handleChooseAddress(data[0]);
          setErrorText("");
          return;
        }
        setErrorText("");

        setFetchResult(data);
      });
    }, 800);
    setTimerId(newTimerId);
  };

  const handleChooseAddress = (address: Address) => {
    const [lat, long] = getCenterOfPolygon(address.coordinates);
    updateAddress({
      lat: lat,
      long: long,
      parsed: address.address,
    });
    setStage(2);
    setTimeout(() => {
      setStage(2);
    }, 580);
  };

  const updateAddress = (address: OrderAddress) => {
    console.log("update address: ", address);
    setAddressText(address.parsed);
    setFetchResult(null);
    setStage(2);
    setIsSearchActive(false);
    dispatch(setAddress(address));
    setErrorText(
      getErrorText("updateAddress", address.parsed, address.long, address.lat),
    );
    setTimeout(() => {
      // setTimeout(() => setStage(2), 0);
    }, 580);
  };

  const handleExactAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(setExactAddress(event.target.value));
    setErrorText(
      getErrorText(
        "handleExactAddressChange",
        null,
        null,
        null,
        event.target.value,
      ),
    );
  };

  const getErrorText = (
    from: string = "",
    parsed: string | null = null,
    long: number | null = null,
    lat: number | null = null,
    exact: string | null = null,
  ) => {
    console.log(`-- getErrorText [${from}]--`, {
      addressParsed: parsed === null ? orderState.address.parsed : parsed,
      addressLong: long === null ? orderState.address.long : long,
      addressLat: lat === null ? orderState.address.lat : lat,
      exactAddress: orderState.exactAddress,
      company_id: orderState.company_id,
      checkInPolygon: checkIsInPolygon(
        companyState.companies[0].delivery_layers[0].points,
        [orderState.address.long, orderState.address.lat],
      ),
      isSearchActive: isSearchActive,
    });
    if (
      isDelivery && parsed === null
        ? orderState.address.parsed === ""
        : parsed === ""
    ) {
      console.log("Необходимо выбрать адрес для доставки");
      return "Необходимо выбрать адрес для доставки";
    }
    if (!isDelivery && orderState.company_id === -1) {
      console.log("Необходимо выбрать точку для самовывоза");
      return "Необходимо выбрать точку для самовывоза";
    }
    if (
      isDelivery &&
      !checkIsInPolygon(companyState.companies[0].delivery_layers[0].points, [
        long === null ? orderState.address.long : long,
        lat === null ? orderState.address.lat : lat,
      ])
    ) {
      console.log("Ваш адрес вне зоны доставки");
      return "Ваш адрес вне зоны доставки";
    }
    if (
      isDelivery && exact === null
        ? orderState.exactAddress === ""
        : exact === ""
    ) {
      console.log("Необходимо выбрать квартиру/офис");
      return "Необходимо выбрать квартиру/офис";
    }
    if (
      parsed === null &&
      long === null &&
      lat === null &&
      exact === null &&
      isSearchActive
    ) {
      console.log("Необходимо выбрать новый адрес перед сохранением");
      return "Необходимо выбрать новый адрес перед сохранением";
    }
    console.log("");
    return "";
  };

  const handleSaveButton = () => {
    const error = getErrorText("handleSaveButton");
    setErrorText(error);
    if (error === "") {
      navigate("/cart");
    }
  };

  const handleSearchAddress = () => {
    // setStage(2);
    setStage(2);
    setIsSearchActive(true);
    setTimeout(() => {
      setStage(2);
      // setTimeout(() => setStage(2), 0);
    }, 580);
  };

  return {
    ref,
    stage,
    setStage,
    isSearchActive,
    address,
    fetchResult,
    oldAddresses,
    updateAddress,
    handleExactAddressChange,
    handleChooseAddress,
    handleAddressChange,
    handleSaveButton,
    handleSearchAddress,
  };
};

export default useSlideMenu;
