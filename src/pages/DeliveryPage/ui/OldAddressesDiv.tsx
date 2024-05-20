import Icon from "../../../shared/Icon";
import { OrderAddress } from "../hooks/useSlideMenu.ts";

type OldAddressesDivProps = {
  oldAddresses: OrderAddress[];
  updateAddress?: (address: OrderAddress) => void;
};

const OldAddressesDiv = ({
  oldAddresses,
  updateAddress,
}: OldAddressesDivProps) => {
  return (
    <>
      <h3 className="mb-1 ml-4 text-base font-medium text-textSecondary">
        Старые адреса
      </h3>
      <div className="flex flex-col gap-4 rounded-xl bg-bgColor2 px-5 py-4 shadow-option">
        {oldAddresses?.map((address, index) => (
          <div
            className="relative"
            key={index}
            onClick={() => (updateAddress ? updateAddress(address) : "")}
          >
            <Icon
              className="absolute left-[-2px] w-[24px] text-fontSecondary"
              type={"clock"}
            />
            <p
              className={`${index !== oldAddresses.length - 1 ? "border-b pb-3" : ""} border-fontSecondary2 pl-8 text-fontSecondary`}
            >
              {address.parsed}, {address.exact_address}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default OldAddressesDiv;
