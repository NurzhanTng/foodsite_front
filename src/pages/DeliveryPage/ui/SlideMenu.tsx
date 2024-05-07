import DeliverySwitch from "../ui_old/DeliverySwitch.tsx";
import BottomSlide from "../../../features/BottomSlide";
import CompanyCards from "../../../widget/CompanyCards.tsx";
import Input from "../../../shared/Input.tsx";
import Button from "../../../shared/Button.tsx";
import { OrderState } from "../../../store/slices/orderSlice.ts";
import { CompanyState } from "../../../store/slices/companySlice.ts";
import useSlideMenu from "../hooks/useSlideMenu.ts";
import Icon from "../../../shared/Icon";

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
  } = useSlideMenu({
    setErrorText,
    isDelivery,
    companyState,
    orderState,
  });

  return (
    <BottomSlide
      className="z-0 overflow-y-auto bg-bgColor px-[20px] pb-[70px]"
      stage={stage}
      setStage={setStage}
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
        <CompanyCards companySpots={companyState.companies} />
      )}

      {stage !== 0 && isDelivery && (
        <div className="mt-[20px] flex flex-col gap-5">
          <Input
            onClick={handleSearchAddress}
            onChange={handleAddressChange}
            value={address}
            label="Введите адрес доставки"
            className={`${isSearchActive ? "mb-[20px] mt-[30px]" : ""}`}
          />

          {isSearchActive && fetchResult !== null && (
            <>
              <h3 className="text-base font-medium text-textSecondary">
                Результат поиска
              </h3>
              <div className="flex flex-col gap-4 rounded-xl bg-bgColor2 px-5 py-4 shadow-option">
                {fetchResult.map((address, index) => (
                  <div
                    key={index}
                    onClick={() => handleChooseAddress(address)}
                    className={`${index !== fetchResult.length - 1 ? "border-b pb-3" : ""} border-fontSecondary2  text-fontSecondary`}
                  >
                    {address.address}
                  </div>
                ))}
              </div>
            </>
          )}

          {isSearchActive && fetchResult === null && (
            <>
              <h3 className="text-base font-medium text-textSecondary">
                Старые адреса
              </h3>
              <div className="flex flex-col gap-4 rounded-xl bg-bgColor2 px-5 py-4 shadow-option">
                {oldAddresses?.map((address, index) => (
                  <div
                    className="relative"
                    key={index}
                    onClick={() => updateAddress(address)}
                  >
                    <Icon
                      className="absolute left-[-2px] w-[24px] text-fontSecondary"
                      type={"clock"}
                    />
                    <p
                      className={`${index !== oldAddresses.length - 1 ? "border-b pb-3" : ""} border-fontSecondary2 pl-8 text-fontSecondary`}
                      onClick={() => updateAddress(address)}
                    >
                      {address.parsed}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/*<ul>*/}
          {/*  <h3 className="mb-4 text-base font-medium text-textSecondary">*/}
          {/*    Выберите адрес*/}
          {/*  </h3>*/}
          {/*  {fetchResult.map((item, index) => (*/}
          {/*    <li*/}
          {/*      className="pb-2 pl-4 text-sm text-fontSecondary transition active:text-button"*/}
          {/*      key={index}*/}
          {/*      onClick={() => handleChooseAddress(item)}*/}
          {/*    >*/}
          {/*      {item.address}*/}
          {/*    </li>*/}
          {/*  ))}*/}
          {/*</ul>*/}

          {!isSearchActive && (
            <Input
              onChange={handleExactAddressChange}
              value={orderState.exactAddress}
              label="Введите номер квартиры / офиса"
            />
          )}
        </div>
      )}

      {errorText !== "" && (
        <p className="mb-[30px] mt-[30px] font-medium text-[#BA4747]">
          {errorText}
        </p>
      )}

      <Button
        className=" fixed bottom-0 left-0 z-20 h-[50px] w-full rounded-none"
        onClick={handleSaveButton}
        text="Сохранить"
      />
    </BottomSlide>
  );
};

export default SlideMenu;
