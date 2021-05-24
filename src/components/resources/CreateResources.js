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
import {connect} from 'react-redux';
import {createResource} from "../../store/actions/resourceActions"

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

const CreateResource = (props) => {
    const [formData, setformData] = useState({
        resType: "",
        stock: null,
        bloodType:null,
        otherName:null,
        district:"",
        state:"Andhra Pradesh"
    })

    const {resType,stock,bloodType,otherName,description,district,state} = formData;
    const handleChange = (e) => {
        setformData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        props.createRes(formData);
    }

    const classes = useStyles();
    return (
        <>
            <Dashboard>
                <form className={classes.container}>
                    <FormControl className={classes.formControl} >
                        <h3 className={classes.header}>Create Resource</h3>
                        <FormControl className={classes.select}>
                        <InputLabel id="demo-simple-select-label">Resource type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="type"
                            value={resType}
                            onChange={(e)=>{
                                setformData({...formData,resType:e.target.value})
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
                        {resType !== "Plasma" && <TextField
                            id="stock"
                            label="stock"
                            type="text"
                            onChange={handleChange}
                            required
                            value={stock}
                            className={classes.alignForms}
                        />}
                        {resType === "Plasma" && <TextField
                            id="Blood Type"
                            label="Blood Type"
                            type="text"
                            onChange={handleChange}
                            required
                            value={bloodType}
                            className={classes.alignForms}
                        />}
                        {resType === "Other" && <TextField
                            id="Resource Name"
                            label="Resource Name"
                            type="text"
                            onChange={handleChange}
                            required
                            value={otherName}
                            className={classes.alignForms}
                        />}
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
                        <Button  onClick={handleSubmit} variant="contained" color="primary">
                            create
                        </Button>
                    </FormControl>
                </form>
            </Dashboard>
        </>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
}


const mapDispatchToProps = (dispatch) => {
    return{
        createRes:(resource) => dispatch(createResource(resource))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(CreateResource);