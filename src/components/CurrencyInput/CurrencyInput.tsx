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
    let value = e.target.value;

    if (value.startsWith("0") && value.length > 1) {
      value = value.replace(/^0+/, "") || "1";
    }

    let numberValue = parseFloat(value);

    if (isNaN(numberValue) || numberValue < 0) {
      numberValue = 1;
      value = "1";
    }

    setInputValue(value);
    debouncedOnChange(currency, numberValue);
  };

  return (
    <section className={styles.inputContainer}>
      <label className={styles.label}>{currency}</label>
      <input
        type="number"
        value={inputValue}
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
