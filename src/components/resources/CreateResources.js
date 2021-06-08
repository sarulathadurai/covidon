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
import { Redirect } from 'react-router';

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
        width: "18rem",
        [theme.breakpoints.down('md')]: {
            width: 'auto',
            margin:'auto'
        },
        padding: '10px',
        margin: theme.spacing(1)
    },
    header:{
        color:"#160c66",
        letterSpacing:'0.1em',
        fontFamily:'Chela One,cursive',
        fontSize:'2rem',
    },
}))

const CreateResource = (props) => {
    const [formData, setformData] = useState({
        resType: "",
        stock: "",
        bloodType:"",
        otherName:"",
        district:"",
        state:"Andhra Pradesh"
    })

    const [error,setError] = useState(false)
    const {resType,stock,bloodType,otherName,district,state} = formData;
    const handleChange = (e) => {
        setformData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.createRes(formData);
    }

    const classes = useStyles();

    if(!props.auth) return <Redirect to='/signin'/>

    return (
        <>
            <Dashboard>
                <form className={classes.container}>
                    <FormControl className={classes.formControl} >
                        <h3 className={classes.header}>Create Resource</h3>
                        <FormControl className={classes.select}>
                        <InputLabel id="demo-simple-select-label"  color="secondary">Resource type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="type"
                            required
                            value={resType}
                            color="secondary"
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
                        {resType === "others" && <TextField
                            id="otherName"
                            label="Resource Name"
                            type="text"
                            color="secondary"
                            onChange={handleChange}
                            required
                            value={otherName}
                            className={classes.alignForms}
                        />}
                        {resType !== "plasma" && <TextField
                            id="stock"
                            label="stock"
                            type="text"
                            color="secondary"
                            onChange={handleChange}
                            required
                            value={stock}
                            className={classes.alignForms}
                        />}
                        {resType === "plasma" && <TextField
                            id="bloodType"
                            label="Blood Type"
                            type="text"
                            color="secondary"
                            onChange={handleChange}
                            required
                            value={bloodType}
                            className={classes.alignForms}
                        />}
                        <FormControl className={classes.select}>
                        <InputLabel color="secondary">State</InputLabel>
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
                        <Button  onClick={handleSubmit} variant="contained"  color="secondary" m={3}>
                            Create
                        </Button>
                    </FormControl>
                </form>
            </Dashboard>
        </>
    )
}

const mapStateToProps = (states) => {
    return{
        auth:states.firebase.auth.uid
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        createRes:(resource) => dispatch(createResource(resource))
    }
}


export default connect( mapStateToProps,mapDispatchToProps)(CreateResource);