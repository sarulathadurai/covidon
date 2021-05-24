import React, { useState } from 'react'
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import {FormControl} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dashboard from '../Home/Dashboard';
import {connect} from 'react-redux';
import {signin} from '../../store/actions/authActions'; 

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
            height:'50vh'
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

const Signin = (props) => {
    
    const [formData,setformData] = useState({
        email:"",
        password:"",      
    })

    const handleChange = (e) => {
        setformData({...formData,[e.target.id]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.signIn(formData);
        
    }
    const classes = useStyles();
    return(
        <Dashboard>
        <form className={classes.container} >                
            <FormControl className={classes.formControl} >
                <h3 className={classes.header}>Login</h3>
                <TextField  
                    id="email"
                    label="Email"
                    type = "email"
                    onChange = {handleChange}
                    className={classes.alignForms}
                />
                <TextField  
                    id="password"
                    label="Password"
                    type = "password"
                    onChange = {handleChange}
                    className={classes.alignForms}
               />
               <Button variant="contained" color="primary"  onClick={handleSubmit}>
                  Login
               </Button>
            </FormControl>
        </form>
        {/* <div className="center red-text">
              { authError ? <p>{authError}</p> : null }
        </div> */}
        </Dashboard>
    )
}

const mapStateToProps = (state) => {
    console.log(state);
    // return{
    //     authError: state.auth.authError,
    //     auth: state.firebase.auth
    //   }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        signIn:(creds) => dispatch(signin(creds))
    }
}

export default connect(null,mapDispatchToProps)(Signin);