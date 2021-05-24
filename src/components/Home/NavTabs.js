import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ResourceDetails from '../resources/ResourceDetails';
import { Button, Container } from '@material-ui/core';
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

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
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  tab:{
    border:'1px solid purple',
    borderRadius:'20px',
    padding:'10px 20px'
  }
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

  const showResults = () => {
    if(district){
      return(
        <Typography>
        All results are shown for {district}.
      </Typography>
      );
    }
      else if (state){
        return (     
        <Typography>
          All results are shown for {state}.
        </Typography>
        )
      }
      else{
        return(
        <Typography>
          All results are shown.
        </Typography>
        )
      }
  }

  return (
    <>
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Oxygen" {...a11yProps(0)} />
          <Tab label="Plasma" {...a11yProps(1)} />
          <Tab label="Medicine" {...a11yProps(2)} />
          <Tab label="Food" {...a11yProps(3)} />
          <Tab label="Beds" {...a11yProps(4)} />
          <Tab label="others" {...a11yProps(5)} />
        </Tabs>   
      </AppBar>
      <Box>
      {showResults()}
      </Box>
      <TabPanel value={value} index={0}>
        <Container>
        <ResourceDetails res = {oxygen} district = {district} />
        </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <ResourceDetails res = {plasma}  district = {district}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <ResourceDetails res = {medicine}  district = {district}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <ResourceDetails res = {food}  district = {district}/>
      </TabPanel>
      <TabPanel value={value} index={4}>
      <ResourceDetails res = {beds}  district = {district}/>
      </TabPanel>
      <TabPanel value={value} index={5}>
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
