export const convertCurrency = async (currency: string, value: number) => {
  try {
    const response = await fetch("https://currency-converter-back.vercel.app/convert", {
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
