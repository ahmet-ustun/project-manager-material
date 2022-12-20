import React, { useState } from "react";

import { makeStyles, useTheme } from "@material-ui/styles";
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

import AddIcon from "@material-ui/icons/Add.js";
import FilterListIcon from "@material-ui/icons/FilterList.js";
import PersonIcon from "@material-ui/icons/Person.js";
import DollarIcon from "@material-ui/icons/AttachMoney.js";

import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles((theme) => ({
  service: {
    fontWeight: 300,
  },
}));

function createData(
  name,
  date,
  service,
  features,
  complexity,
  platforms,
  users,
  total
) {
  return { name, date, service, features, complexity, platforms, users, total };
}

function ProjectManager() {
  const classes = useStyles();
  const theme = useTheme();

  const platformOptions = ["Web", "iOS", "Android"];
  const featureOptions = [
    "Photo/Video",
    "GPS",
    "File Transfer",
    "Users/Authentication",
    "Biometrics",
    "Push Notifications",
  ];

  const [rows, setRows] = useState([
    createData(
      "Ahmet Ustun",
      "07/10/1994",
      "Website",
      "E-Commerce",
      "N/A",
      "N/A",
      "N/A",
      "$1500"
    ),
    createData(
      "Elon Musk",
      "07/10/1994",
      "Website",
      "E-Commerce",
      "N/A",
      "N/A",
      "N/A",
      "$3500"
    ),
    createData(
      "Bill Gates",
      "07/10/1994",
      "Software",
      "GPS, Push Notifications, Users/Authentication, File Transfer",
      "Medium",
      "Web Application",
      "100+",
      "$15000"
    ),
    createData(
      "Steve Jobs",
      "07/10/1994",
      "Software",
      "GPS, Push Notifications, Users/Authentication, File Transfer",
      "Medium",
      "Web Application",
      "100+",
      "$15000"
    ),
  ]);

  const [isSoftwareChecked, setIsSoftwareChecked] = useState(false);
  const [isIOSChecked, setIsIOSChecked] = useState(false);
  const [isAndroidChecked, setIsAndroidChecked] = useState(false);
  const [isWebsiteChecked, setIsWebsiteChecked] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [total, setTotal] = useState("");
  const [service, setService] = useState("");
  const [complexity, setComplexity] = useState("");
  const [users, setUsers] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [features, setFeatures] = useState([]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container direction="column">
        <Grid item style={{ marginTop: "2em", marginLeft: "5em" }}>
          <Typography variant="h1">Projects</Typography>
        </Grid>
        <Grid item>
          <TextField
            placeholder="Search existing projects or create a new one"
            style={{ width: "35em", marginLeft: "5em" }}
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
          />
        </Grid>
        <Grid item style={{ marginTop: "2em", marginLeft: "5em" }}>
          <FormGroup row>
            <FormControlLabel
              style={{ marginRight: "5em" }}
              control={
                <Switch
                  checked={isSoftwareChecked}
                  onChange={() => setIsSoftwareChecked(!isSoftwareChecked)}
                  color="primary"
                />
              }
              label="Softwares"
              labelPlacement="start"
            />
            <FormControlLabel
              style={{ marginRight: "5em" }}
              control={
                <Switch
                  checked={isIOSChecked}
                  onChange={() => setIsIOSChecked(!isIOSChecked)}
                  color="primary"
                />
              }
              label="iOS Apps"
              labelPlacement="start"
            />
            <FormControlLabel
              style={{ marginRight: "5em" }}
              control={
                <Switch
                  checked={isAndroidChecked}
                  onChange={() => setIsAndroidChecked(!isAndroidChecked)}
                  color="primary"
                />
              }
              label="Android Apps"
              labelPlacement="start"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={isWebsiteChecked}
                  onChange={() => setIsWebsiteChecked(!isWebsiteChecked)}
                  color="primary"
                />
              }
              label="Websites"
              labelPlacement="start"
            />
          </FormGroup>
        </Grid>
        <Grid
          item
          container
          justifyContent="flex-end"
          style={{ marginTop: "5em" }}
        >
          <Grid item style={{ marginRight: 75 }}>
            <FilterListIcon color="secondary" style={{ fontSize: 30 }} />
          </Grid>
        </Grid>
        <Grid item style={{ marginBottom: "15em" }}>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ maxWidth: "5em" }}>
                    Name
                  </TableCell>
                  <TableCell align="center" style={{ maxWidth: "5em" }}>
                    Date
                  </TableCell>
                  <TableCell align="center" style={{ maxWidth: "5em" }}>
                    Service
                  </TableCell>
                  <TableCell align="center" style={{ maxWidth: "5em" }}>
                    Features
                  </TableCell>
                  <TableCell align="center" style={{ maxWidth: "5em" }}>
                    Complexity
                  </TableCell>
                  <TableCell align="center" style={{ maxWidth: "5em" }}>
                    Platforms
                  </TableCell>
                  <TableCell align="center" style={{ maxWidth: "5em" }}>
                    Users
                  </TableCell>
                  <TableCell align="center" style={{ maxWidth: "5em" }}>
                    Total
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center" style={{ maxWidth: "5em" }}>
                      {row.name}
                    </TableCell>
                    <TableCell align="center" style={{ maxWidth: "5em" }}>
                      {row.date}
                    </TableCell>
                    <TableCell align="center" style={{ maxWidth: "5em" }}>
                      {row.service}
                    </TableCell>
                    <TableCell align="center" style={{ maxWidth: "5em" }}>
                      {row.features}
                    </TableCell>
                    <TableCell align="center" style={{ maxWidth: "5em" }}>
                      {row.complexity}
                    </TableCell>
                    <TableCell align="center" style={{ maxWidth: "5em" }}>
                      {row.platforms}
                    </TableCell>
                    <TableCell align="center" style={{ maxWidth: "5em" }}>
                      {row.users}
                    </TableCell>
                    <TableCell align="center" style={{ maxWidth: "5em" }}>
                      {row.total}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Dialog
          open={isDialogOpen}
          fullWidth
          maxWidth="md"
          onClose={() => setIsDialogOpen(false)}
        >
          <Grid container justifyContent="center">
            <Grid item>
              <Typography variant="h1" gutterBottom>
                Add a new project
              </Typography>
            </Grid>
          </Grid>
          <DialogContent>
            <Grid container justifyContent="space-between">
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
                    <Grid
                      item
                      container
                      direction="column"
                      style={{ marginTop: "5em" }}
                    >
                      <Grid item>
                        <Typography variant="h4">Service</Typography>
                      </Grid>
                      <Grid item>
                        <RadioGroup
                          aria-label="service"
                          name="service"
                          value={service}
                          onChange={(event) => setService(event.target.value)}
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
                      onChange={(newDate) => setDate(newDate)}
                    />
                  </Grid>
                  <Grid item>
                    <Grid
                      item
                      container
                      direction="column"
                      style={{ marginTop: "5em" }}
                    >
                      <Grid item>
                        <Typography variant="h4">Complexity</Typography>
                      </Grid>
                      <Grid item>
                        <RadioGroup
                          aria-label="complexity"
                          name="complexity"
                          value={complexity}
                          onChange={(event) =>
                            setComplexity(event.target.value)
                          }
                        >
                          <FormControlLabel
                            classes={{ label: classes.service }}
                            value="Low"
                            label="Low"
                            control={<Radio />}
                          />
                          <FormControlLabel
                            classes={{ label: classes.service }}
                            value="Medium"
                            label="Medium"
                            control={<Radio />}
                          />
                          <FormControlLabel
                            classes={{ label: classes.service }}
                            value="High"
                            label="High"
                            control={<Radio />}
                          />
                        </RadioGroup>
                      </Grid>
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
                    />
                  </Grid>
                  <Grid item>
                    <Grid
                      item
                      container
                      direction="column"
                      style={{ marginTop: "5em" }}
                    >
                      <Grid item>
                        <Typography variant="h4">Users</Typography>
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
                          />
                          <FormControlLabel
                            classes={{ label: classes.service }}
                            value="10-100"
                            label="10-100"
                            control={<Radio />}
                          />
                          <FormControlLabel
                            classes={{ label: classes.service }}
                            value="100+"
                            label="100+"
                            control={<Radio />}
                          />
                        </RadioGroup>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container justifyContent="space-around">
              <Grid item style={{ marginTop: "5em" }}>
                <Select
                  labelId="platforms"
                  id="platforms"
                  multiple
                  value={platforms}
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
              <Grid item style={{ marginTop: "5em" }}>
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
                  {featureOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default ProjectManager;
