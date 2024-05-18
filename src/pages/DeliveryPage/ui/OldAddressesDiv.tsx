import Icon from "../../../shared/Icon";
import { OrderAddress } from "../ui_old/useSlideMenu.ts";

type OldAddressesDivProps = {
  oldAddresses: OrderAddress[];
  updateAddress?: (address: OrderAddress) => void;
};

const OldAddressesDiv = ({
  oldAddresses,
  updateAddress,
}: OldAddressesDivProps) => {
  const oldAddresses2: OrderAddress[] = [
    ...oldAddresses,
    ...oldAddresses,
    ...oldAddresses,
    ...oldAddresses,
    ...oldAddresses,
    ...oldAddresses,
    ...oldAddresses,
    ...oldAddresses,
    ...oldAddresses,
    ...oldAddresses,
    ...oldAddresses,
    ...oldAddresses,
    ...oldAddresses,
    ...oldAddresses,
    ...oldAddresses,
    ...oldAddresses,
  ];

  return (
    <>
      <h3 className="text-base font-medium text-textSecondary">
        Старые адреса
      </h3>
      <div className="flex flex-col gap-4 rounded-xl bg-bgColor2 px-5 py-4 shadow-option">
        {oldAddresses2?.map((address, index) => (
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
              className={`${index !== oldAddresses2.length - 1 ? "border-b pb-3" : ""} border-fontSecondary2 pl-8 text-fontSecondary`}
            >
              {address.parsed}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default OldAddressesDiv;
