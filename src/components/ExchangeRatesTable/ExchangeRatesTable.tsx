import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import useRatesStore from "../../store/useRatesStore";

import CustomButton from "../CustomButton/CustomButton";
import { rowsPerPageOptions } from "../../utils/constants";
const ExchangeRatesTable = () => {
  const { rates, loading, error, fetchSortedRates } = useRatesStore();
  const [ratesToDisplay, setRatesToDisplay] =
    useState<Record<string, number>>(rates);
  const [isSorted, setIsSorted] = useState<boolean>(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    useRatesStore.getState().fetchRates();
  }, []);

  useEffect(() => {
    setRatesToDisplay(rates);
  }, [rates]);

  const toggleSort = async () => {
    const sortedRates = await fetchSortedRates();
    setRatesToDisplay(isSorted ? rates : sortedRates);
    setIsSorted(!isSorted);
  };

  const currencies = Object.entries(ratesToDisplay);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Currency</strong>
            </TableCell>
            <TableCell align="right">
              <CustomButton onClick={toggleSort}>
                {isSorted ? "Reset to A-Z" : "Sort by Value"}
              </CustomButton>
              <strong>Exchange Rate (per 1 USD)</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currencies
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(([currency, rate]) => (
              <TableRow key={currency}>
                <TableCell>{currency}</TableCell>
                <TableCell align="right">{rate.toFixed(4)}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={currencies.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) =>
          setRowsPerPage(parseInt(e.target.value, 10))
        }
      />
    </TableContainer>
  );
};

export default ExchangeRatesTable;
