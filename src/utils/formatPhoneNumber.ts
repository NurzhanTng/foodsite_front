function formatPhoneNumber(phoneNumber: string): string {
  // Remove all non-numeric characters from the phone number
  const cleaned = phoneNumber.replace(/\D/g, "");

  // Determine the country code
  let countryCode = "";
  if (cleaned.startsWith("7") || cleaned.startsWith("+7")) {
    countryCode = "+7 ";
    cleaned.slice(1); // Remove the country code from the cleaned string
  } else if (cleaned.startsWith("8")) {
    countryCode = "8 ";
    cleaned.slice(1); // Remove the country code from the cleaned string
  }

  // Format the remaining digits with spaces
  let formatted = countryCode;
  for (let i = 1; i < Math.min(11, phoneNumber.length); i++) {
    // Add a space after every third digit, excluding the last one
    if (i > 0 && (i) % 3 === 0 && i !== 9) {
      formatted += cleaned[i] + " ";
    } else {
      formatted += cleaned[i];
    }
  }

  return formatted.trim();
}

export default formatPhoneNumber;
