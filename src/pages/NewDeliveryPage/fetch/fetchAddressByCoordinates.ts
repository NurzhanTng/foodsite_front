const fetchAddressByCoordinates = async (lat: number, long: number) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      lat: 76.9402367,
      long: 43.252603
    })
  };

  try {
    const response = await fetch("https://back.pizzeria-almaty.kz/service/getby_coordinates/", requestOptions);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Response:", data, "| Body:", {
      lat: lat,
      long: long
    });
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export default fetchAddressByCoordinates;
