import { Address } from "../fetch/fetchAddressesByName.ts";

type FetchAddressesProps = {
  fetchResult: Address[];
  handleChooseAddress: (address: Address) => void;
};

const FetchAddresses = ({
  fetchResult,
  handleChooseAddress,
}: FetchAddressesProps) => {
  return (
    <div>
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

        {fetchResult.length === 0 && <p>Адрес не найден</p>}
      </div>
    </div>
  );
};

export default FetchAddresses;
