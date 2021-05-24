import React, { useState } from 'react'
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl } from "@material-ui/core";
import Button from "@material-ui/core/Button"
import Dashboard from '../Home/Dashboard';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import data from '../../data.json';

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
        margin: theme.spacing(6),
        padding: '10px',
        height: "80vh",
        boxShadow: "-5px 5px 8px #888888",
        width: '40rem',
    },
    select:{
        margin:theme.spacing(),
        width: "19rem",
        [theme.breakpoints.down('md')]: {
            width: '13rem'
        },
    },
    alignForms: {
        width: "20rem",
        [theme.breakpoints.down('md')]: {
            width: 'auto'
        },
        padding: '10px',
        margin: theme.spacing(1)
    },
    header: {
        color: "#3f51b5",
        borderBottom: "2px solid #3f51b5"
    }
}))

const CreateNeed = () => {

    const [formData, setformData] = useState({
        name: "",
        bloodType: "",
        needType:null,
        description: "",
        district:"",
        state:"Andhra Pradesh",
        phNo:""
    })

    const {name,needType,bloodType,description,district,state} = formData;
    const handleChange = (e) => {
        setformData({ ...formData, [e.target.id]: e.target.value })
    }

    const classes = useStyles();
    return (
        <>
            <Dashboard>
                <form className={classes.container}>
                    <FormControl className={classes.formControl} >
                        <h3 className={classes.header}>Post Need</h3>
                        <TextField
                            id="name"
                            label="Patient Name"
                            type="text"
                            onChange={handleChange}
                            required
                            value={name}
                            className={classes.alignForms}
                        />
                        <FormControl className={classes.select}>
                        <InputLabel id="demo-simple-select-label">Need</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="type"
                            value={needType}
                            onChange={(e)=>{
                                setformData({...formData,needType:e.target.value})
                            }}
                        >
                            <MenuItem value="Oxygen">Oxygen</MenuItem>
                            <MenuItem value="Plasma">Plasma</MenuItem>
                            <MenuItem value="Medicine">Medicine</MenuItem>
                            <MenuItem value="Food">Food</MenuItem>
                            <MenuItem value="Beds">Beds</MenuItem>
                            <MenuItem value="Others">Others</MenuItem>
                        </Select>
                        {needType === "Plasma" && <TextField
                            id="Blood Type"
                            label="Blood Type"
                            type="text"
                            onChange={handleChange}
                            required
                            value={bloodType}
                            className={classes.alignForms}
                        />}
                        </FormControl>
                        <TextField
                            id="description"
                            label="Description"
                            type="text"
                            value={description}
                            onChange={handleChange}
                            required
                            className={classes.alignForms}
                        />
                        <FormControl className={classes.select}>
                        <InputLabel >State</InputLabel>
                        <Select
                            id="state"    
                            value={state}                  
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
                        <InputLabel >District</InputLabel>
                        <Select
                            id="district"
                            value={district}
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
                        <Button variant="contained" color="primary">
                            create
                        </Button>
                    </FormControl>
                </form>
            </Dashboard>
        </>
    )
}

export default CreateNeed;