
async function getAddress(latitude: number, longitude: number): Promise<string> {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.display_name) {
            console.log(`---- get_address ----: Address not found: ${latitude}, ${longitude}`);
            return '';
        }

        return data.display_name;
    } catch (error) {
        console.error('Error occurred while getting the address:', error);
        return '';
    }
}

export default getAddress;
