import React, { useEffect, useMemo, useState } from "react";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  ThemeProvider,
  Typography,
} from "@mui/material";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import "./App.css";
import Money from "./components/Money";
import Balance from "./components/Balance";
import Saving from "./components/Saving";
import { getTheme } from "./styles/theme";

import { MoneyItem } from "./types/money";

const THEME_STORAGE_KEY = "themeMode";

function App() {
  const [incomes, setIncomes] = useState<MoneyItem[]>([]);
  const [expenses, setExpenses] = useState<MoneyItem[]>([]);
  const [saving, setSaving] = useState(0);
  const [balance, setBalance] = useState(0);
  const [mode, setMode] = useState<"light" | "dark">(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === "light" || stored === "dark") return stored;
    } catch {
      // ignore
    }
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const theme = useMemo(() => getTheme(mode), [mode]);

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
  }, [saving, totalExpenses, totalIncome]);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch {
      // ignore
    }
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh" }}>
        <AppBar
          position="sticky"
          elevation={0}
          color="transparent"
          sx={{ borderBottom: 1, borderColor: "divider", backdropFilter: "blur(10px)" }}
        >
          <Toolbar>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Typography variant="h1">Budget control</Typography>
              <IconButton
                aria-label="Toggle light/dark mode"
                onClick={() => setMode(mode === "dark" ? "light" : "dark")}
                color="inherit"
                size="small"
              >
                {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Grid container spacing={2} alignItems="stretch">
            <Grid item xs={12} md={6} sx={{ display: "flex" }}>
              <Paper sx={{ p: 2, flexGrow: 1, display: "flex" }}>
                <Box sx={{ width: "100%" }}>
                  <Money name="income" list={incomes} setList={setIncomes} />
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: "flex" }}>
              <Paper sx={{ p: 2, flexGrow: 1, display: "flex" }}>
                <Box sx={{ width: "100%" }}>
                  <Money
                    name="expense"
                    list={expenses}
                    setList={setExpenses}
                    balance={balance}
                  />
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: "flex" }}>
              <Paper sx={{ p: 2, flexGrow: 1, display: "flex" }}>
                <Box sx={{ width: "100%" }}>
                  <Saving saving={saving} setSaving={setSaving} />
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: "flex" }}>
              <Paper sx={{ p: 2, flexGrow: 1, display: "flex" }}>
                <Box sx={{ width: "100%" }}>
                  <Balance balance={balance} setSaving={setSaving} />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
