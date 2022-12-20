import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  ThemeProvider,
  createTheme,
  Typography,
} from "@mui/material";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import "./App.css";
import Money from "./components/Money";
import Balance from "./components/Balance";
import Saving from "./components/Saving";
import light from "./styles/lightTheme";
import dark from "./styles/darkTheme";

import { MoneyItem } from "./types/money";

function App() {
  const [incomes, setIncomes] = useState<MoneyItem[]>([]);
  const [expenses, setExpenses] = useState<MoneyItem[]>([]);
  const [saving, setSaving] = useState(0);
  const [balance, setBalance] = useState(0);
  const [mode, setMode] = useState<"light" | "dark">("light");

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === "light"  ? light  :  dark ),
    },
  });

  const totalIncome = incomes.reduce(
    (prev, curr) => Number(prev) + Number(curr.amount),
    0
  );
  const totalExpenses = expenses.reduce(
    (prev, curr) => Number(prev) + Number(curr.amount),
    0
  );

  useEffect(() => {
    setBalance(totalIncome - totalExpenses - saving);
  }, [incomes, expenses, saving]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        className="App"
        sx={{ bgcolor: "background.default", minHeight: "100vh" }}
        padding={2}
      >
        <Box display="flex" justifyContent="center">
          <IconButton
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
          >
            {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
          <Typography
            variant="h1"
            sx={{
              fontSize: "2.3rem",
              color: "primary.title",
              marginLeft: 3,
            }}
          >
            Budget control App
          </Typography>
        </Box>

        <Grid container spacing={2} marginTop={2}>
          <Grid
            item
            md={6}
            sm={6}
            sx={{
              borderBottom: "2px solid lightgrey",
              borderTop: "2px solid lightgrey",
            }}
          >
            <Money name="income" list={incomes} setList={setIncomes} />
          </Grid>
          <Grid
            item
            md={6}
            sm={6}
            sx={{
              borderBottom: "2px solid lightgrey",
              borderTop: "2px solid lightgrey",
            }}
          >
            <Money
              name="expense"
              list={expenses}
              setList={setExpenses}
              balance={balance}
            />
          </Grid>
          <Grid item md={6} sm={6}>
            <Saving saving={saving} setSaving={setSaving} />
          </Grid>
          <Grid item md={6} sm={6}>
            <Balance balance={balance} setSaving={setSaving} />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;
