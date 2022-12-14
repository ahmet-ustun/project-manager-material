import React, { useState } from "react";

import { lighten, makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";

import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import GreaterThanIcon from "@material-ui/icons/KeyboardArrowRight.js";
import LessThanIcon from "@material-ui/icons/KeyboardArrowLeft.js";
import EqualToIcon from "@material-ui/icons/DragHandle.js";
import DollarIcon from "@material-ui/icons/AttachMoney.js";

import clsx from "clsx";
import PropTypes from "prop-types";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "name", label: "Name" },
  { id: "date", label: "Date" },
  { id: "service", label: "Service" },
  { id: "features", label: "Features" },
  { id: "complexity", label: "Complexity" },
  { id: "platforms", label: "Platforms" },
  { id: "users", label: "Users" },
  { id: "total", label: "Total" },
];

function EnhancedTableHead({
  classes,
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              hideSortIcon
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
  menu: {
    "&:hover": {
      backgroundColor: "#FFFFFF",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#FFFFFF",
    },
  },
  totalFilter: {
    fontSize: "2rem",
    color: theme.palette.common.orange,
  },
}));

const EnhancedTableToolbar = ({
  numSelected,
  rows,
  setRows,
  selected,
  setSelected,
  totalFilter,
  setTotalFilter,
  filterPrice,
  setFilterPrice,
}) => {
  const classes = useToolbarStyles();

  const [undoRows, setUndoRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    color: "",
  });

  const handleDelete = () => {
    const newRows = [...rows];
    const selectedRows = newRows.filter((row) => selected.includes(row.id));

    selectedRows.map((row) => (row.search = false));

    setRows(newRows);
    setUndoRows(selectedRows);
    setSelected([]);

    setAlert({
      open: true,
      message: "Rows have been deleted!",
      color: "#FF3232",
    });
  };

  const handleUndo = () => {
    setAlert({ open: false, message: "", color: "" });

    const newRows = [...rows];
    const redoRows = [...undoRows];

    redoRows.map((row) => (row.search = true));
    Array.prototype.push.apply(newRows, ...redoRows);

    setRows(newRows);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      setAlert({ open: false, message: "", color: "" });

      const newRows = [...rows];
      const idList = [...undoRows.map((row) => row.id)];

      setRows(newRows.filter((row) => !idList.includes(row.id)));
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.target);
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleTotalFilter = (event) => {
    setFilterPrice(event.target.value);

    if (event.target.value) {
      const newRows = [...rows];

      newRows.map((row) => {
        const operator = totalFilter === "=" ? "===" : totalFilter;

        eval(`${event.target.value} ${operator} ${row.total.split("$")[1]}`)
          ? (row.search = true)
          : (row.search = false);
      });

      setRows(newRows);
    } else {
      const newRows = [...rows];

      newRows.map((row) => (row.search = true));

      setRows(newRows);
    }
  };

  const changeFilter = (operator) => {
    if (filterPrice) {
      const newRows = [...rows];

      newRows.map((row) => {
        const actionItem = operator === "=" ? "===" : operator;

        eval(`${filterPrice} ${actionItem} ${row.total.split("$")[1]}`)
          ? (row.search = true)
          : (row.search = false);
      });

      setRows(newRows);
    }
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="primary"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          color="primary"
          variant="subtitle1"
          component="div"
        >
          {null}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon style={{ fontSize: 30 }} color="primary" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list" onClick={handleMenuClick}>
            <FilterListIcon style={{ fontSize: 30 }} color="secondary" />
          </IconButton>
        </Tooltip>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alert.open}
        message={alert.message}
        ContentProps={{
          style: {
            backgroundColor: alert.color,
          },
        }}
        action={
          <Button style={{ color: "#FFFFFF" }} onClick={handleUndo}>
            Undo
          </Button>
        }
        onClose={(event, reason) => handleClose(event, reason)}
      />
      <Menu
        id="simple-menu"
        style={{ zIndex: 1305 }}
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        elevation={0}
        keepMounted
      >
        <MenuItem classes={{ root: classes.menu }}>
          <TextField
            placeholder="Enter a price to filter"
            value={filterPrice}
            onChange={handleTotalFilter}
            InputProps={{
              type: "number",
              startAdornment: (
                <InputAdornment position="start">
                  <DollarIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="end"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setTotalFilter(
                      totalFilter === ">"
                        ? "<"
                        : totalFilter === "<"
                        ? "="
                        : ">"
                    );
                    changeFilter(
                      totalFilter === ">"
                        ? "<"
                        : totalFilter === "<"
                        ? "="
                        : ">"
                    );
                  }}
                >
                  {totalFilter === ">" ? (
                    <GreaterThanIcon className={classes.totalFilter} />
                  ) : totalFilter === "<" ? (
                    <LessThanIcon className={classes.totalFilter} />
                  ) : (
                    <EqualToIcon className={classes.totalFilter} />
                  )}
                </InputAdornment>
              ),
            }}
          />
        </MenuItem>
      </Menu>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  filterChip: {
    marginRight: "2em",
    backgroundColor: theme.palette.common.blue,
    color: "#FFFFFF",
  },
}));

