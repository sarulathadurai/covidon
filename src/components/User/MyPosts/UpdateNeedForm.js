import React, { useState } from 'react'
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl } from "@material-ui/core";
import Button from "@material-ui/core/Button"
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import data from '../../../data.json';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',

    },
    formControl: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        height: "auto",
        background: "white",
        width: '40rem',
    },
    select: {
        margin: theme.spacing(),
        width: "19rem",
        [theme.breakpoints.down('md')]: {
            width: '13rem'
        },
    },
    alignForms: {
        width: "18rem",
        [theme.breakpoints.down('md')]: {
            width: 'auto'
        },
        padding: '10px',
        margin: theme.spacing(1)
    },
    header: {
        color: "#160c66",
        letterSpacing: '0.1em',
        fontFamily: 'Chela One,cursive',
        fontSize: '2rem',
    },
}))

const UpdateNeedForm = (props) => {
    const {need} = props
    const [formData, setformData] = useState({
        patientName:need.patientName ,
        bloodType:need.bloodType ,
        needType:need.needType,
        otherName:need.otherName,
        description:need.description ,
        district:need.district,
        state:need.state,
    })

    const {name,needType,bloodType,otherName,description,district,state} = formData;
    const handleChange = (e) => {
        setformData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        props.updatePost(need.id,formData);
    }

    const classes = useStyles();
    return (
        <Dialog
            open={props.updateOpen}
            onClose={props.toggleUpdateDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" color="secondary">{"Update Stocks"}</DialogTitle>
            <DialogContent>
            <form className={classes.container}>
                    <FormControl className={classes.formControl} >
                        <h3 className={classes.header}>Post Need</h3>
                        <TextField
                            id="patientName"
                            label="Patient Name"
                            type="text"
                            onChange={handleChange}
                            required
                            color="secondary"
                            value={name}
                            className={classes.alignForms}
                        />
                        <FormControl className={classes.select}>
                        <InputLabel id="demo-simple-select-label" color="secondary">Need</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="needType"
                            color="secondary"
                            value={needType}
                            onChange={(e)=>{
                                setformData({...formData,needType:e.target.value})
                            }}
                        >
                            <MenuItem value="oxygen">Oxygen</MenuItem>
                            <MenuItem value="plasma">Plasma</MenuItem>
                            <MenuItem value="medicine">Medicine</MenuItem>
                            <MenuItem value="food">Food</MenuItem>
                            <MenuItem value="beds">Beds</MenuItem>
                            <MenuItem value="others">Others</MenuItem>
                        </Select>
                        </FormControl>
                        {needType === "plasma" && <TextField
                            id="bloodType"
                            label="Blood Type"
                            type="text"
                            color="secondary"
                            onChange={handleChange}
                            required
                            value={bloodType}
                            className={classes.alignForms}
                        />}
                        {needType === "others" && <TextField
                            id="otherName"
                            label="Need"
                            type="text"
                            color="secondary"
                            onChange={handleChange}
                            required
                            value={otherName}
                            className={classes.alignForms}
                        />}
                        <TextField
                            id="description"
                            label="Description"
                            type="text"
                            color="secondary"
                            value={description}
                            onChange={handleChange}
                            required
                            className={classes.alignForms}
                        />
                        <FormControl className={classes.select}>
                        <InputLabel  color="secondary" >State</InputLabel>
                        <Select
                            id="state"    
                            value={state}
                            color="secondary"                  
                            onChange={(e)=>{
                                setformData({...formData,state:e.target.value})
                            }}
                        >
                            {data.map((data, index) => (
                                <MenuItem key={index} value={data.state}>
                                    {data.state}
                                </MenuItem>
                            ))}
                        </Select>
                        </FormControl>
                        <FormControl className={classes.select}>
                        <InputLabel  color="secondary" >District</InputLabel>
                        <Select
                            id="district"
                            value={district}
                            color="secondary"
                            onChange={(e)=>{
                                setformData({...formData,district:e.target.value})
                            }}
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
                    </FormControl>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.toggleUpdateDialog} color="primary">
                    Disagree
                            </Button>
                <Button onClick={handleSubmit} color="primary" autoFocus>
                    Agree
                            </Button>
            </DialogActions>
        </Dialog>
    )
}


export default UpdateNeedForm;