import { createTheme } from "@mui/material/styles";

/**
 * A custom theme for this app which can be used throughout the app.
 * The theme is created using the createTheme function from MUI.
 * 
 * @see https://mui.com/material-ui/customization/theming/
 */
const theme = createTheme({
  palette: {
    primary: {
      main: "#21A0C0",
    },
    secondary: {
      main: "#98989A",
    },
    background: {
      default: "#F5F5F5",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#23222F",
      secondary: "#98989A",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    h1: { fontSize: "2rem", fontWeight: 700 },
    h2: { fontSize: "1.75rem", fontWeight: 600 },
    h3: { fontSize: "1.5rem", fontWeight: 500 },
    body1: { fontSize: "1rem" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;