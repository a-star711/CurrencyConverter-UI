export const sortRates = async () => {
  const response = await fetch("https://currency-converter-back.vercel.app/sort");

  if (!response.ok) throw new Error("Failed to fetch rates");
  const sortedRates = await response.json();

  return sortedRates;
};

