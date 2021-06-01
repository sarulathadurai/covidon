import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles,fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import { connect } from 'react-redux';
import NeedDetails from './NeedDetails';
import Dashboard from "../Home/Dashboard";

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
    background:'#ffc63db0',
  },
  Tabs:{
    background:'#ffbd1c',
  },
}));

const NeedTabs = (props) =>{

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
    <Dashboard>
    <div className={classes.root}>
      <AppBar position="static" color="default">
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
      </AppBar>
      <div className="alignTab">
      <TabPanel value={value} index={0} className={classes.tabPanel}>
        <NeedDetails needs = {oxygen} district = {district} />
      </TabPanel>
      </div>
      <TabPanel value={value} index={1} className={classes.tabPanel}>
      <NeedDetails needs = {plasma}  district = {district}/>
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.tabPanel}>
          <NeedDetails needs = {medicine}  district = {district}/>
      </TabPanel>
      <TabPanel value={value} index={3} className={classes.tabPanel}>
      <NeedDetails needs = {food}  district = {district}/>
      </TabPanel>
      <TabPanel value={value} index={4} className={classes.tabPanel}>
      <NeedDetails needs = {beds}  district = {district}/>
      </TabPanel>
      <div>
      <TabPanel value={value} index={5} className={classes.tabPanel}>
      <NeedDetails needs = {others} district = {district}/>
      </TabPanel>
      </div>
    </div>
    </Dashboard>
  );
}

const mapStateToProps = (states) => {
  console.log(states);
  const needs = states.firestore.ordered.needs;
  const {state,district} = states.loc;

  const oxygen = needs ? needs.filter((need) => need.needType === 'oxygen'):[];            
  const beds =  needs? needs.filter((need) => need.needType === 'beds' ):[];
  const food =  needs? needs.filter((need) => need.needType === 'food' ):[]; 
  const plasma =  needs? needs.filter((need) => need.needType === 'plasma' ):[];             
  const medicine = needs? needs.filter((need) => need.needType === 'medicine'):[];              
  const others = needs? needs.filter((need) => need.needType === 'others' ):[]; 
                 
  
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
    collection: 'needs'
  }])
)(NeedTabs);
