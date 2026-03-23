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
          "&.Mui-disabled": { color: "rgba(0, 0, 0, 0.78)", opacity: 0.7 }, // disabled label color
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: "#043841", // text color for input fields
        },
        input: {
          "&.Mui-disabled": {
            color: "#043841", // Custom text color for all disabled inputs
            WebkitTextFillColor: "#043841",
            userSelect: "none",
            cursor: "not-allowed",
            opacity: 0.6,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#043841", // Custom border color for all disabled OutlinedInputs
              opacity: 0.6,
            },
          },
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
    MuiSelect: {
      styleOverrides: {
        root: {
          color: "#043841", // text color for select fields
          borderColor: "#043841", // border color for select fields
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#043841", // border color for outlined select fields
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#043841", // border color on hover for outlined select fields
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#043841", // border color when focused for outlined select fields
          },
          "& .MuiSelect-icon": {
            color: "#043841", // color for the dropdown arrow icon
          },
        },
      },
    },
    // To style the menu options (dropdown paper) globally:
    MuiPopover: {
      styleOverrides: {
        paper: {
          backgroundColor: "rgb(255, 241, 218)", // Example color for the dropdown menu background
          color: "#043841", // Text color for the dropdown menu
          "& .MuiMenuItem-root": {
            "&:hover": {
              backgroundColor: "rgba(4, 56, 65, 0.1)", // Hover color for menu items
            },
            "&.Mui-selected": {
              backgroundColor: "rgba(4, 56, 65, 0.2)", // Selected color for menu items
            },
          },
          "& .MuiMenuItem-root.Mui-disabled": {
            color: "rgba(0, 0, 0, 0.78)", // Disabled text color for menu items
            opacity: 0.7,
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          display: "none",
        },
      },
    },
  },
});

export default theme;
