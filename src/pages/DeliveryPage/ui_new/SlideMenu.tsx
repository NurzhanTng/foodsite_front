import BottomSlide from "../../../features/BottomSlide";
import DeliverySwitch from "../ui/DeliverySwitch.tsx";
import SelectCard from "../../../entities/SelectCard.tsx";
import Icon from "../../../shared/Icon";
import Input from "../../../shared/Input.tsx";
import { useState } from "react";
import { useAppSelector } from "../../../store/hooks.ts";
import CompanyCards from "../../../widget/CompanyCards.tsx";

const SlideMenu = () => {
  const companyState = useAppSelector((state) => state.companies);
  const [isDelivery, setIsDelivery] = useState(true);
  const [stage, setStage] = useState<0 | 1 | 2>(0);

  return (
    <BottomSlide className="bg-bgColor px-[20px] z-0" setStage={setStage}>
      <div className="w-[50px] h-[3px] bg-button absolute left-[50%] translate-x-[-50%] top-[7px] rounded-[90px] "></div>

      <DeliverySwitch className="my-[30px]" isDelivery={isDelivery} setIsDelivery={setIsDelivery} />

      {stage !== 0 && !isDelivery && (
        <CompanyCards companySpots={companyState.companies} />
      )}

      {stage !== 0 && isDelivery && (
        <div className="mt-[20px] flex flex-col gap-5">
          <SelectCard
            className="my-0"
            name="Прошлые адреса"
            description="Нажмите, чтобы выбрать"
            leftIcon="geo"
          >
            <Icon type="arrowRight" />
          </SelectCard>

          <Input
            // onChange={handleChange}
            // value={
            //   orderState.address.lat === -1 || orderState.address.lat === 0
            //     ? orderState.address.parsed
            //     : emptyAddressParsed
            // }
            label="Введите адрес доставки"
          />

          <Input
            onChange={() => {
              // (event) =>
              //   dispatch(setExactAddress(event.target.value))
            }}
            // value={orderState.exactAddress}
            label="Введите номер квартиры / офиса"
          />
        </div>
      )}
    </BottomSlide>
  );
};

export default SlideMenu;
