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
import { useAppSelector } from "../../../store/hooks.ts";

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
          return;
        }

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
  };

  const updateAddress = (address: OrderAddress) => {
    setAddressText(address.parsed);
    setFetchResult(null);
    setIsSearchActive(false);
    setStage(1);
    dispatch(setAddress(address));
  };

  const handleExactAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(setExactAddress(event.target.value));
  };

  const handleSaveButton = () => {
    if (isDelivery && orderState.address.parsed === "") {
      setErrorText("Необходимо выбрать адрес для доставки");
      return;
    }
    if (isDelivery && orderState.exactAddress === "") {
      setErrorText("Необходимо выбрать квартиру/офис");
      return;
    }
    if (!isDelivery && orderState.company_id === -1) {
      setErrorText("Необходимо выбрать точку для самовывоза");
      return;
    }
    if (
      !checkIsInPolygon(companyState.companies[0].delivery_layers[0].points, [
        orderState.address.long,
        orderState.address.lat,
      ])
    ) {
      setErrorText("Ваш адрес вне зоны доставки");
      return;
    }

    navigate("/cart");
  };

  const handleSearchAddress = () => {
    setStage(2);
    setIsSearchActive(true);
    setTimeout(() => {
      setStage(1);
      setTimeout(() => setStage(2), 100);
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
