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
    return raw_data.map((address) => ({
      ...address,
      coordinates: JSON.parse(address.coordinates),
    }));
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export default fetchAddressesByName;
