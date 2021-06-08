import React, { useState } from 'react'
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import {FormControl} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dashboard from '../Home/Dashboard';
import {connect} from 'react-redux';
import {signin} from '../../store/actions/authActions'; 
import MuiAlert from '@material-ui/lab/Alert';
import {Link, Redirect} from 'react-router-dom';
import SnackBar from '@material-ui/core/Snackbar';

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
        width:'40rem',
        [theme.breakpoints.down('md')]:{
            height:'55vh',
        }
    },
    alignForms:{
        width:"20rem",
        color:'black',
        [theme.breakpoints.down('md')]:{
            width:'10rem'
        },
        padding:'10px',
        margin:theme.spacing(2)
    },
    header:{
        color:"#160c66",
        letterSpacing:'0.1em',
        fontFamily:'Chela One,cursive',
        fontSize:'2rem',
    },
    alert:{
        margin:theme.spacing(2),
        [theme.breakpoints.up('md')]:{
            width:'50%',
        }
    },
    link:{
        textDecoration:'none',
        color:'blue'
    },
    snackbar:{
        width:'100%'
    }
}))

const Signin = (props) => {
    
    const {loginMsg,auth} = props
    const [formData,setformData] = useState({
        email:"",
        password:"",      
    });
    const [open,setOpen] = useState();

    const handleChange = (e) => {
        setformData({...formData,[e.target.id]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.signIn(formData);
        setOpen(true)    
    }

    const handleClose = (event,reason) => {
        if (reason === 'clickaway') {
            return;
          }
      
          setOpen(false);
    }

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    
    const classes = useStyles();
    return(
        <Dashboard>  
            {loginMsg?
            <SnackBar open={open} autoHideDuration={6000} onClose={handleClose} className={classes.snackbar}>
                <Alert 
                    onClose={handleClose}
                    severity={loginMsg === "LOGIN SUCCESS"?"success":"error"}
                    className={classes.alert}>
                     {loginMsg}
                </Alert>
            </SnackBar>
              :null } 
        <form className={classes.container} >                
            <FormControl className={classes.formControl} >
                <h3 className={classes.header} fontWeight="bold" >Login</h3>
                <TextField  
                    id="email"
                    label="Email"
                    type = "email"
                    color="secondary"
                    onChange = {handleChange}
                    className={classes.alignForms}
                />
                <TextField  
                    id="password"
                    label="Password"
                    type = "password"
                    color="secondary"
                    onChange = {handleChange}
                    className={classes.alignForms}
               />
                <p>Not having an account?
                    <Link to='/signup' className={classes.link}>
                        Signup
                    </Link>
                </p>
               <Button variant="contained" color="secondary"  onClick={handleSubmit}>
                  Login
               </Button>
            </FormControl>
        </form>     
        {auth.uid&&<Redirect to = "/dashboard"/>}
        </Dashboard>
    )
}

const mapStateToProps = (state) => {
    return{
        loginMsg: state.auth.loginMsg,
        auth: state.firebase.auth
      }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        signIn:(creds) => dispatch(signin(creds))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Signin);