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
      secondary: "#302f2f",
    },
    active: {
      main: "#21A0C0",
    },
    inactive: {
      main: "#98989A",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    h1: { fontSize: "24px", fontWeight: 700 },
    h2: { fontSize: "22px", fontWeight: 600 },
    h3: { fontSize: "20px", fontWeight: 500 },
    h4: { fontSize: "18px", fontWeight: 400 },
    h5: { fontSize: "16px", fontWeight: 300 },
    h6: { fontSize: "14px", fontWeight: 200 },
    body: { fontSize: "14px" },
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