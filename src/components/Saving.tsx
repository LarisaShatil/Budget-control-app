import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

import { SavingProps } from "../types/saving";

const Saving = ({ saving, setSaving }: SavingProps) => {
  const [target, setTarget] = useState(0);

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
        <Box display="flex" alignItems="center" gap={1}>
          <FlagOutlinedIcon color="info" fontSize="small" />
          <Typography variant="h2" sx={{ color: "text.primary" }}>
            SET TARGET
          </Typography>
        </Box>

        <Typography
          variant="subtitle1"
          sx={{ color: "text.secondary", fontWeight: 800 }}
        >
          Current saving:{" "}
          <Box component="span" sx={{ color: "text.primary" }}>
            {saving}
          </Box>
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
            <RestartAltRoundedIcon />
          }
          className="cancel-btn"
          type="submit"
          variant="contained"
        >
          Reset
        </Button>
        <Typography
          variant="subtitle1"
          sx={{ color: "text.secondary", fontWeight: 800 }}
        >
          Current target:{" "}
          <Box component="span" sx={{ color: "text.primary" }}>
            {target}
          </Box>
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
