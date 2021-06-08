import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import Search from './Search';
import {Link,useLocation} from 'react-router-dom';
import {connect} from 'react-redux';
import SignedOutLinks from './NavLinks/SignOutLinks';
import SignedInLinks from './NavLinks/SignedInLinks';

const useStyles = makeStyles((theme) => ({

  appBar: {
    background:'primary'
  },
  desGrow: {
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      flexGrow:0
    },
  },
  mobGrow: {
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      flexGrow:0
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'block',
    fontFamily:'Chela One,cursive',
    fontSize:'2rem',
    color:"#160c66",
    // [theme.breakpoints.down('sm')]: {
    //   flexGrow:3
    // },
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    margin: 0,
    padding: 0
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const Dashboard = ({ children,auth }) => {

  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const location = useLocation();

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
     {auth?<SignedInLinks/>:
              <SignedOutLinks/>}
    </Menu>
  );

  const SearchTab = () => {
    if(location.pathname === '/dashboard' || location.pathname === '/needs'){
      return (       
          <Search/>        
      )
    }else{
      return null;
    }
  }

  return (
    <>
      <div className={classes.grow}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            {auth ?<Link to="/dashboard" className={classes.link}>
              <Typography className={classes.title} variant="h6" noWrap>
                Covidon
              </Typography>
            </Link>:
              <Typography className={classes.title} variant="h6" noWrap>
                Covidon
              </Typography>}
            <div className={classes.mobGrow}>
            </div>
            {SearchTab()}
            <div className={classes.desGrow}>
            </div>   
            <div className={classes.sectionDesktop}>
              {auth?<SignedInLinks/>:
              <SignedOutLinks/>}
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
      </div>
      {children}
    </>
  );
}

const mapStateToProps = (states) => {
  return{
    auth:states.firebase.auth.uid
  }
}

export default connect(mapStateToProps)(Dashboard);