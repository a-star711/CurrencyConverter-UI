import { useEffect, useState } from "react";
import { DEFAULT_CURRENCIES, MAX_CURRENCY_INPUTS } from "../../utils/constants";
import { convertCurrency } from "../../api/convertRates";

import useRatesStore from "../../store/useRatesStore";
import CurrencyButton from "../AddCurrencyButton/AddCurrencyButton";
import CurrencyInput from "../CurrencyInput/CurrencyInput";
import { CircularProgress, Box } from "@mui/material";
import styles from "./CurrencyConverter.module.css";

const CurrencyConverter = () => {
  const { rates, loading, error, setRates } = useRatesStore();
  const [addedCurrencies, setAddedCurrencies] = useState(DEFAULT_CURRENCIES);

  useEffect(() => {
    const savedRates = sessionStorage.getItem("convertedRates");
    const cachedCurrencies = sessionStorage.getItem("addedCurrencies");
    if (savedRates) {
      setRates(JSON.parse(savedRates));
    }

    if (cachedCurrencies) {
      setAddedCurrencies(JSON.parse(cachedCurrencies));
    }
  }, []);

  const handleInputChange = async (currency: string, value: number) => {
    try {
      const convertedRates = await convertCurrency(currency, value);
      setRates(convertedRates);
      sessionStorage.setItem("convertedRates", JSON.stringify(convertedRates));
    } catch (error) {
      console.error("Conversion Error:", error);
    }
  };

  const handleAddCurrency = (currency: string) => {
    if (
      addedCurrencies.length < MAX_CURRENCY_INPUTS &&
      !addedCurrencies.includes(currency)
    ) {
      const updatedCurrencies = [...addedCurrencies, currency];
      setAddedCurrencies(updatedCurrencies);
      sessionStorage.setItem(
        "addedCurrencies",
        JSON.stringify(updatedCurrencies)
      );
    }
  };

  const handleRemoveCurrency = (currency: string) => {
    if (currency === "USD") return;
    {
      const updatedCurrencies = addedCurrencies.filter((c) => c !== currency);
      setAddedCurrencies(updatedCurrencies);
      sessionStorage.setItem(
        "addedCurrencies",
        JSON.stringify(updatedCurrencies)
      );
    }
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  if (error) return <div>Error: {error}</div>;

  if (!rates || Object.keys(rates).length === 0) {
    return <div>No rates available.</div>;
  }

  return (
    <div className={styles.wrapper}>
      {addedCurrencies.map((currency) => (
        <CurrencyInput
          key={currency}
          currency={currency}
          rate={rates[currency] || 0}
          onChange={handleInputChange}
          onRemove={() => handleRemoveCurrency(currency)}
        />
      ))}
      <CurrencyButton
        availableCurrencies={Object.keys(rates)}
        addedCurrencies={addedCurrencies}
        onAddCurrency={handleAddCurrency}
      />
    </div>
  );
};

export default CurrencyConverter;
