// import { createTheme } from "@mui/material/styles";

// /**
//  * A custom theme for this app which can be used throughout the app.
//  * The theme is created using the createTheme function from MUI.
//  * 
//  * @see https://mui.com/material-ui/customization/theming/
//  */
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#21A0C0",
//     },
//     secondary: {
//       main: "#98989A",
//     },
//     background: {
//       default: "#F5F5F5",
//       paper: "#FFFFFF",
//     },
//     text: {
//       primary: "#23222F",
//       secondary: "#302f2f",
//     },
//     active: {
//       main: "#21A0C0",
//     },
//     inactive: {
//       main: "#98989A",
//     },
//   },
//   typography: {
//     fontFamily: "Arial, sans-serif",
//     h1: { fontSize: "40px", fontWeight: 700 },
//     h2: { fontSize: "36px", fontWeight: 600 },
//     h3: { fontSize: "32px", fontWeight: 500 },
//     h4: { fontSize: "28px", fontWeight: 400 },
//     h5: { fontSize: "24px", fontWeight: 300 },
//     h6: { fontSize: "20px", fontWeight: 200 },
//     body: { fontSize: "16px" },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: "8px",
//           textTransform: "none",
//         },
//       },
//     },
//   },
// });

// export default theme;

// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // You can change this to your brand color
    },
    secondary: {
      main: '#dc004e', // You can change this to your secondary color
    },
    background: {
      default: '#f5f5f5', // Light gray background
      paper: '#ffffff',   // White for cards/paper
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
  },
  spacing: 8, // This gives you 8px spacing unit (theme.spacing(1) = 8px)
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        },
      },
    },
  },
  
});

export default theme;