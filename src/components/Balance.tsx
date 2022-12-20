import React, { useState } from 'react'
import { Box, TextField, Button, Typography } from "@mui/material";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";

import { BalanceProps } from '../types/balance';

const Balance = ({balance, setSaving}:BalanceProps) => {
  const [amount, setAmount] = useState(0);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving((saving) => saving + amount);
    setAmount(0);
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
        <Typography
          variant="h2"
          color ="primary.title"
          fontSize={20}
        >
          MAKE TRANSFER
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
          Current balance: {balance.toFixed(2)}
        </Typography>
        <TextField
          required
          label={"Transfer to saving account"}
          value={amount.toString().replace(/^0+/, "")}
          placeholder="transfer money"
          onChange={(e) => setAmount(isNaN(+e.target.value)? 0 : +e.target.value)}
          inputProps={{
            inputMode: "numeric",
            pattern: "^[0-9]*([,|.]{0,1}[0-9]{0,2})$",
          }}
          error={validateAmount()}
          helperText="Number can't be bigger than balance"
        />

        <Button
          startIcon={
            <SavingsOutlinedIcon className="btn-icon"  />
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