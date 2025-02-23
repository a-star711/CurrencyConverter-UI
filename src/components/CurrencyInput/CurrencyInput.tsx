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
  const [inputValue, setInputValue] = useState(rate);

  useEffect(() => {
    setInputValue(rate);
  }, [rate]);

  const debouncedOnChange = useCallback(
    debounce((currency: string, value: number) => {
      onChange(currency, value);
    }, 600),
    [onChange]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseFloat(e.target.value);

    if (isNaN(value) || value < 0) {
      value = 0;
    }
    setInputValue(value);
    debouncedOnChange(currency, value);
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
