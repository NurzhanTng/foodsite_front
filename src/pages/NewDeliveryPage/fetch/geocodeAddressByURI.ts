export type Kind =
  | "house"
  | "street"
  | "metro"
  | "district"
  | "locality"
  | "area"
  | "province"
  | "country"
  | "region"
  | "hydro"
  | "railway_station"
  | "station"
  | "route"
  | "airport"
  | "entrance"
  | "other";

export type Component = { kind: Kind; name: string };

export type Presition =
  | "exact"
  | "number"
  | "near"
  | "range"
  | "street"
  | "other";

export type GeoObject = {
  GeoObject: {
    metaDataProperty: {
      GeocoderMetaData: {
        precision: Presition;
        text: string;
        kind: Kind;
        Address: {
          country_code: string;
          formatted: string;
          Components: Component[];
        };
      };
    };
    name: string;
    description: string;
    boundedBy: {
      Envelope: {
        lowerCorner: string; // example: "76.842276 43.198302";
        upperCorner: string; // example: "76.915524 43.240197";
      };
    };
    uri: string;
    Point: {
      pos: string; // example: "76.878909 43.219237"
    };
  };
};

export type YandexAddresses = {
  response: {
    GeoObjectCollection: {
      metaDataProperty: {
        GeocoderResponseMetaData: {
          fix: string;
          request: string;
          suggest: string;
          found: string;
          results: string;
          skip: string;
        };
      };
      featureMember: GeoObject[];
    };
  };
};

const geocodeAddressByURI = async (uri: string): Promise<YandexAddresses> => {
  const response = await fetch(
    `https://geocode-maps.yandex.ru/1.x/?apikey=${import.meta.env.VITE_REACT_APP_API_YANDEX_TOKEN}&uri=${uri}&format=json`,
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json().then((data) => {
    console.log(data);
    return data;
  });
};

export default geocodeAddressByURI;
