import DeliverySwitch from "../ui_old/DeliverySwitch.tsx";
import CompanyCards from "../../../widget/CompanyCards.tsx";
import Input from "../../../shared/Input.tsx";
import Button from "../../../shared/Button.tsx";
import { OrderState } from "../../../store/slices/orderSlice.ts";
import { CompanyState } from "../../../store/slices/companySlice.ts";
import useSlideMenu from "../hooks/useSlideMenu.ts";
import { twMerge } from "tailwind-merge";
import OldAddressesDiv from "./OldAddressesDiv.tsx";
import FetchAddreses from "./FetchAddreses.tsx";

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
    ref,
    stage,
    isAnimating,
    isSearchActive,
    address,
    fetchResult,
    oldAddresses,
    startCoords,
    height,
    topMargin,
    handleTouchStart,
    handleTouchEnd,
    updateAddress,
    handleExactAddressChange,
    handleChooseAddress,
    handleAddressChange,
    handleSaveButton,
    handleSearchAddress,
  } = useSlideMenu({
    setErrorText,
    isDelivery,
    companyState,
    orderState,
  });

  return (
    <div
      className={twMerge(
        `${startCoords === 0 ? "duration-300" : ""} transition-height transition-top fixed bottom-0 left-0 z-10 w-full transition ease-in-out`,
        "z-0 overflow-y-auto bg-bgColor px-[20px] pb-[70px]",
      )}
      style={
        isAnimating
          ? { height: `${height}px`, top: `${topMargin}px` }
          : { height: `${height}px`, bottom: 0 }
      }
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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
            <p className="my-[30px] font-medium text-[#BA4747]">{errorText}</p>
          )}
        </>
      )}

      {stage !== 0 && isDelivery && (
        <div className="mt-[20px] flex flex-col gap-5">
          <Input
            ref={ref}
            onFocus={() => {
              handleSearchAddress();
            }}
            onBlur={() => {
              // console.log("on blur");
              //
              // setTimeout(() => {
              //   console.log("blur");
              //   const oldStage = stage;
              //   setStage(0);
              //   setStage(oldStage);
              // }, 1000);
            }}
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
            <p className="my-[10px] font-medium text-[#BA4747]">{errorText}</p>
          )}

          {isSearchActive && fetchResult !== null && (
            <FetchAddreses
              fetchResult={fetchResult}
              handleChooseAddress={handleChooseAddress}
            />
          )}

          {isSearchActive &&
            fetchResult === null &&
            oldAddresses?.length !== 0 && (
              <OldAddressesDiv
                oldAddresses={oldAddresses}
                updateAddress={updateAddress}
              />
            )}
        </div>
      )}

      <Button
        className=" fixed bottom-0 left-0 z-20 h-[50px] w-full rounded-none"
        onClick={handleSaveButton}
        text="Сохранить"
      />
    </div>
  );
};

export default SlideMenu;
