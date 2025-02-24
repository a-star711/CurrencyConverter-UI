import { useEffect, useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter";
import useRatesStore from "./store/useRatesStore";
import ExchangeRatesTable from "./components/ExchangeRatesTable/ExchangeRatesTable";
import CustomButton from "./components/CustomButton/CustomButton";

function App() {
  const [currentView, setCurrentView] = useState<"converter" | "rates">(
    "converter"
  );
  const { fetchRates } = useRatesStore();

  useEffect(() => {
    fetchRates();
  }, []);

  const toggleView = () => {
    setCurrentView((prevView) =>
      prevView === "converter" ? "rates" : "converter"
    );
  };

  return (
    <main>
      <Navbar />
      <CustomButton onClick={toggleView}>
        {currentView === "converter"
          ? "View Exchange Rates"
          : "Use Currency Converter"}
      </CustomButton>
      <section>
        {currentView === "converter" && <CurrencyConverter />}
        {currentView === "rates" && <ExchangeRatesTable />}
      </section>
    </main>
  );
}

export default App;
