import React from 'react';
import {NavLink,Link} from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import {Avatar, makeStyles} from '@material-ui/core';
import { signOut } from '../../../store/actions/authActions';
import { connect } from 'react-redux';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: "none",
        color: "#160c66",
        margin: "10px",
        padding: 0,    
        fontWeight:'1000',
        fontSize:'0.875rem'
      },
      avatar: {
        backgroundColor: '#1e235a',
        textDecoration:"none"
      }
}))

const SignedOutLinks = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    console.log(props);
    const handleProfileMenuOpen = (event) => {
        console.log(event.currentTarget);
        setAnchorEl(event.currentTarget);
    };
      
    const handleMenuClose = () => {
    setAnchorEl(null);
    };

    const classes = useStyles();
    const menuId = 'primary-search-account-menu';

    return (
        <React.Fragment>
            <NavLink to="/createRes" className={classes.link}>
                <MenuItem>
                Create Resource
                </MenuItem>
            </NavLink>
            <NavLink to="/postNeed" className={classes.link}>
                <MenuItem>
                Post Need
                </MenuItem>
            </NavLink>
            <NavLink className={classes.link} to='/'>
            <MenuItem onClick={props.signout}>
                Sign Out
            </MenuItem>
            </NavLink>
            <NavLink to="myposts">
            <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="secondary"
              >

                {/* <AccountCircle /> */}
                <Avatar className={classes.avatar}>{props.initials}</Avatar>
            </IconButton>
            </NavLink>
        </React.Fragment>
    )
}

const mapStateToProps = (states) => {
    return{
        initials:states.firebase.profile.initials
    }
}


const mapDispatchToProps = (dispatch) => {
    return{
        signout: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignedOutLinks);