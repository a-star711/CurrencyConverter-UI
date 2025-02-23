export const fetchRates = async () => {
  const response = await fetch("https://currency-converter-back.vercel.app/rates");

  if (!response.ok) throw new Error("Failed to fetch rates");
  const data = await response.json();

  return data;
};



