import { API_BASE_URL } from "../utils/constants";

export const convertCurrency = async (currency: string, value: number) => {
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/rates/convert`, {
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


export const fetchRates = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/rates`);

    if (!response.ok) {
      throw new Error("Failed to fetch rates");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching rates:", error);
  }
};

export const sortRates = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/rates/sort`);

    if (!response.ok) throw new Error("Failed to fetch rates");
    const sortedRates = await response.json();

    return sortedRates;
  } catch (error) {
    console.error("Error fetching rates:", error);
  }
};

