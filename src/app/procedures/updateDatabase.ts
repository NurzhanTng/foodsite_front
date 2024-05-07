async function postData(url: string, data: any) {
  // const BASE_URL =

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if needed
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error(
      "There was a problem with your fetch operation:",
      // error.message,
    );
    throw error;
  }
}

const updateDatabase = async () => {
  // const categories = [];
};
