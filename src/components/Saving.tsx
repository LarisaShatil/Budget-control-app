import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CircularProgress from "@mui/material/CircularProgress";

import { SavingProps } from "../types/saving";
import { addExpense } from '../redux/reducers/expenses';

const Saving = ({ saving, setSaving }: SavingProps) => {
  const [target, setTarget] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addExpense({
      title: "test",
      amount: 23,
      date: 'test',
    }))
  }, [])

  const incomes = useSelector((state: any) => state.incomeReducer);
  const expenses = useSelector((state: any) => state.expenseReducer);


  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTarget(0);

    if (saving > 0) {
      setSaving(0);
    }
  };

  const addSaving = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const money = isNaN(+e.target.value) ? 0 : +e.target.value;
    setTarget(money);
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
        <Typography variant="h2" color="primary.title" fontSize={20}>
          SET TARGET
        </Typography>

        <TextField
          placeholder="set target"
          value={target.toString().replace(/^0+/, "")}
          onChange={(e) => addSaving(e)}
          inputProps={{
            inputMode: "numeric",
            pattern: "^[0-9]*([,|.]{0,1}[0-9]{0,2})$",
          }}
          helperText="Type the numbers"
        />
        <Button
          startIcon={
            <CancelOutlinedIcon className="btn-icon" color="primary" />
          }
          className="cancel-btn"
          type="submit"
          variant="contained"
        >
          Reset
        </Button>
        <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
          Current saving: {saving}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
          Current target: {target}
        </Typography>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
            Progress:
          </Typography>
          <Box
            sx={{
              position: "relative",
              display: "inline-flex",
            }}
            marginLeft={2}
          >
            <CircularProgress
              variant="determinate"
              value={Math.round((saving * 100) / target) || 0}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                component="div"
                fontSize="12"
                color="text.secondary"
              >
                {target ? Math.round((saving * 100) / target) : 0} %
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Saving;
