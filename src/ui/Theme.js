import { createTheme } from "@material-ui/core/styles";

const arcBlue = "#0B72B9";
const arcOrange = "#FFBA60";
const arcGray = "#868686";

export default createTheme({
  palette: {
    common: {
      blue: arcBlue,
      orange: arcOrange,
    },
    primary: {
      main: arcBlue,
    },
    secondary: {
      main: arcOrange,
    },
  },
  typography: {
    tab: {
      fontFamily: "Raleway",
      textTransform: "none",
      fontWeight: 700,
      fontSize: "1rem",
    },
    estimate: {
      fontFamily: "Pacifico",
      fontSize: "1rem",
      textTransform: "none",
      color: "white",
    },
    h1: {
      fontFamily: "Raleway",
      fontWeight: 700,
      fontSize: "2.5rem",
      color: arcBlue,
      lineHeight: 1.5,
    },
    h3: {
      fontFamily: "Pacifico",
      fontSize: "2.5rem",
      color: arcBlue,
    },
    h4: {
      fontFamily: "Raleway",
      fontSize: "1.75rem",
      fontWeight: 700,
      color: arcBlue,
    },
    h6: {
      fontFamily: "Raleway",
      fontWeight: 500,
      color: arcBlue,
      lineHeight: 1.2,
    },
    subtitle1: {
      fontSize: "1.25rem",
      fontWeight: 300,
      color: arcGray,
    },
    subtitle2: {
      fontSize: "1.25rem",
      fontWeight: 300,
      color: "white",
    },
    body1: {
      fontSize: "1.25rem",
      color: arcGray,
      fontWeight: 300,
    },
    learnButton: {
      borderColor: arcBlue,
      borderWidth: 2,
      borderRadius: 50,
      textTransform: "none",
      color: arcBlue,
      fontFamily: "Roboto",
      fontWeight: "bold",
    },
    caption: {
      fontSize: "1rem",
      fontWeight: 300,
      color: arcGray,
    },
  },
  overrides: {
    MuiFormControlLabel: {
      label: {
        color: arcBlue,
        fontWeight: 700,
      },
      labelPlacementStart: {
        marginLeft: 0,
      },
    },
    MuiInputLabel: {
      root: {
        color: arcBlue,
        fontSize: "1rem",
      },
    },
    MuiInput: {
      root: {
        color: arcGray,
        fontWeight: 300,
      },
      underline: {
        "&:before": {
          borderBottom: `2px solid ${arcBlue}`,
        },
        "&:hover:not($disabled):not($focused):not($error):before": {
          borderBottom: `2px solid ${arcBlue}`,
        },
      },
    },
    MuiTableCell: {
      head: {
        fontSize: "1rem",
        fontWeight: 700,
        color: arcBlue,
        borderColor: arcBlue,
        borderWidth: 2,
      },
      body: {
        color: arcGray,
        borderColor: arcBlue,
        borderWidth: 2,
      },
    },
    MuiSelect: {
      icon: {
        fill: arcOrange,
      },
    },
    MuiTableSortLabel: {
      root: {
        "&:hover": {
          color: arcOrange,
        },
        "&.MuiTableSortLabel-active": {
          color: arcOrange,
        },
      },
      icon: {
        fill: arcOrange,
      },
    },
  },
});
