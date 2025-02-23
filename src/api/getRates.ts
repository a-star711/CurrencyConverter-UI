import { API_BASE_URL } from "../utils/constants";


export const fetchRates = async () => {
  const response = await fetch(`${API_BASE_URL}/rates`);

  if (!response.ok) throw new Error("Failed to fetch rates");
  const data = await response.json();

  return data;
};



