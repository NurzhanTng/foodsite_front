import { GeoObject } from "../fetch/fetchYandexAddressByName.ts";

type FetchAddressesProps = {
  fetchResult: GeoObject[];
  handleChooseAddress?: (address: GeoObject) => void;
  getTextFromComponents: (address: GeoObject) => string;
};

const FetchAddresses = ({
  fetchResult,
  handleChooseAddress,
  getTextFromComponents,
}: FetchAddressesProps) => {
  return (
    <div>
      <h3 className="mb-2 ml-4 text-base font-medium text-textSecondary">
        Результаты поиска
      </h3>
      <div className="flex flex-col gap-4 rounded-xl bg-bgColor2 px-5 py-4 shadow-option">
        {fetchResult.map((address, index) => (
          <div
            key={index}
            onClick={() =>
              handleChooseAddress ? handleChooseAddress(address) : ""
            }
            className={`${index !== fetchResult.length - 1 ? "border-b pb-3" : ""} border-fontSecondary2  text-fontSecondary`}
          >
            {getTextFromComponents(address)}
          </div>
        ))}

        {fetchResult.length === 0 && <p>Адрес не найден</p>}
      </div>
    </div>
  );
};

export default FetchAddresses;
