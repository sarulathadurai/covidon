import React, { useState } from 'react';
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
        marginTop: 50
    },
    card: {
        marginTop: 50,
        marginLeft: 20,
    },
}));

const MyPost = (props) => {
    const { myPostRes, myPostNeeds } = props;
    console.log({ myPostRes, myPostNeeds });
    const [anchorEl, setAnchorEl] = useState(null)
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <Dashboard>
            <Grid container spacing={2} >
                <Grid item sm={3} xs={3}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography>
                                <Avatar bgColor="secondary" >ka</Avatar>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sm={9} xs={9}>
                    <div className={classes.root}>
                        <AppBar position="static" color="default">
                            <Box textAlign="center" fontWeight="fontWeightBold">
                                <h3>Your Posts</h3>
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
                                        <PostResOperations/>
                                    </ResourceDetails>
                                }
                            </TabPanel>
                            <TabPanel value={value} index={1} dir={theme.direction}>
                                {
                                     <NeedDetails needs={myPostNeeds}>
                                        <PostNeedOperation/>
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
    const resources = states.firestore.ordered.resources;
    const myPostRes = resources ? resources.filter((res) => res.userId === uid) : []
    const needs = states.firestore.ordered.needs;
    const myPostNeeds = needs ? needs.filter((need) => need.userId === uid) : []
    return {
        myPostNeeds,
        myPostRes
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