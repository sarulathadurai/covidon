import React, { useState } from 'react'
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import { FormControl } from "@material-ui/core";
import Button from "@material-ui/core/Button"
import Dashboard from '../Home/Dashboard';
import {connect} from 'react-redux';
import { signUp } from '../../store/actions/authActions';
import MuiAlert from '@material-ui/lab/Alert';
import {Redirect} from 'react-router-dom';

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
        height:"80vh",
        background:"white",
        width:'40rem',
        [theme.breakpoints.down('md')]:{
            height:'80vh'
        }
    },
    alignForms:{
        width:"20rem",
        [theme.breakpoints.down('md')]:{
            width:'auto'
        },
        padding:'10px',
    },
    header:{
        color:"#160c66",
        letterSpacing:'0.1em',
        fontFamily:'Chela One,cursive',
        fontSize:'2rem',
    },
}))

const Signup = (props) => {

    const {auth,authMsg} = props;
    const [formData,setformData] = useState({
        firstName:"",
        lastName:"",
        password:"",
        phNo:"",
        email:"",
    })

    const handleChange = (e) => {
        setformData({...formData,[e.target.id]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.signup(formData);
    }

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const classes = useStyles();
    return(
        <>
        <Dashboard>
        {authMsg?
                <Alert 
                    severity={authMsg === "SIGNUP SUCCESS"?"success":"error"}
                    className={classes.alert}>
                     {authMsg}
                </Alert>
              :null } 
        <form className={classes.container}>
            <FormControl className={classes.formControl} >
                <h3 className={classes.header}>Sign Up</h3>
                <TextField  
                    id="firstName"
                    label="First Name"
                    type = "text"
                    onChange = {handleChange}
                    color="secondary"
                    required
                    className={classes.alignForms}
                />
                <TextField  
                    id="lastName"
                    label="Last Name"
                    type = "text"
                    onChange = {handleChange}
                    color="secondary"
                    required
                    className={classes.alignForms}
                />
                <TextField  
                    id="email"
                    label="Email"
                    type = "email"
                    onChange = {handleChange}
                    color="secondary"
                    required
                    className={classes.alignForms}
                />
                <TextField  
                    id="password"
                    label="Password"
                    type = "password"
                    onChange = {handleChange}
                    color="secondary"
                    required
                    className={classes.alignForms}
                />
                <TextField  
                    id="phNo"
                    label="Mobile Number"
                    type = "tel"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    onChange = {handleChange}
                    color="secondary"
                    required
                    className={classes.alignForms}
                />
                <Button variant="contained"  color="secondary" onClick={handleSubmit}>
                  Signup
               </Button>
            </FormControl>

        </form>
        </Dashboard>
        {auth.uid&&<Redirect to = "/"/>}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authMsg: state.auth.authMsg
      }
}

const mapDispatchToProps = (dispatch) => {
    return{
        signup:(creds) => dispatch(signUp(creds))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Signup);