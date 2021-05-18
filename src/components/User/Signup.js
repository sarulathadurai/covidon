import React, { useState } from 'react'
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import { FormControl } from "@material-ui/core";
import Button from "@material-ui/core/Button"
import Dashboard from '../Home/Dashboard';

const useStyles = makeStyles((theme) => ({
    container:{
        display:"flex",
        alignItems:'center',
        justifyContent:'center',
              
    },
    formControl:{
        display:"flex",
        alignItems:'center',
        justifyContent:'center',
        margin:theme.spacing(6),
        padding:'10px',
        height:"70vh",
        boxShadow:"-5px 5px 8px #888888",
        width:'40rem',
        [theme.breakpoints.down('md')]:{
            height:'60vh'
        }
    },
    alignForms:{
        width:"20rem",
        [theme.breakpoints.down('md')]:{
            width:'auto'
        },
        padding:'10px',
        mardin:theme.spacing(2)
    },
    header:{
        color:"#3f51b5",
        borderBottom:"2px solid #3f51b5"
    }
}))

const Signup = () => {
    
    const [formData,setformData] = useState({
        name:"",
        password:"",
        phNo:"",
        email:"",
    })

    const handleChange = (e) => {
        setformData({...formData,[e.target.id]:e.target.value})
    }

    const classes = useStyles();
    return(
        <>
        <Dashboard>
        <form className={classes.container}>
            <FormControl className={classes.formControl} >
                <h3 className={classes.header}>Sign Up</h3>
                <TextField  
                    id="name"
                    label="Name"
                    type = "text"
                    onChange = {handleChange}
                    required
                    className={classes.alignForms}
                />
                <TextField  
                    id="email"
                    label="Email"
                    type = "email"
                    onChange = {handleChange}
                    required
                    className={classes.alignForms}
                />
                <TextField  
                    id="password"
                    label="Password"
                    type = "password"
                    onChange = {handleChange}
                    required
                    className={classes.alignForms}
                />
                <TextField  
                    id="phNo"
                    label="Mobile Number"
                    type = "tel"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    onChange = {handleChange}
                    required
                    className={classes.alignForms}
                />
                <Button variant="contained" color="primary">
                  Signup
               </Button>
            </FormControl>

        </form>
        </Dashboard>
        </>
    )
}

export default  Signup;