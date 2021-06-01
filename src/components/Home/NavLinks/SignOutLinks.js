import React from 'react';
import {NavLink} from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: "none",
        color: "#160c66",
        fontWeight:'1000',
        fontSize:'0.875rem',
        margin: 0,
        padding: 0
      },
}))

const SignedOutLinks = () => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <NavLink to="/signup" className={classes.link}>
                <MenuItem>
                Sign Up
                </MenuItem>
            </NavLink>
            <NavLink to="/signin" className={classes.link}>
                <MenuItem>
                Login
                </MenuItem>
            </NavLink>
        </React.Fragment>
    )
}

export default SignedOutLinks;