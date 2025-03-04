import React, { useState, useEffect, useCallback } from "react";
import styles from "./CurrencyInput.module.css";
import { debounce } from "../../utils/debounce";

type CurrencyInputProps = {
  currency: string;
  rate: number;
  onChange: (currency: string, value: number) => void;
  onRemove: () => void;
};

const CurrencyInput = ({
  currency,
  rate,
  onChange,
  onRemove,
}: CurrencyInputProps) => {
  const [inputValue, setInputValue] = useState(rate.toString());

  useEffect(() => {
    setInputValue(rate.toString());
  }, [rate]);

  const debouncedOnChange = useCallback(
    debounce((currency: string, numberValue: number) => {
      onChange(currency, numberValue);
    }, 600),
    [onChange]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let stringValue = e.target.value;

    if (stringValue.startsWith("0") && stringValue.length > 1) {
      stringValue = stringValue.replace(/^0+/, "") || "1";
    }

    let numberValue = parseFloat(stringValue);

    if (isNaN(numberValue) || numberValue < 0) {
      numberValue = 1;
      stringValue = "1";
    }

    setInputValue(stringValue);
    debouncedOnChange(currency, numberValue);
  };

  return (
    <section className={styles.inputContainer}>
      <label className={styles.label}>{currency}</label>
      <input
        type="number"
        value={inputValue}
        aria-label="currency-input"
        onChange={handleChange}
        className={styles.input}
      />
      <button onClick={onRemove} className={styles.removeButton}>
        ×
      </button>
    </section>
  );
};

export default CurrencyInput;
