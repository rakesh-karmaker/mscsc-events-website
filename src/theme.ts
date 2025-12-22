import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: { mode: "dark" },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            color: "#043841", // text color for input fields
          },
          borderColor: "#043841", // border color for input fields
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#043841", // border color for outlined inputs
            },
            "&:hover fieldset": {
              borderColor: "#043841", // border color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#043841", // border color when focused
            },
            "& .MuiInputBase-root:after": {
              borderColor: "#043841", // underline color for standard inputs
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#043841", // label color
          borderColor: "#043841",
          "&:after": { borderColor: "#043841" },
          "&.Mui-focused": { color: "#043841" }, // keep label color when focused
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: "#043841", // text color for input fields
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: "#043841",
          // standard variant underline (idle)
          "&:before": {
            borderBottom: "1px solid #043841",
          },
          // hover underline color -> black
          "&:hover:not(.Mui-disabled):before": {
            borderBottom: "1px solid #000000",
          },
          // focused underline color
          "&:after": {
            borderBottom: "2px solid #043841",
          },
        },
      },
    },
  },
});

export default theme;
