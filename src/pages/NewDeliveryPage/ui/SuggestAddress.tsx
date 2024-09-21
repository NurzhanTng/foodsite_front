import renderHighlightedText from "./renderHighlightedText.tsx";
import { SuggestAddress } from "../fetch/suggestAddress.ts";

type SuggestAddressProps = {
  userLocation: string | null;
  suggestAddresses: SuggestAddress[];
  handleSuggestAddressClick: (address: SuggestAddress) => void;
};

const SuggestAddress = ({
  userLocation,
  suggestAddresses,
  handleSuggestAddressClick,
}: SuggestAddressProps) => {
  return (
    <div>
      {suggestAddresses.map((address, index) => {
        return (
          <div
            key={index}
            onClick={() => handleSuggestAddressClick(address)}
            className={`${index === suggestAddresses.length - 1 ? "" : "border-b-[1px]"} mx-5 mb-3 max-w-full whitespace-pre-wrap break-words border-buttonSecondary2`}
          >
            <div className="mb-3 text-fontSecondary">
              <p className="text-sm">
                {renderHighlightedText(address.title.text, address.title.hl)}
              </p>
              <div className="flex flex-row justify-between">
                {address.subtitle && (
                  <p className="w-fit text-xs">
                    {renderHighlightedText(
                      address.subtitle.text,
                      address.subtitle.hl,
                    )}
                  </p>
                )}
                {userLocation && (
                  <p className="w-fit min-w-[40px] text-xs">
                    {address.distance.text}
                  </p>
                )}
              </div>
            </div>

            <div className="hidden" key={index}>
              {JSON.stringify(address, null, "\t")}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SuggestAddress;
