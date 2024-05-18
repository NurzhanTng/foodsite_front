import { CompanyState } from "../../../store/slices/companySlice.ts";
import { OrderState, setAddress } from "../../../store/slices/orderSlice.ts";
import React, { useEffect, useState } from "react";
import DeliverySwitch from "../ui_old/DeliverySwitch.tsx";
import CompanyCards from "../../../widget/CompanyCards.tsx";
import Input from "../../../shared/Input.tsx";
import FetchAddresses from "./FetchAddreses.tsx";
import OldAddressesDiv from "./OldAddressesDiv.tsx";
import Button from "../../../shared/Button.tsx";
import fetchAddressesByName, {
  Address,
} from "../fetch/fetchAddressesByName.ts";
import { OrderAddress } from "../hooks/useSlideMenu.ts";
import getCenterOfPolygon from "../../../utils/getCenterOfPolygon.ts";
import { useDispatch } from "react-redux";
import checkIsInPolygon from "../../../utils/checkIsInPolygon.ts";
import { useAppSelector } from "../../../store/hooks/hooks.ts";
import { useNavigate } from "react-router-dom";
// import useSlideMenu from "../hooks/useSlideMenu.ts";

type SlideMenuProps = {
  errorText: string;
  setErrorText: (text: string) => void;
  isDelivery: boolean;
  setIsDelivery: (isDelivery: boolean) => void;
  companyState: CompanyState;
  orderState: OrderState;
};

const SlideMenu = ({
  errorText,
  setErrorText,
  isDelivery,
  setIsDelivery,
  companyState,
  orderState,
}: SlideMenuProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user_id = useAppSelector((state) => state.user.telegram_id);
  const [stage, setStage] = useState<0 | 1 | 2>(1);
  const [height, setHeight] = useState(getHeight(stage));

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [address, setAddressText] = useState(orderState.address.parsed);
  const [fetchResult, setFetchResult] = useState<Address[] | null>(null);
  const [oldAddresses, setOldAddresses] = useState<OrderAddress[] | null>(null);

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

  useEffect(() => {
    if (height === window.innerHeight - 300 && isSearchActive) return;
    setHeight(getHeight(stage));
  }, [stage]);

  function getHeight(stage: 0 | 1 | 2) {
    const windowHeight = window.visualViewport?.height
      ? window.visualViewport.height
      : window.innerHeight;
    return [160, windowHeight * 0.5, windowHeight - 100][stage];
  }

  function onClick() {
    console.log("click");
    setStage((s) => {
      const remainder = (s + 1) % 3;
      return remainder === 2 ? 2 : remainder === 1 ? 1 : 0;
    });
  }

  const handleSearchAddress = () => {
    setIsSearchActive(true);
    setStage(2);
    setHeight(window.innerHeight - 300);
  };

  const handleSearchBlur = () => {
    setIsSearchActive(false);
    setStage(2);
    setHeight(window.innerHeight - 100);
  };

  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const handleAddressChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const text = event.target.value;
    setAddressText(text);

    if (timerId) clearTimeout(timerId);
    const newTimerId = setTimeout(() => {
      fetchAddressesByName(text).then((data) => {
        if (data.length === 1) {
          // handleChooseAddress(data[0]);
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
  };

  const updateAddress = (address: OrderAddress) => {
    setAddressText(address.parsed);
    setFetchResult(null);
    setIsSearchActive(false);
    dispatch(setAddress(address));
    setErrorText(
      getErrorText("updateAddress", address.parsed, address.long, address.lat),
    );
  };
  const handleSaveButton = () => {
    const error = getErrorText("handleSaveButton");
    setErrorText(error);
    if (error === "") {
      navigate("/cart");
    }
  };

  const handleExactAddressChange = () => {};

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

  return (
    <>
      <button
        className="fixed left-[150px] top-0 bg-button p-5"
        onClick={onClick}
      >
        кликни
      </button>
      <div
        className="transition-height fixed bottom-0 w-full overflow-y-auto bg-bgColor p-4 text-white duration-500"
        style={{ height: `${height}px` }}
      >
        <div className="absolute left-[50%] top-[7px] h-[3px] w-[50px] translate-x-[-50%] rounded-[90px] bg-button "></div>

        {!isSearchActive && (
          <DeliverySwitch
            className="my-[30px]"
            isDelivery={isDelivery}
            setIsDelivery={setIsDelivery}
          />
        )}

        {stage !== 0 && !isDelivery && (
          <>
            <CompanyCards companySpots={companyState.companies} />

            {errorText !== "" && (
              <p className="my-[30px] font-medium text-[#BA4747]">
                {errorText}
              </p>
            )}
          </>
        )}

        {stage !== 0 && isDelivery && (
          <div className="mt-[20px] flex flex-col gap-5">
            <Input
              onFocus={handleSearchAddress}
              onBlur={handleSearchBlur}
              onChange={handleAddressChange}
              value={address}
              label="Введите адрес доставки"
              className={`${isSearchActive ? "mb-[20px] mt-[30px]" : ""}`}
            />

            {!isSearchActive && (
              <Input
                onChange={handleExactAddressChange}
                value={orderState.exactAddress}
                label="Введите номер квартиры / офиса"
              />
            )}

            {errorText !== "" && (
              <p className="my-[10px] font-medium text-[#BA4747]">
                {errorText}
              </p>
            )}

            {isSearchActive && fetchResult !== null && (
              <FetchAddresses
                fetchResult={fetchResult}
                handleChooseAddress={handleChooseAddress}
              />
            )}

            {isSearchActive &&
              fetchResult === null &&
              oldAddresses !== null &&
              oldAddresses?.length !== 0 && (
                <OldAddressesDiv
                  oldAddresses={oldAddresses}
                  updateAddress={updateAddress}
                />
              )}
          </div>
        )}

        <Button
          className="fixed bottom-0 left-0 z-20 h-[50px] w-full rounded-none"
          onClick={handleSaveButton}
          text="Сохранить"
        />
      </div>
    </>
  );
};

export default SlideMenu;
