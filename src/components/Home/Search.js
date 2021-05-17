import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
// import mapData from "city-state-country";
import data from "../../data.json";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const Search = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("Andhra Pradesh");

  console.log({ state, district });

  return (
    <React.Fragment>
      <Button color="inherit" onClick={() => setOpen(true)}>
        <SearchIcon />
        Search by district
      </Button>
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
                  console.log(e.target.value);
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
                  console.log(e.target.value);
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
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default Search;

// export default function Search() {
//   const classes = useStyles();
//   const [open, setOpen] = useState(false);
//   const [values, setValues] = useState({
//     city: "",
//     state: "",
//   });

//   const { district, state } = values;

//   const [options, setOptions] = useState({
//     Alldistricts: "",
//     AllState: mapData.getAllStatesFromCountry("India"),
//   });

//   const { Alldistricts, AllState } = options;

//   const handleChange = (name) => (e) => {
//     setValues({ ...values, [name]: e.target.value });
//   };
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const populateDistricts = () => {
//     let Alldis = data.filter((data) => data.state === state);
//     console.log(Alldis);
//     return (
//       <FormControl className={classes.formControl}>
//         <InputLabel htmlFor="demo-dialog-native">District</InputLabel>
//         <Select
//           native
//           value={district}
//           onChange={handleChange(district)}
//           input={<Input />}
//         >
//           {Alldis.map((el) => {
//             el.districts.map((district, index) => {
//               console.log(district);
//               state !== "" && (
//                 <MenuItem key={index} value={district}>
//                   {district}
//                 </MenuItem>
//               );
//             });
//           })}
//         </Select>
//       </FormControl>
//     );
//   };

//   return (
//     <div>
//       <Button color="inherit" onClick={handleClickOpen}>
//         <SearchIcon />
//         Search by district
//       </Button>
//       <Dialog
//         disableBackdropClick
//         disableEscapeKeyDown
//         open={open}
//         onClose={handleClose}
//       >
//         <DialogTitle>Fill the form</DialogTitle>
//         <DialogContent>
//           <form className={classes.container}>
//             <FormControl className={classes.formControl}>
//               <InputLabel id="demo-dialog-select-label">State</InputLabel>
//               <Select
//                 labelId="demo-dialog-select-label"
//                 id="demo-dialog-select"
//                 value={state}
//                 onChange={handleChange("state")}
//                 input={<Input />}
//               >
//                 {AllState.map((state) => (
//                   <MenuItem key={state.id} value={state.name}>
//                     {state.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             {populateDistricts()}
//           </form>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleClose} color="primary">
//             Ok
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
