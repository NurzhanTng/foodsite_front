import Input from "../../../shared/Input.tsx";
import React, { useState } from "react";
import suggestAddress, { SuggestAddress } from "../fetch/suggestAddress.ts";
import geocodeAddressByURI from "../fetch/geocodeAddressByURI.ts";
import renderHighlightedText from "./renderHighlightedText.tsx";

const DeliveryPageTest = () => {
  const userLocation: string | null = "76.877020,43.245187";
  const [fetchText, setFetchText] = useState<string>("");
  const [suggestAddresses, setSuggestAddresses] = useState<SuggestAddress[]>(
    [],
  );
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const handleAddressChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const text = event.target.value;
    setFetchText(text);

    if (timerId) clearTimeout(timerId);
    if (text === "") {
      setSuggestAddresses([]);
      return;
    }
    const newTimerId = setTimeout(() => {
      suggestAddress(
        text,
        "76.860775,43.184827~76.996514,43.283191",
        userLocation ? userLocation : undefined,
      ).then(
        (addresses) =>
          addresses.results && setSuggestAddresses(addresses.results),
      );
    }, 800);
    setTimerId(newTimerId);
  };

  const handleSuggestAddressClick = (suggest: SuggestAddress) => {
    geocodeAddressByURI(suggest.uri)
      .then((data) =>
        console.log(`geocodeAddressByURI: ${JSON.stringify(data)}`),
      )
      .catch((error) => console.log(`geocodeAddressByURI ERROR: ${error}`));
    setSuggestAddresses([]);
    setFetchText(suggest.title.text);
  };

  return (
    <div>
      <Input
        onChange={handleAddressChange}
        value={fetchText}
        label="Введите адрес доставки"
        className="mx-auto my-5 w-[300px]"
      />

      {suggestAddresses.map((address, index) => {
        return (
          <div
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

export default DeliveryPageTest;
