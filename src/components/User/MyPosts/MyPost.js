import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import Dashboard from '../../Home/Dashboard';
import ResourceDetails from '../../resources/ResourceDetails';
import { Card, CardContent, Grid,Avatar } from '@material-ui/core';
import NeedDetails from '../../Needs/NeedDetails';
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import PostResOperations from './PostResOperations';
import PostNeedOperation from './PostNeedOperation';
import {Redirect} from 'react-router-dom';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
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
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 600,
        marginTop: 50,
        [theme.breakpoints.down('md')]:{
            width: 'auto',
            marginLeft:3,
            marginTop: 20,
        }  
    },
    card: {
        marginTop: 50,
        marginLeft: 20,
        minWidth:200,
        [theme.breakpoints.down('md')]:{
            marginTop:20,
            marginLeft:10
        }  
    },
    typography:{
        display:'grid',
        placeItems:'center'
    },
    title: {
        fontSize: 28,
        fontFamily: 'Mate SC, serif',
        color:'#1e235a',
    },
    avatar: {
        backgroundColor: '#1e235a',
        marginRight: '1vw',
        padding:2
    },
    icon:{
        background:"#ffbd1c9c",
        color:"#1e235a",
        borderRadius:'50px',
        padding:3,
        margin:6,
        
    }
}));

const MyPost = (props) => {
    const { myPostRes, myPostNeeds,profile,uid} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
    if(!uid) return <Redirect to='signin' />
    return (
        <Dashboard>
            <Grid container spacing={2}>
                <Grid item sm={3} xs={12}>
                    <Card className={classes.card} variant="outlined">
                        <CardContent >
                                <Typography className={classes.typography}>
                                <div className={classes.avatarStyle}>
                                <Avatar className={classes.avatar}>{profile.initials} </Avatar>
                                </div>   
                                <h3 className={classes.title}>{profile.firstName}{profile.lastName}</h3>
                                <p fontWeight="bold">Email: {profile.email}</p>
                                <p fontWeight="bold">Contact Number: {profile.phNo}</p>
                                </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sm={9} xs={12}>
                    <div className={classes.root}>
                        <AppBar position="static" color="default">
                            <Box textAlign="center" fontWeight="fontWeightBold">
                                <h3 className={classes.title}>Your Posts</h3>
                            </Box>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="fullWidth"
                                aria-label="full width tabs example"
                            >
                                <Tab label="Resources" {...a11yProps(0)} />
                                <Tab label="Needs" {...a11yProps(1)} />
                            </Tabs>
                        </AppBar>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={value}
                            onChangeIndex={handleChangeIndex}
                        >
                            <TabPanel value={value} index={0} dir={theme.direction}>
                                {
                                    <ResourceDetails res={myPostRes}>
                                        <PostResOperations icon={classes.icon}/>
                                    </ResourceDetails>
                                }
                            </TabPanel>
                            <TabPanel value={value} index={1} dir={theme.direction}>
                                {
                                     <NeedDetails needs={myPostNeeds}>
                                        <PostNeedOperation icon={classes.icon}/>
                                 </NeedDetails>
                                }
                            </TabPanel>
                        </SwipeableViews>
                    </div>
                </Grid>
            </Grid>
        </Dashboard>
    );
}


const mapStateToProps = (states) => {
    const uid = states.firebase.auth.uid;
    const profile = states.firebase.profile;
    const resources = states.firestore.ordered.resources;
    const myPostRes = resources ? resources.filter((res) => res.userId === uid) : []
    const needs = states.firestore.ordered.needs;
    const myPostNeeds = needs ? needs.filter((need) => need.userId === uid) : []
    return {
        myPostNeeds,
        myPostRes,
        profile,
        uid
    }

}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{
        collection: 'needs',
      },
    {
        collection:'resources'
    }])
)(MyPost);