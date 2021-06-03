import React, { useState } from "react";
import { fade,makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import SearchIcon from "@material-ui/icons/Search";
import data from "../../data.json";
import {connect} from "react-redux";


const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    color:"#160c66",
    marginLeft:10,
     [theme.breakpoints.down('md')]: {
      display:'none'
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const Search = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("Andhra Pradesh");
  console.log(props);
  return (
    <React.Fragment>
      <div className={classes.search}> 
      <Button color="inherit" onClick={() => setOpen(true)}>
        <SearchIcon />
        Search by district
      </Button>
      </div>
      <SearchIcon color="secondary"  onClick={() => setOpen(true)} className={classes.sectionMobile} />
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>Fill the form</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">State</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
                input={<Input />}
              >
                {data.map((data, index) => (
                  <MenuItem key={index} value={data.state}>
                    {data.state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">District</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={district}
                onChange={(e) => {
                  setDistrict(e.target.value);
                }}
                input={<Input />}
              >
                {data
                  .filter((data) => data.state === state)[0]
                  .districts.map((data, index) => (
                    <MenuItem key={index} value={data}>
                      {data}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => {
            props.addLocation({district,state})
            setOpen(false)
            }} color="secondary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addLocation:(payload) => dispatch({type:"ADD_LOCATION",payload:payload})
  }
}

export default connect(null,mapDispatchToProps)(Search);
