import { useState } from "react";
import { Select, MenuItem, FormControl } from "@mui/material";
import styles from "./AddCurrencyButton.module.css";

type AddCurrencyButtonProps = {
  availableCurrencies: string[];
  addedCurrencies: string[];
  onAddCurrency: (currency: string) => void;
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

  const addCurrencyButtonStyle = {
    backgroundColor: "#4983db",
    ":hover": {
      backgroundColor: "#125ea6",
    },
    color: "white",
    fontSize: "12px",
    minWidth: "auto",
  };

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
          className={styles.selectButton}
          open={isDropdownOpen}
          onOpen={handleOnOpen}
          onClose={handleOnClose}
          onChange={(e) => handleAddCurrency(e.target.value as string)}
          displayEmpty
          renderValue={() => "+ add Currency"}
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
