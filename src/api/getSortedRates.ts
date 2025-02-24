import { API_BASE_URL } from "../utils/constants";

export const sortRates = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/sort`);

    if (!response.ok) throw new Error("Failed to fetch rates");
    const sortedRates = await response.json();

    return sortedRates;
  } catch (error) {
    console.error("Error fetching rates:", error);
  }
};
