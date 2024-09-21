import checkIsInPolygon from "../../../utils/checkIsInPolygon.ts";
import { CompanySpot } from "../../../store/slices/companySlice.ts";
import getCenterOfPolygon from "../../../utils/getCenterOfPolygon.ts";

export type Address = {
  address: string;
  building: string;
  levels: string | null;
  roof_shape: string | null;
  coordinates: [number, number][];
};

type UnparsedAddress = {
  address: string;
  building: string;
  levels: string | null;
  roof_shape: string | null;
  coordinates: string;
};

const fetchAddressesByName = async (
  searchString: string,
  company?: CompanySpot,
): Promise<Address[]> => {
  const url =
    import.meta.env.VITE_REACT_APP_API_BASE_URL + "service/get_addresses/";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search_string: searchString }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const raw_data: UnparsedAddress[] = await response.json();
    const addresses = raw_data
      .map((address) => ({
        ...address,
        coordinates: JSON.parse(address.coordinates),
      }))
      .filter((address) => !(typeof address.coordinates === "number"));
    if (company) {
      return addresses.filter((address) =>
        checkIsInPolygon(
          company.delivery_layers[0].points,
          getCenterOfPolygon(address.coordinates),
        ),
      );
    } else {
      return addresses;
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export default fetchAddressesByName;
