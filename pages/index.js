import React, { useState } from "react";

import { makeStyles, useTheme } from "@material-ui/styles";
import { useMediaQuery } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";

import AddIcon from "@material-ui/icons/Add.js";
import FilterListIcon from "@material-ui/icons/FilterList.js";
import PersonIcon from "@material-ui/icons/Person.js";
import DollarIcon from "@material-ui/icons/AttachMoney.js";

import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";

import EnhancedTable from "../src/ui/EnhancedTable.js";

const useStyles = makeStyles((theme) => ({
  service: {
    fontWeight: 300,
  },
  button: {
    color: "#FFFFFF",
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));

function createData(
  id,
  name,
  date,
  service,
  features,
  complexity,
  platforms,
  users,
  total,
  search
) {
  return {
    id,
    name,
    date,
    service,
    features,
    complexity,
    platforms,
    users,
    total,
    search,
  };
}

function ProjectManager() {
  const classes = useStyles();
  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));

  const platformOptions = ["Web", "iOS", "Android"];

  const featureOptions = [
    "Photo/Video",
    "GPS",
    "File Transfer",
    "Users/Authentication",
    "Biometrics",
    "Push Notifications",
  ];

  const websiteOptions = ["Basic", "Interactive", "E-Commerce"];

  const [rows, setRows] = useState([
    createData(
      "111",
      "Ahmet Ustun",
      "07/10/1994",
      "Website",
      "E-Commerce",
      "N/A",
      "N/A",
      "N/A",
      "$1500",
      true
    ),
    createData(
      "112",
      "Elon Musk",
      "07/10/1994",
      "Mobile App",
      "E-Commerce",
      "N/A",
      "iOS",
      "N/A",
      "$3500",
      true
    ),
    createData(
      "113",
      "Bill Gates",
      "07/10/1994",
      "Software",
      "GPS, Push Notifications, Users/Authentication, File Transfer",
      "Medium",
      "Web",
      "100+",
      "$15000",
      true
    ),
    createData(
      "114",
      "Steve Jobs",
      "07/10/1994",
      "Software",
      "GPS, Push Notifications, Users/Authentication, File Transfer",
      "Medium",
      "Web",
      "100+",
      "$15000",
      true
    ),
    createData(
      "115",
      "Ahmet Ustun",
      "07/10/1994",
      "Mobile App",
      "E-Commerce",
      "N/A",
      "Android",
      "N/A",
      "$1500",
      true
    ),
    createData(
      "116",
      "Elon Musk",
      "07/10/1994",
      "Website",
      "E-Commerce",
      "N/A",
      "N/A",
      "N/A",
      "$3500",
      true
    ),
    createData(
      "117",
      "Bill Gates",
      "07/10/1994",
      "Software",
      "GPS, Push Notifications, Users/Authentication, File Transfer",
      "Medium",
      "Web",
      "100+",
      "$15000",
      true
    ),
    createData(
      "118",
      "Steve Jobs",
      "07/10/1994",
      "Mobile App",
      "GPS, Push Notifications, Users/Authentication, File Transfer",
      "Medium",
      "iOS, Android",
      "100+",
      "$15000",
      true
    ),
  ]);

  const [isSoftwareChecked, setIsSoftwareChecked] = useState(false);
  const [isIOSChecked, setIsIOSChecked] = useState(false);
  const [isAndroidChecked, setIsAndroidChecked] = useState(false);
  const [isWebsiteChecked, setIsWebsiteChecked] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [total, setTotal] = useState("");
  const [service, setService] = useState("");
  const [complexity, setComplexity] = useState("");
  const [users, setUsers] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [features, setFeatures] = useState([]);

  const serviceQuestion = (
    <React.Fragment>
      <Grid item style={{ marginTop: matchesSM ? "3em" : "5em" }}>
        <Typography variant="h4" style={{ fontSize: matchesSM && "1.7em" }}>
          Service
        </Typography>
      </Grid>
      <Grid item>
        <RadioGroup
          aria-label="service"
          name="service"
          value={service}
          onChange={(event) => {
            setService(event.target.value);
            setComplexity("");
            setUsers("");
            setPlatforms([]);
            setFeatures([]);
          }}
        >
          <FormControlLabel
            classes={{ label: classes.service }}
            value="Software"
            label="Software"
            control={<Radio />}
          />
          <FormControlLabel
            classes={{ label: classes.service }}
            value="Mobile App"
            label="Mobile App"
            control={<Radio />}
          />
          <FormControlLabel
            classes={{ label: classes.service }}
            value="Website"
            label="Website"
            control={<Radio />}
          />
        </RadioGroup>
      </Grid>
    </React.Fragment>
  );

  const complexityQuestion = (
    <React.Fragment>
      <Grid item style={{ marginTop: matchesSM ? "3em" : "5em" }}>
        <Typography variant="h4" style={{ fontSize: matchesSM && "1.7em" }}>
          Complexity
        </Typography>
      </Grid>
      <Grid item>
        <RadioGroup
          aria-label="complexity"
          name="complexity"
          value={complexity}
          onChange={(event) => setComplexity(event.target.value)}
        >
          <FormControlLabel
            classes={{ label: classes.service }}
            value="Low"
            label="Low"
            control={<Radio />}
            disabled={service === "Website"}
          />
          <FormControlLabel
            classes={{ label: classes.service }}
            value="Medium"
            label="Medium"
            control={<Radio />}
            disabled={service === "Website"}
          />
          <FormControlLabel
            classes={{ label: classes.service }}
            value="High"
            label="High"
            control={<Radio />}
            disabled={service === "Website"}
          />
        </RadioGroup>
      </Grid>
    </React.Fragment>
  );

  const usersQuestion = (
    <React.Fragment>
      <Grid item style={{ marginTop: matchesSM ? "3em" : "5em" }}>
        <Typography variant="h4" style={{ fontSize: matchesSM && "1.7em" }}>
          Users
        </Typography>
      </Grid>
      <Grid item>
        <RadioGroup
          aria-label="users"
          name="users"
          value={users}
          onChange={(event) => setUsers(event.target.value)}
        >
          <FormControlLabel
            classes={{ label: classes.service }}
            value="0-10"
            label="0-10"
            control={<Radio />}
            disabled={service === "Website"}
          />
          <FormControlLabel
            classes={{ label: classes.service }}
            value="10-100"
            label="10-100"
            control={<Radio />}
            disabled={service === "Website"}
          />
          <FormControlLabel
            classes={{ label: classes.service }}
            value="100+"
            label="100+"
            control={<Radio />}
            disabled={service === "Website"}
          />
        </RadioGroup>
      </Grid>
    </React.Fragment>
  );

  const cleanUpStates = () => {
    setName("");
    setDate(new Date());
    setTotal("");
    setService("");
    setComplexity("");
    setUsers("");
    setPlatforms([]);
    setFeatures([]);
  };

  const addNewProject = () => {
    setRows([
      ...rows,
      createData(
        "newDataRowId",
        name,
        format(date, "MMMM dd, yyyy"),
        service,
        features.join(", "),
        service === "Website" ? "N/A" : complexity,
        service === "Website" ? "N/A" : platforms.join(", "),
        service === "Website" ? "N/A" : users,
        `$${total}`,
        true
      ),
    ]);
    setIsDialogOpen(false);
    cleanUpStates();
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);

    const rowData = rows.map((row) =>
      Object.values(row).filter((option) => typeof option !== "boolean")
    );

    const matches = rowData.map((row) =>
      row.map((option) => option.toLowerCase().includes(search.toLowerCase()))
    );

    const newRows = [...rows];

    matches.map((row, index) =>
      row.includes(true)
        ? (newRows[index].search = true)
        : (newRows[index].search = false)
    );

    setRows(newRows);
    setPage(0);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid
        container
        direction="column"
        alignItems={matchesSM ? "center" : undefined}
      >
        <Grid
          item
          style={{ marginTop: "2em", marginLeft: matchesSM ? 0 : "5em" }}
        >
          <Typography variant="h1">Projects</Typography>
        </Grid>
        <Grid item>
          <TextField
            value={search}
            placeholder="Search existing projects or add a new one"
            style={{
              width: matchesSM ? "30em" : "35em",
              marginLeft: matchesSM ? 0 : "5em",
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsDialogOpen(true)}
                >
                  <AddIcon color="primary" style={{ fontSize: 30 }} />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
        </Grid>
        <Grid
          item
          style={{ marginTop: "2em", marginLeft: matchesSM ? 0 : "5em" }}
        >
          <FormGroup row>
            <Grid
              container
              direction={matchesSM ? "column" : "row"}
              justifyContent={matchesSM ? "center" : undefined}
            >
              <Grid item>
                <FormControlLabel
                  style={{ marginRight: matchesSM ? 0 : "5em" }}
                  control={
                    <Switch
                      checked={isSoftwareChecked}
                      onChange={() => setIsSoftwareChecked(!isSoftwareChecked)}
                      color="primary"
                    />
                  }
                  label="Softwares"
                  labelPlacement={matchesSM ? "end" : "start"}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  style={{ marginRight: matchesSM ? 0 : "5em" }}
                  control={
                    <Switch
                      checked={isIOSChecked}
                      onChange={() => setIsIOSChecked(!isIOSChecked)}
                      color="primary"
                    />
                  }
                  label="iOS Apps"
                  labelPlacement={matchesSM ? "end" : "start"}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  style={{ marginRight: matchesSM ? 0 : "5em" }}
                  control={
                    <Switch
                      checked={isAndroidChecked}
                      onChange={() => setIsAndroidChecked(!isAndroidChecked)}
                      color="primary"
                    />
                  }
                  label="Android Apps"
                  labelPlacement={matchesSM ? "end" : "start"}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isWebsiteChecked}
                      onChange={() => setIsWebsiteChecked(!isWebsiteChecked)}
                      color="primary"
                    />
                  }
                  label="Websites"
                  labelPlacement={matchesSM ? "end" : "start"}
                />
              </Grid>
            </Grid>
          </FormGroup>
        </Grid>
        <Grid
          item
          style={{
            marginTop: "5em",
            maxWidth: "100%",
            marginBottom: matchesMD ? "40em" : "35em",
          }}
        >
          <EnhancedTable
            rows={rows}
            setRows={setRows}
            page={page}
            setPage={setPage}
            isSoftwareChecked={isSoftwareChecked}
            isIOSChecked={isIOSChecked}
            isAndroidChecked={isAndroidChecked}
            isWebsiteChecked={isWebsiteChecked}
          />
        </Grid>
        <Dialog
          open={isDialogOpen}
          fullScreen={matchesSM}
          fullWidth
          maxWidth="md"
          style={{ zIndex: 1310 }}
          onClose={() => {
            setIsDialogOpen(false);
            cleanUpStates();
          }}
          PaperProps={{
            style: { padding: matchesSM ? "1em 1em 2.5em" : "1em 1em 2.8em" },
          }}
        >
          <DialogContent>
            <Grid container justifyContent="center">
              <Grid item>
                <Typography
                  variant="h1"
                  style={{ fontSize: matchesSM && "2.5em" }}
                  gutterBottom
                >
                  Add a new project
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="space-between"
              direction={matchesSM ? "column" : "row"}
            >
              <Grid item>
                <Grid item container direction="column" alignItems="center" sm>
                  <Grid item>
                    <TextField
                      label="Name"
                      id="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Grid item container direction="column">
                      <Hidden smDown>{serviceQuestion}</Hidden>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  item
                  container
                  direction="column"
                  style={{ marginTop: 16 }}
                  alignItems="center"
                  sm
                >
                  <Grid item>
                    <KeyboardDatePicker
                      format="MMMM dd, yyyy"
                      value={date}
                      style={{ marginTop: matchesSM ? "1em" : 0 }}
                      onChange={(newDate) => setDate(newDate)}
                    />
                  </Grid>
                  <Grid item>
                    <Grid item container direction="column">
                      <Hidden smDown>{complexityQuestion}</Hidden>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid item container direction="column" alignItems="center" sm>
                  <Grid item>
                    <TextField
                      label="Total"
                      id="total"
                      value={total}
                      onChange={(event) => setTotal(event.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <DollarIcon />
                          </InputAdornment>
                        ),
                      }}
                      style={{ marginTop: matchesSM ? "2em" : 0 }}
                    />
                  </Grid>
                  <Grid item>
                    <Grid item container direction="column">
                      <Hidden smDown>{usersQuestion}</Hidden>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Hidden mdUp>
              <Grid container direction="column" alignItems="center">
                <Grid item>{serviceQuestion}</Grid>
                <Grid item>{usersQuestion}</Grid>
                <Grid item>{complexityQuestion}</Grid>
              </Grid>
            </Hidden>
            <Grid
              container
              justifyContent="space-around"
              alignItems={matchesSM ? "center" : null}
              direction={matchesSM ? "column" : "row"}
            >
              <Grid item style={{ marginTop: matchesSM ? "3em" : "5em" }}>
                <Select
                  labelId="platforms"
                  id="platforms"
                  multiple
                  value={platforms}
                  disabled={service === "Website"}
                  displayEmpty
                  renderValue={platforms.length ? undefined : () => "Platforms"}
                  MenuProps={{
                    style: { zIndex: 1310 },
                    getContentAnchorEl: null,
                  }}
                  style={{ width: "18em" }}
                  onChange={(event) => setPlatforms(event.target.value)}
                >
                  {platformOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item style={{ marginTop: matchesSM ? "3em" : "5em" }}>
                <Select
                  labelId="features"
                  id="features"
                  multiple
                  value={features}
                  displayEmpty
                  renderValue={features.length ? undefined : () => "Features"}
                  MenuProps={{
                    style: { zIndex: 1310 },
                    getContentAnchorEl: null,
                  }}
                  style={{ width: "18em" }}
                  onChange={(event) => setFeatures(event.target.value)}
                >
                  {service === "Website"
                    ? websiteOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))
                    : featureOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                </Select>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="center"
              style={{ marginTop: "3em" }}
            >
              <Grid item style={{ marginRight: "3em" }}>
                <Button
                  color="primary"
                  style={{ fontWeight: 300 }}
                  onClick={() => {
                    setIsDialogOpen(false);
                    cleanUpStates();
                  }}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={addNewProject}
                  disabled={
                    service === "Website"
                      ? !name.length ||
                        !features.length ||
                        !total.length ||
                        features.length > 1
                      : !name.length ||
                        !service.length ||
                        !features.length ||
                        !complexity.length ||
                        !platforms.length ||
                        !users.length ||
                        !total.length
                  }
                >
                  Confirm
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default ProjectManager;
