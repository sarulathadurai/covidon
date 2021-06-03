import React from 'react';
import {NavLink} from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import {Avatar, makeStyles} from '@material-ui/core';
import { signOut } from '../../../store/actions/authActions';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: "none",
        color: "#160c66",
        margin: "10px",
        padding: 0,    
        fontWeight:'1000',
        fontSize:'0.875rem',
        [theme.breakpoints.down('md')]:{
            margin:0
        }
      },
      avatar: {
        backgroundColor: '#1e235a',
        textDecoration:"none"
      },
      sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
      },
      sectionMobile: {
        display: 'flex',
        textDecoration: "none",
        color: "#160c66",
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
      }, 
}))

const SignedOutLinks = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
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
            <NavLink to="myposts" className={classes.sectionDesktop}>
            <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="secondary"
              >
                <Avatar className={classes.avatar}>{props.initials}</Avatar>
            </IconButton>
            </NavLink>
            <NavLink to="myposts" className = {classes.sectionMobile}>
                <MenuItem>
                    My Posts
                </MenuItem>
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