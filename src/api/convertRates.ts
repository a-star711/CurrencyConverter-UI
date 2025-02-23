import { API_BASE_URL } from "../utils/constants";

export const convertCurrency = async (currency: string, value: number) => {
  
  try {
    const response = await fetch(`${API_BASE_URL}/convert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currency, value }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to convert rates:", errorText);
      throw new Error("Failed to convert rates");
    }

    const data = await response.json();
    return data.rates; 
  } catch (error) {
    console.error("Conversion Error:", error);
    throw error;
  }
};
