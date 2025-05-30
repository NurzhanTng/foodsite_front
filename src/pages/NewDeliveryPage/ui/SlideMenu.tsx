import { CompanyState } from "../../../store/slices/companySlice.ts";
import { OrderState } from "../../../store/slices/orderSlice.ts";
import DeliverySwitch from "./DeliverySwitch.tsx";
import CompanyCards from "../../../widget/CompanyCards.tsx";
import Input from "../../../shared/Input.tsx";
// import FetchAddresses from "./FetchAddreses.tsx";
// import OldAddressesDiv from "./OldAddressesDiv.tsx";
import Button from "../../../shared/Button.tsx";
import useSlideMenu from "../hooks/useSlideMenu.ts";
import SuggestAddress from "./SuggestAddress.tsx";
// import geocodeAddressByURI from "../fetch/geocodeAddressByURI.ts";
// import { Autocomplete, TextField } from "@mui/material";
// import React from "react";
// import GeoLocationButton from "./GeoLocationButton.tsx";

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
  const {
    active,
    stage,
    isSearchActive,
    address,
    fetchResult,
    oldAddresses,
    userLocation,
    suggestAddresses,

    // getTextFromComponents,
    getTop,
    // updateAddress,
    handleAddressChange,
    handleSearchAddress,
    handleExactAddress,
    handleSearchBlur,
    // handleChooseAddress,
    handleSaveButton,
    handleExactAddressChange,
    handleTouchStart,
    handleTouchEnd,
    handleSuggestAddressClick,
  } = useSlideMenu({
    setErrorText,
    isDelivery,
    companyState,
    orderState,
  });

  return (
    <>
      <div
        className={`${active ? "duration-0" : "duration-500"} fixed top-[50%] h-full w-full overflow-y-scroll rounded-t-[15px] bg-bgColor p-4 pb-[80px] text-white transition-all`}
        // style={{ height: `${height}px` }}
        style={{
          top: getTop(stage),
          // height: window.innerHeight - getTop(stage),
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute left-[50%] top-[7px] h-[3px] w-[50px] translate-x-[-50%] rounded-[90px] bg-button "></div>

        {/*<GeoLocationButton />*/}

        {!isSearchActive && (
          <DeliverySwitch
            className="my-[30px]"
            isDelivery={isDelivery}
            setIsDelivery={setIsDelivery}
          />
        )}

        {stage !== 0 && !isDelivery && (
          <>
            <CompanyCards
              companySpots={companyState.companies}
              handleSaveButton={handleSaveButton}
            />

            {errorText !== "" && (
              <p className="my-[30px] font-medium text-[#BA4747]">
                {errorText}
              </p>
            )}
          </>
        )}

        {stage !== 0 && isDelivery && (
          <div
            className={`${isSearchActive ? "" : "mt-[20px]"} flex flex-col gap-5`}
          >
            <Input
              onFocus={handleSearchAddress}
              onBlur={handleSearchBlur}
              onChange={handleAddressChange}
              value={address}
              label="Введите адрес доставки"
              className={`${isSearchActive ? "mb-[0px] mt-[15px]" : ""}`}
            />

            {!isSearchActive && (
              <Input
                onFocus={handleExactAddress}
                onBlur={handleSearchBlur}
                onChange={handleExactAddressChange}
                value={orderState.exactAddress}
                label="Введите номер квартиры / офиса"
              />
            )}

            <SuggestAddress
              suggestAddresses={suggestAddresses}
              handleSuggestAddressClick={handleSuggestAddressClick}
              userLocation={userLocation}
            />

            {/*{isSearchActive && fetchResult !== null && (*/}
            {/*  // <FetchAddresses*/}
            {/*  //   fetchResult={fetchResult}*/}
            {/*  //   handleChooseAddress={handleChooseAddress}*/}
            {/*  //   getTextFromComponents={getTextFromComponents}*/}
            {/*  // />*/}
            {/*)}*/}

            {errorText !== "" && (
              <p className="my-[10px] font-medium text-[#BA4747]">
                {errorText}
              </p>
            )}

            {isSearchActive &&
              fetchResult === null &&
              oldAddresses !== null &&
              oldAddresses?.length !== 0 && (
                <div></div>
                // <OldAddressesDiv
                //   oldAddresses={oldAddresses}
                //   updateAddress={updateAddress}
                // />
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
