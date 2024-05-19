import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import Input from "../../../shared/Input.tsx";

type Result1 = {
  address: string;
  building: string;
  levels: unknown;
  roof_shape: unknown;
  coordinates: unknown;
};

type Result2 = {
  display_name: string;
};

type Result3 = {
  type: string;
  features: {
    type: string;
    properties: {
      datasource: object;
      country: string;
      country_code: string;
      state: string;
      county: string;
      city: string;
      postcode: string;
      street: string;
      housenumber: string;
      lon: number;
      lat: number;
      result_type: string;
      formatted: string;
      address_line1: string;
      address_line2: string;
      category: string;
      timezone: any;
      plus_code: any;
      plus_code_short: any;
      rank: any;
      place_id: string;
    };
    geometry: object;
    bbox: number[];
  }[];
  query: {
    text: string;
    parsed: object;
  };
};

type Result4 = {
  response: {
    GeoObjectCollection: {
      metaDataProperty: {
        GeocoderResponseMetaData: object;
      };
      featureMember: [
        {
          GeoObject: {
            metaDataProperty: {
              GeocoderMetaData: {
                precision: string;
                text: string;
                kind: string;
                Address: {
                  country_code: "KZ";
                  formatted: string;
                  Components: object[];
                };
                AddressDetails: object;
              };
            };
            name: string;
            description: "Алматы, Казахстан";
            boundedBy: object;
            uri: string;
            Point: object;
          };
        },
      ];
    };
  };
};

type RequestData = {
  path: string;
  method: "POST" | "GET" | "UPDATE" | "DELETE";
  body: string | null;
};

type SearchMethod = {
  requestData: (searchText: string) => RequestData;
  parseResult: (result: unknown) => string;
  name: string;
  link: string;
  error: string | null;
  value: string;
  time: number;
};

