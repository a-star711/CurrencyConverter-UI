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
  CircularProgress,
  Box,
} from "@mui/material";
import useRatesStore from "../../store/useRatesStore";
import CustomButton from "../CustomButton/CustomButton";
import { initialRowsCount, rowsPerPageOptions } from "../../utils/constants";

const ExchangeRatesTable = () => {
  const { rates, loading, error, fetchSortedRates } = useRatesStore();
  const [ratesToDisplay, setRatesToDisplay] =
    useState<Record<string, number>>(rates);
  const [isSorted, setIsSorted] = useState<boolean>(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsCount);

  useEffect(() => {
    useRatesStore.getState().fetchRates();
  }, []);

  useEffect(() => {
    setRatesToDisplay(rates);
  }, [rates]);

  const toggleSort = async () => {
    if (isSorted) {
      setRatesToDisplay(rates);
      setIsSorted(false);
      return;
    }

    const sortedRates = await fetchSortedRates();
    setRatesToDisplay(sortedRates);
    setIsSorted(true);
  };

  const currencies = Object.entries(ratesToDisplay);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <TableContainer
      component={Paper}
      sx={{ boxShadow: "2px 2px 10px  #1249D3" }}
    >
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
