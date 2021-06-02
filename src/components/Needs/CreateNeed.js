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
import { postNeed } from '../../store/actions/needActions';
import {Redirect} from 'react-router-dom';

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
        background:"white",
        [theme.breakpoints.down('md')]: {
           height:"70vh"
        },
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
    header:{
        color:"#160c66",
        letterSpacing:'0.1em',
        fontFamily:'Chela One,cursive',
        fontSize:'2rem',
    },
}))

const CreateNeed = (props) => {

    const [formData, setformData] = useState({
        patientName: "",
        bloodType: "",
        needType:"",
        otherName:"",
        description: "",
        district:"",
        state:"Andhra Pradesh",
    })

    const {name,needType,bloodType,otherName,description,district,state} = formData;
    const handleChange = (e) => {
        setformData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.postNeed(formData);
    }

    const classes = useStyles();

    if(!props.auth) return <Redirect to='/signin'/>

    return (
        <>
           <Dashboard>
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
                        <Button variant="contained"  color="secondary" onClick={handleSubmit}>
                            Post
                        </Button>
                    </FormControl>
                </form>
            </Dashboard>
        </>
    )
}

const mapStateToProps = (states) => {
    return{
        auth : states.firebase.auth.uid
    }
}


const mapDispatchToProps = (dispatch) => {
    return{
        postNeed:(need)=>(dispatch(postNeed(need)))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(CreateNeed);