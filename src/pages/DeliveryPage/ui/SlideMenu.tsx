import { CompanyState } from "../../../store/slices/companySlice.ts";
import { OrderState } from "../../../store/slices/orderSlice.ts";
import DeliverySwitch from "./DeliverySwitch.tsx";
import CompanyCards from "../../../widget/CompanyCards.tsx";
import Input from "../../../shared/Input.tsx";
// import FetchAddresses from "./FetchAddreses.tsx";
import OldAddressesDiv from "./OldAddressesDiv.tsx";
import Button from "../../../shared/Button.tsx";
import useSlideMenu from "../hooks/useSlideMenu.ts";
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
  // const [isTop10, setIsTop10] = useState(true);
  //
  // const togglePosition = () => {
  //   setIsTop10(!isTop10);
  // };

  // return (
  //   <div className="relative flex h-screen flex-col items-center justify-center">
  //     <button
  //       onClick={togglePosition}
  //       className=" mb-4 rounded bg-blue-500 px-4 py-2 text-white"
  //     >
  //       Toggle Position
  //     </button>
  //     <div
  //       className="absolute h-24 w-24 bg-blue-500 transition-all duration-500"
  //       style={{ top: isTop10 ? "10%" : "50%" }}
  //     ></div>
  //   </div>
  // );
  const {
    active,
    // height,
    stage,
    isSearchActive,
    address,
    fetchResult,
    oldAddresses,

    // getTextFromComponents,
    updateAddress,
    handleAddressChange,
    handleSearchAddress,
    handleSearchBlur,
    // handleChooseAddress,
    handleSaveButton,
    handleExactAddressChange,
    handleTouchStart,
    handleTouchEnd,
  } = useSlideMenu({
    setErrorText,
    isDelivery,
    companyState,
    orderState,
  });

  return (
    <>
      <div
        className={`${active ? "duration-0" : "duration-500"} absolute top-[50%] h-full w-full overflow-y-auto bg-bgColor p-4 pb-[80px] text-white transition-all`}
        // style={{ height: `${height}px` }}
        style={{ top: stage === 0 ? `80%` : stage === 1 ? `50%` : `20%` }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute left-[50%] top-[7px] h-[3px] w-[50px] translate-x-[-50%] rounded-[90px] bg-button "></div>

        {/*<GeoLocationButton />*/}

        {/*{!isSearchActive && (*/}
        <DeliverySwitch
          className="my-[30px]"
          isDelivery={isDelivery}
          setIsDelivery={setIsDelivery}
        />
        {/*)}*/}

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

            {/*{!isSearchActive && (*/}
            <Input
              onFocus={handleSearchAddress}
              onBlur={handleSearchBlur}
              onChange={handleExactAddressChange}
              value={orderState.exactAddress}
              label="Введите номер квартиры / офиса"
            />
            {/*)}*/}

            {errorText !== "" && (
              <p className="my-[10px] font-medium text-[#BA4747]">
                {errorText}
              </p>
            )}

            {/*{isSearchActive && fetchResult !== null && (*/}
            {/*  <FetchAddresses*/}
            {/*    fetchResult={fetchResult}*/}
            {/*    handleChooseAddress={handleChooseAddress}*/}
            {/*    getTextFromComponents={getTextFromComponents}*/}
            {/*  />*/}
            {/*)}*/}

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
