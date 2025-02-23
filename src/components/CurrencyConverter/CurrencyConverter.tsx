import { useEffect, useState } from "react";
import { DEFAULT_CURRENCIES, MAX_CURRENCY_INPUTS } from "../../utils/constants";
import { convertCurrency } from "../../api/convertRates";

import useRatesStore from "../../store/useRatesStore";
import CurrencyButton from "../AddCurrencyButton/AddCurrencyButton";
import CurrencyInput from "../CurrencyInput/CurrencyInput";
import styles from "./CurrencyConverter.module.css";

const CurrencyConverter = () => {
  const { rates, loading, error, setRates } = useRatesStore();
  const [addedCurrencies, setAddedCurrencies] = useState(DEFAULT_CURRENCIES);

  useEffect(() => {
    const savedRates = sessionStorage.getItem("convertedRates");
    if (savedRates) {
      setRates(JSON.parse(savedRates));
    }
  }, [setRates]);

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
    if (addedCurrencies.length < MAX_CURRENCY_INPUTS) {
      if (!addedCurrencies.includes(currency)) {
        setAddedCurrencies([...addedCurrencies, currency]);
      }
    }
  };

  const handleRemoveCurrency = (currency: string) => {
    setAddedCurrencies(
      addedCurrencies.filter((c) => c !== currency || c === "USD")
    );
  };

  if (loading) return <div>Loading...</div>;
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
