import React, { useState } from "react";

import { Box, Button, TextField, InputAdornment, Typography } from "@mui/material";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";

import { MoneyProps } from "../types/money";
import MoneyTable from "./MoneyTable";

const Money = ({ name, list, balance, setList }: MoneyProps) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateAmount()) {
      return;
    }
    setList([{ id: Date.now(), title, amount, date }, ...list]);
    clearInputs();
  };

  const validateAmount = () => {
    if (name === "income") {
      return Number(amount) < 0;
    }
    if (name === "expense") {
      return Number(amount) > (balance || 0) ? true : false;
    }
  };

  const showMessage = () => {
    return name === "expense"
      ? "Number can't be bigger than balance"
      : "Number should be positive";
  };

  const clearInputs = () => {
    setTitle("");
    setAmount("");
    setDate("");
  };

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
          {name === "income" ? (
            <TrendingUpRoundedIcon color="primary" fontSize="small" />
          ) : (
            <TrendingDownRoundedIcon color="secondary" fontSize="small" />
          )}
          <Typography variant="h2" sx={{ color: "text.primary" }}>
            {name.toUpperCase()}
          </Typography>
        </Box>
        <TextField
          required
          label={`Source of ${name}`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={`name of ${name}`}
        />
        <TextField
          required
          label={` Amount`}
          value={amount.toString().replace(/^0+/, "")}
          onChange={(e) => setAmount(e.target.value)}
          inputProps={{
            inputMode: "numeric",
            pattern: "^[0-9]*([,|.]{0,1}[0-9]{0,2})$",
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">€</InputAdornment>,
          }}
          error={validateAmount()}
          helperText={showMessage()}
          placeholder="number"
        />
        <TextField
          required
          label={` Date of ${name}`}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Button
          startIcon={
            name === "income" ? (
              <AttachMoneyRoundedIcon />
            ) : (
              <ReceiptLongRoundedIcon />
            )
          }
          type="submit"
          variant="contained"
          sx={{ marginBottom: 2 }}
        >
          Add {name}
        </Button>
        {list.length ? <MoneyTable list={list} /> : ""}
      </Box>
    </Box>
  );
};

export default Money;
