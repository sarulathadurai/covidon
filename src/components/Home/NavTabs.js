import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles,fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ResourceDetails from '../resources/ResourceDetails';
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {Button} from "@material-ui/core";
import { Link } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  tab:{
    backgroundColor: fade(theme.palette.common.white, 0.15),
    borderRadius:'30px',
    margin:'5px',
    height:"1vh"
  },
  tabPanel:{
    display:'flex',
    justifyContent:'center',
    background:'#ffc63db0'
  },
  Tabs:{
    background:'#ffbd1c',
  },
  button:{
    margin:"10px",
    border:'2px solid #160c66'
},
link: {
  textDecoration: "none",
},
}));

const NavTabs = (props) =>{

  const {oxygen,
    beds,
    plasma,
    medicine,
    food,
    others,
    district,
    state} = props;

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const showResults = (
    
  ) => {
    if(district){
      return(
        <Typography>
        results are shown for {district}.
      </Typography>
      );
    }
      else{
        return(
        <Typography>
          results are shown.
        </Typography>
        )
      }
  }

  return (
    <>
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Grid container>
          <Grid item sm={11} xs={9}>
          <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          className={classes.Tabs}
        >

          <Tab label="Oxygen" {...a11yProps(0)} className={classes.tab}/>
          <Tab label="Plasma" {...a11yProps(1)} className={classes.tab} />
          <Tab label="Medicine" {...a11yProps(2)} className={classes.tab} />
          <Tab label="Food" {...a11yProps(3)} className={classes.tab}/>
          <Tab label="Beds" {...a11yProps(4)} className={classes.tab}/>
          <Tab label="others" {...a11yProps(5)} className={classes.tab}/>
        </Tabs> 
          </Grid>
          <Grid item sm={1} xs={3}  className={classes.Tabs}>
          <Link to = "/needs" className={classes.link}>
          <Button 
            variant="outlined" 
            color="secondary"
            className={classes.button}>
             Needs
          </Button>
          </Link>  
          </Grid>
        </Grid>  
      </AppBar>
      <TabPanel value={value} index={0} className={classes.tabPanel}>
        <ResourceDetails res = {oxygen} district = {district} />
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.tabPanel}>
      <ResourceDetails res = {plasma}  district = {district}/>
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.tabPanel}>
      <ResourceDetails res = {medicine}  district = {district}/>
      </TabPanel>
      <TabPanel value={value} index={3} className={classes.tabPanel}>
      <ResourceDetails res = {food}  district = {district}/>
      </TabPanel>
      <TabPanel value={value} index={4} className={classes.tabPanel}>
      <ResourceDetails res = {beds}  district = {district}/>
      </TabPanel>
      <TabPanel value={value} index={5} className={classes.tabPanel}>
      <ResourceDetails res = {others} district = {district}/>
      </TabPanel>
    </div>
  </>
  );
}

const mapStateToProps = (states) => {

  const resources = states.firestore.ordered.resources;
  console.log(states)
  const {state,district} = states.loc;

  const oxygen = resources ? resources.filter((res) => res.resType === 'oxygen'):[];            
  const beds =  resources? resources.filter((res) => res.resType === 'beds' ):[];
  const food =  resources? resources.filter((res) => res.resType === 'food' ):[]; 
  const plasma =  resources? resources.filter((res) => res.resType === 'plasma' ):[];             
  const medicine = resources? resources.filter((res) => res.resType === 'medicine'):[];              
  const others = resources? resources.filter((res) => res.resType === 'others' ):[]; 
                 
  
  return {
    oxygen,
    beds,
    plasma,
    food,
    medicine,
    others,
    state,
    district
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'resources'
  }])
)(NavTabs)
