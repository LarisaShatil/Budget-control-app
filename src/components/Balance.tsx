import React, { useState } from 'react'
import { Box, TextField, Button, Typography } from "@mui/material";
import CompareArrowsRoundedIcon from "@mui/icons-material/CompareArrowsRounded";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";

import { BalanceProps } from '../types/balance';
import { parseMoneyInput, sanitizeMoneyInput } from "../utils/moneyInput";

const Balance = ({balance, setSaving}:BalanceProps) => {
  const [amountInput, setAmountInput] = useState("");
  const amount = parseMoneyInput(amountInput);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (amount <= 0 || validateAmount()) {
      return;
    }
    setSaving((saving) => saving + amount);
    setAmountInput("");
  };

  const validateAmount = () => Number(amount) > (balance || 0);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box
        component="form"
        autoComplete="off"
        onSubmit={(e) => onSubmit(e)}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap={2}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <CompareArrowsRoundedIcon color="primary" fontSize="small" />
          <Typography variant="h2" sx={{ color: "text.primary" }}>
            MAKE TRANSFER
          </Typography>
        </Box>
        <Typography
          variant="subtitle1"
          sx={{ color: "text.secondary", fontWeight: 800 }}
        >
          Current balance:{" "}
          <Box component="span" sx={{ color: "text.primary" }}>
            {balance.toFixed(2)}
          </Box>
        </Typography>
        <TextField
          required
          label={"Transfer to saving account"}
          value={amountInput}
          placeholder="transfer money"
          onChange={(e) => setAmountInput(sanitizeMoneyInput(e.target.value))}
          inputProps={{
            inputMode: "decimal",
            pattern: "^[0-9]*([,|.]{0,1}[0-9]{0,2})$",
          }}
          error={validateAmount()}
          helperText={validateAmount() ? "Number can't be bigger than balance" : " "}
        />

        <Button
          startIcon={
            <SwapHorizRoundedIcon />
          }
          type="submit"
          variant="contained"
        >
          Transfer
        </Button>
      </Box>
    </Box>
  );
}

export default Balance;