const SearchTestPage = () => {
  const [text, setText] = useState("");
  const [searchMethods, setSearchMethods] = useState<SearchMethod[]>([]);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const parseResult = true;

  useEffect(() => {
    addNewSearchMethod(
      "Наш проект",
      "https://kz.pizzeria-almaty.kz/",
      (searchText: string) => {
        return {
          path:
            import.meta.env.VITE_REACT_APP_API_BASE_URL +
            "service/get_addresses/",
          method: "POST",
          body: JSON.stringify({ search_string: searchText }, null, 20),
        };
      },
      (searchResult: unknown) => {
        const result = searchResult as Result1[];
        return JSON.stringify(
          result.map((address) => address.address).slice(0, 10),
          null,
          20,
        );
      },
    );
    addNewSearchMethod(
      "geocode.maps.co",
      "https://geocode.maps.co/",
      (searchText: string) => {
        return {
          path: `https://geocode.maps.co/search?q=Алматы, ${searchText}&api_key=${import.meta.env.VITE_REACT_APP_API_GEOCODE}`,
          method: "GET",
          body: null,
        };
      },
      (searchResult: unknown) => {
        const result = searchResult as Result2[];
        // console.log("Result text", resultText);
        return JSON.stringify(
          result.map((address) => address.display_name).slice(0, 10),
          null,
          2,
        );
      },
    );

    // addNewSearchMethod(
    //   "geokeo.com",
    //   "https://geokeo.com/",
    //   (searchText: string) => {
    //     return {
    //       path:
    //       `https://geokeo.com/geocode/v1/search.php?q=${searchText}&api=${import.meta.env.VITE_REACT_APP_API_GEOKEO}`,
    //       method: "GET",
    //       body: null,
    //     };
    //   },
    //   (searchResult: unknown) => {
    //     const result = JSON.stringify(searchResult);
    //     // const result = searchResult as Result2[];
    //     // const resultText = JSON.stringify(
    //     //   result.map((address) => address.display_name),
    //     //   null,
    //     //   2,
    //     // );
    //     // console.log("Result text", resultText);
    //     return result;
    //   },
    // );

    // addNewSearchMethod(
    //   "geocodify.com",
    //   "https://geocodify.com/",
    //   (searchText: string) => {
    //     return {
    //       path: `https://api.geocodify.com/v2/geocode?api_key=${import.meta.env.VITE_REACT_APP_API_GEOKODIFY}&q=${searchText}`,
    //       method: "GET",
    //       body: null,
    //     };
    //   },
    //   (searchResult: unknown) => {
    //     const resultText = JSON.stringify(searchResult);
    //     // const result = searchResult as Result2[];
    //     // const resultText = JSON.stringify(
    //     //   result.map((address) => address.display_name),
    //     //   null,
    //     //   2,
    //     // );
    //     // console.log("Result text", resultText);
    //     return resultText;
    //   },
    // );

    addNewSearchMethod(
      "geoapify.com",
      "https://myprojects.geoapify.com/",
      (searchText: string) => {
        return {
          path: `https://api.geoapify.com/v1/geocode/search?text=Алматы, ${searchText}&apiKey=${import.meta.env.VITE_REACT_APP_API_GEOAPIFY}`,
          method: "GET",
          body: null,
        };
      },
      (searchResult: unknown) => {
        const result = searchResult as Result3;
        console.log("geoapify", result);
        return JSON.stringify(
          result.features.map((address) => address.properties.formatted),
          null,
          2,
        );
      },
    );

    // addNewSearchMethod(
    //   "my.locationIQ.com",
    //   "https://my.locationiq.com/",
    //   (searchText: string) => {
    //     return {
    //       path: `https://us1.locationiq.com/v1/search?key=pk.36bd51cad08d856425dba629fa984ac2&q=Алматы, ${searchText}&format=json&`,
    //       method: "GET",
    //       body: null,
    //     };
    //   },
    //   (searchResult: unknown) => {
    //     const result = searchResult as Result2[];
    //     // console.log("Result text", resultText);
    //     return JSON.stringify(
    //       result.map((address) => address.display_name).slice(0, 10),
    //       null,
    //       2,
    //     );
    //   },
    // );

    addNewSearchMethod(
      "Yandex",
      "https://yandex.ru/maps-api/products/geocoder-api#price",
      (searchText: string) => {
        return {
          path: `https://geocode-maps.yandex.ru/1.x/?apikey=${import.meta.env.VITE_REACT_APP_API_YANDEX_TOKEN}&geocode=Алматы, ${searchText}&format=json`,
          method: "GET",
          body: null,
        };
      },
      (searchResult: unknown) => {
        const result = searchResult as Result4;
        // console.log("Result text", resultText);
        return JSON.stringify(
          result.response.GeoObjectCollection.featureMember
            .map(
              (address) =>
                address.GeoObject.metaDataProperty.GeocoderMetaData.text,
            )
            .slice(0, 10),
          null,
          2,
        );
      },
    );
  }, []);

  const handleChange: ChangeEventHandler<HTMLInputElement> | undefined = (
    event,
  ) => {
    const searchText = event.target.value;
    setText(searchText);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
      for (const method of searchMethods) {
        let error: string | null = null;
        let result: unknown[];

        const requestData = method.requestData(searchText);
        const requestBody =
          requestData.body !== null
            ? {
                method: requestData.method,
                headers: {
                  "Content-Type": "application/json",
                },
                body: requestData.body,
              }
            : {
                method: requestData.method,
              };

        const startTime = performance.now();
        try {
          const response = await fetch(requestData.path, requestBody);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          result = await response.json();
        } catch (error) {
          error = "Error:" + error;
        }
        const endTime = performance.now();

        // @ts-ignore
        // console.log("result fetch: ", result);

        setSearchMethods((methods) =>
          methods.map((oldMethod) => {
            if (oldMethod.name === method.name) {
              console.log({
                ...method,
                time: Math.round(endTime - startTime),
                error: error,
                value:
                  error === null
                    ? parseResult
                      ? method.parseResult(result)
                      : JSON.stringify(result)
                    : "",
              });
              return {
                ...method,
                time: Math.round(endTime - startTime),
                error: error,
                value:
                  error === null
                    ? parseResult
                      ? method.parseResult(result)
                      : JSON.stringify(result)
                    : "",
              };
            } else {
              return oldMethod;
            }
          }),
        );
      }
    }, 1000);
  };

  function addNewSearchMethod(
    name: string,
    link: string,
    requestData: (searchText: string) => RequestData,
    parseResult: (result: unknown) => string,
  ) {
    setSearchMethods((methods) => {
      if (methods.find((method) => method.name === name) !== undefined)
        return methods;
      return [
        ...methods,
        {
          requestData: requestData,
          parseResult: parseResult,
          name: name,
          link: link,
          error: "",
          value: "",
          time: 0,
        },
      ];
    });
  }

  return (
    <div className="p-6">
      <Input label={"Поисковая строка"} value={text} onChange={handleChange} />

      {searchMethods.map((method) => {
        const result: string[] =
          method.value === "" || method.value === undefined || !parseResult
            ? []
            : JSON.parse(method.value);
        return (
          <div key={method.name} className="my-6 bg-bgColor2 p-5">
            <h3 className="font-bold">
              <a href={method.link}>{method.name}</a>{" "}
              <span className="ml-5 font-medium text-button">
                {method.time}ms
              </span>
            </h3>
            <p>Результат: </p>
            {!parseResult && (
              <p className="whitespace-pre-line text-button">{method.value}</p>
            )}
            {parseResult &&
              result &&
              result.map((value: string, index: number) => (
                <p key={index} className="whitespace-pre-line text-button">
                  [{index}] - {value}
                </p>
              ))}
          </div>
        );
      })}
    </div>
  );
};

export default SearchTestPage;
