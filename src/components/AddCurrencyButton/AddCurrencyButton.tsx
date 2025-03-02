import { useState } from "react";
import { Select, MenuItem, FormControl } from "@mui/material";
import styles from "./AddCurrencyButton.module.css";

type AddCurrencyButtonProps = {
  availableCurrencies: string[];
  addedCurrencies: string[];
  onAddCurrency: (currency: string) => void;
};

const addCurrencyButtonStyle = {
  backgroundColor: "var(--button-bg)",
  ":hover": {
    backgroundColor: "var(--button-bg-hover)",
  },
  color: "var(--button-text)",
  fontSize: "12px",
  width: 160,
  height: "80%",
};

function AddCurrencyButton({
  availableCurrencies,
  addedCurrencies,
  onAddCurrency,
}: AddCurrencyButtonProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredCurrencies = availableCurrencies.filter(
    (currency) => !addedCurrencies.includes(currency)
  );

  const handleAddCurrency = (currency: string) => {
    if (currency) {
      onAddCurrency(currency);
      setIsDropdownOpen(false);
    }
  };

  const handleOnOpen = () => {
    setIsDropdownOpen(true);
  };

  const handleOnClose = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className={styles.buttonContainer}>
      <FormControl className={styles.dropdown}>
        <Select
          aria-label="add currency"
          className={styles.selectButton}
          open={isDropdownOpen}
          onOpen={handleOnOpen}
          onClose={handleOnClose}
          onChange={(e) => handleAddCurrency(e.target.value as string)}
          displayEmpty
          renderValue={() => "+ Add Currency"}
          value=""
          sx={addCurrencyButtonStyle}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
                overflowY: "auto",
              },
            },
          }}
        >
          <MenuItem value="" disabled>
            Select currency
          </MenuItem>
          {filteredCurrencies.map((currency) => (
            <MenuItem key={currency} value={currency}>
              {currency}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default AddCurrencyButton;
