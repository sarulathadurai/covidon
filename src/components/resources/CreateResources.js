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
import Input from '@material-ui/core/Input';

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
        height: "70vh",
        boxShadow: "-5px 5px 8px #888888",
        width: '40rem',
        [theme.breakpoints.down('md')]: {
            height: '60vh'
        }
    },
    select:{
        margin:theme.spacing(1),
        width: "20rem",
        [theme.breakpoints.down('md')]: {
            width: 'auto'
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

const CreateResources = () => {

    const [formData, setformData] = useState({
        name: "",
        type: "",
        description: "",
        district:"",
        state:"Andhra Pradesh"
    })

    const {name,type,description,district,state} = formData;
    const handleChange = (e) => {
        setformData({ ...formData, [e.target.id]: e.target.value })
    }

    const classes = useStyles();
    return (
        <>
            <Dashboard>
                <form className={classes.container}>
                    <FormControl className={classes.formControl} >
                        <h3 className={classes.header}>Create Resources</h3>
                        <TextField
                            id="name"
                            label="Patient Name"
                            type="text"
                            onChange={handleChange}
                            required
                            className={classes.alignForms}
                        />
                        <FormControl className={classes.select}>
                        <InputLabel id="demo-simple-select-label">Resource type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="type"
                            value={type}
                            onChange={handleChange}
                        >
                            <MenuItem value="Oxygen">Oxygen</MenuItem>
                            <MenuItem value="Plasma">Plasma</MenuItem>
                            <MenuItem value="Medicine">Medicine</MenuItem>
                            <MenuItem value="Food">Food</MenuItem>
                            <MenuItem value="Beds">Beds</MenuItem>
                            <MenuItem value="Others">Others</MenuItem>
                        </Select>
                        </FormControl>
                        <TextField
                            id="description"
                            label="Description"
                            type="text"
                            onChange={handleChange}
                            required
                            className={classes.alignForms}
                        />
                        <FormControl className={classes.select}>
                        <InputLabel >State</InputLabel>
                        <Select
                            id="state"                      
                            onChange={handleChange}
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
                            onChange={handleChange}
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

export default CreateResources;