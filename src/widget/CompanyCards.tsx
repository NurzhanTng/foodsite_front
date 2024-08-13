import { useAppDispatch, useAppSelector } from "../store/hooks/hooks.ts";
import { twMerge } from "tailwind-merge";
import Button from "../shared/Button.tsx";
import { setCompanyId } from "../store/slices/orderSlice.ts";
import { CompanySpot } from "../store/slices/companySlice.ts";

type CompanyCardsProps = {
  className?: string;
  companySpots: Array<CompanySpot>;
  handleSaveButton: () => void;
};

const CompanyCards = ({ className = "", companySpots }: CompanyCardsProps) => {
  // // const state = useAppSelector((state) => state.main);
  const orderState = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();

  return (
    <div className={twMerge("flex flex-col gap-[10px]", className)}>
      <h3 className="mb-4 text-base font-medium text-textSecondary">
        Дополнительно
      </h3>

      {companySpots.map((companySpot) => {
        return (
          <Button
            key={companySpot.id}
            onClick={() => {
              dispatch(setCompanyId(companySpot.id));
            }}
            styleType="outline"
            showText={false}
            className={`${companySpot.id === orderState.company_id ? "bg-button" : "bg-bgColor"} relative flex w-full flex-col gap-1 px-5 py-[14px] text-left`}
          >
            <h3 className="line-clamp-1 text-base font-normal leading-none text-white">
              {companySpot.name}
            </h3>
            <p
              className={`${companySpot.id === orderState.company_id ? "text-white" : ""} line-clamp-2 text-sm font-medium leading-tight text-textSecondary`}
            >
              {companySpot.address.parsed === ""
                ? "Адрес загружается"
                : companySpot.address.parsed}
            </p>
            <p
              className={`${companySpot.id === orderState.company_id ? "text-white" : ""} line-clamp-1 text-sm font-medium leading-tight text-textSecondary`}
            >
              {companySpot.open_time} - {companySpot.close_time}
            </p>

            <div className=""></div>
          </Button>
        );
      })}
    </div>
  );
};

export default CompanyCards;
