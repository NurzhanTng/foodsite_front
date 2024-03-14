type Address = {
  lon: number;
  lat: number;
};

async function getAddress(
  latitude: number,
  longitude: number,
): Promise<string> {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.display_name) {
      console.log(
        `---- get_address ----: Address not found: ${latitude}, ${longitude}`,
      );
      return "";
    }

    return data.display_name;
  } catch (error) {
    console.error("Error occurred while getting the address:", error);
    return "";
  }
}

async function getCoordinates(text: string): Promise<Address> {
  const encodedText = encodeURIComponent(text);
  const url = `https://geocode.maps.co/search?q="Казахстан, город Алматы, ${encodedText}"&api_key=65e7e4e0218f9394738428ocr29e3e2`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.length === 0) {
      console.log(`---- get_address ----: Address not found for text: ${text}`);
      return { lon: 0, lat: 0 };
    }

    // Assuming you want to return the first result
    return data[0];
  } catch (error) {
    console.error("Error occurred while getting the address:", error);
    return { lon: 0, lat: 0 };
  }
}

export { getAddress, getCoordinates };
