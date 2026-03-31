import { alpha, createTheme, responsiveFontSizes, type PaletteMode } from "@mui/material";

function getDesignTokens(mode: PaletteMode) {
  const isLight = mode === "light";

  // Brand palette (custom look, but still MUI-native tokens)
  const brand = {
    primary: isLight ? "#0B7285" : "#4DD4E6",
    secondary: isLight ? "#F60C86" : "#FF5DB1",
    accent: isLight ? "#6C5CE7" : "#A29BFE",
  };

  const baseBg = isLight ? "#F6F7FB" : "#0B1220";
  const paperBg = isLight ? "#FFFFFF" : "#0F1A2E";

  return {
    palette: {
      mode,
      primary: { main: brand.primary },
      secondary: { main: brand.secondary },
      info: { main: brand.accent },
      background: { default: baseBg, paper: paperBg },
      text: {
        primary: isLight ? "#111827" : "#E5E7EB",
        secondary: isLight ? "#4B5563" : "#A3AAB7",
      },
      divider: isLight ? alpha("#111827", 0.12) : alpha("#E5E7EB", 0.14),
      success: { main: isLight ? "#16A34A" : "#22C55E" },
      warning: { main: isLight ? "#D97706" : "#F59E0B" },
      error: { main: isLight ? "#DC2626" : "#EF4444" },
    },
    shape: { borderRadius: 14 },
    typography: {
      fontFamily: [
        "Inter",
        "system-ui",
        "-apple-system",
        "Segoe UI",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
      ].join(","),
      h1: { fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.02em" },
      h2: { fontSize: "1.05rem", fontWeight: 800, letterSpacing: "0.06em" },
      subtitle1: { fontSize: "0.95rem" },
      button: { textTransform: "none", fontWeight: 700 },
    },
  } as const;
}

export function getTheme(mode: PaletteMode) {
  const tokens = getDesignTokens(mode);
  const isLight = mode === "light";

  let theme = createTheme({
    ...tokens,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            margin: 0,
            backgroundImage: isLight
              ? "radial-gradient(1200px 600px at 30% -10%, rgba(246,12,134,0.10), transparent 60%), radial-gradient(900px 450px at 90% 10%, rgba(11,114,133,0.12), transparent 55%)"
              : "radial-gradient(1200px 600px at 30% -10%, rgba(255,93,177,0.12), transparent 60%), radial-gradient(900px 450px at 90% 10%, rgba(77,212,230,0.12), transparent 55%)",
            backgroundColor: tokens.palette.background.default,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            border: `1px solid ${tokens.palette.divider}`,
          },
        },
      },
      MuiButton: {
        defaultProps: { variant: "contained" },
        styleOverrides: {
          root: { borderRadius: 12 },
        },
      },
      MuiTextField: {
        defaultProps: { size: "small", fullWidth: true },
      },
      MuiTableContainer: {
        styleOverrides: {
          root: { borderRadius: 12, border: `1px solid ${tokens.palette.divider}` },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            fontWeight: 800,
            backgroundColor: alpha(tokens.palette.text.primary, isLight ? 0.03 : 0.06),
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
    },
  });

  theme = responsiveFontSizes(theme);
  return theme;
}