function EnhancedTable({
  rows,
  setRows,
  page,
  setPage,
  isSoftwareChecked,
  isIOSChecked,
  isAndroidChecked,
  isWebsiteChecked,
}) {
  const classes = useStyles();

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [selected, setSelected] = useState([]);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalFilter, setTotalFilter] = useState(">");
  const [filterPrice, setFilterPrice] = useState("");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const switchFilters = () => {
    const softwareRows = rows.filter((row) =>
      isSoftwareChecked ? row.service === "Software" : null
    );

    const iOSRows = rows.filter((row) =>
      isIOSChecked ? row.platforms.includes("iOS") : null
    );

    const androidRows = rows.filter((row) =>
      isAndroidChecked ? row.platforms.includes("Android") : null
    );

    const websiteRows = rows.filter((row) =>
      isWebsiteChecked ? row.service === "Website" : null
    );

    if (
      !isSoftwareChecked &&
      !isIOSChecked &&
      !isAndroidChecked &&
      !isWebsiteChecked
    ) {
      return rows;
    } else {
      const newRows = softwareRows.concat(
        iOSRows.filter((item) => softwareRows.indexOf(item) < 0)
      );

      const newRows2 = newRows.concat(
        androidRows.filter((item) => newRows.indexOf(item) < 0)
      );

      const newRows3 = newRows2.concat(
        websiteRows.filter((item) => newRows2.indexOf(item) < 0)
      );

      return newRows3;
    }
  };

  const checkFilteredPrices = (switchFiltersFn) => {
    if (filterPrice) {
      const newRows = [...switchFiltersFn];

      newRows.map((row) => {
        const actionItem = totalFilter === "=" ? "===" : totalFilter;

        eval(`${filterPrice} ${actionItem} ${row.total.split("$")[1]}`)
          ? row.search === false
            ? null
            : (row.search = true)
          : (row.search = false);
      });

      return newRows;
    } else {
      return switchFiltersFn;
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          rows={rows}
          setRows={setRows}
          selected={selected}
          setSelected={setSelected}
          totalFilter={totalFilter}
          setTotalFilter={setTotalFilter}
          filterPrice={filterPrice}
          setFilterPrice={setFilterPrice}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(
                checkFilteredPrices(switchFilters()).filter(
                  (row) => row.search
                ),
                getComparator(order, orderBy)
              )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                        style={{
                          minWidth: "5em",
                          maxWidth: "5em",
                          wordBreak: "break-word",
                        }}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          minWidth: "5em",
                          maxWidth: "5em",
                          wordBreak: "break-word",
                        }}
                      >
                        {row.date}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          minWidth: "5em",
                          maxWidth: "5em",
                          wordBreak: "break-word",
                        }}
                      >
                        {row.service}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          minWidth: "10em",
                          maxWidth: "10em",
                          wordBreak: "break-word",
                        }}
                      >
                        {row.features}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          minWidth: "5em",
                          maxWidth: "5em",
                          wordBreak: "break-word",
                        }}
                      >
                        {row.complexity}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          minWidth: "5em",
                          maxWidth: "5em",
                          wordBreak: "break-word",
                        }}
                      >
                        {row.platforms}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          minWidth: "5em",
                          maxWidth: "5em",
                          wordBreak: "break-word",
                        }}
                      >
                        {row.users}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          minWidth: "5em",
                          maxWidth: "5em",
                          wordBreak: "break-word",
                        }}
                      >
                        {row.total}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={
            checkFilteredPrices(switchFilters()).filter((row) => row.search)
              .length
          }
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Grid container justifyContent="flex-end">
          <Grid item>
            {filterPrice ? (
              <Chip
                className={classes.filterChip}
                label={
                  totalFilter === ">"
                    ? `Less than $${filterPrice}`
                    : totalFilter === "<"
                    ? `Greater than $${filterPrice}`
                    : `Equal to $${filterPrice}`
                }
                onDelete={() => {
                  setFilterPrice("");
                  const newRows = [...rows];

                  newRows.map((row) => (row.search = true));

                  setRows(newRows);
                }}
              />
            ) : null}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default EnhancedTable;
