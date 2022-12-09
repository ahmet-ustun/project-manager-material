import React, { useState } from "react";

import { makeStyles, useTheme } from "@material-ui/styles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import AddIcon from "@material-ui/icons/Add.js";

const useStyles = makeStyles((theme) => ({}));

function ProjectManager() {
  const classes = useStyles();
  const theme = useTheme();

  const [isSoftwareChecked, setIsSoftwareChecked] = useState(false);
  const [isIOSChecked, setIsIOSChecked] = useState(false);
  const [isAndroidChecked, setIsAndroidChecked] = useState(false);
  const [isWebsiteChecked, setIsWebsiteChecked] = useState(false);

  return (
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
              <InputAdornment position="end">
                <AddIcon color="primary" />
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
    </Grid>
  );
}

export default ProjectManager;
