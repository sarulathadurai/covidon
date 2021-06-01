import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dashboard from './Dashboard';
import NavTabs from './NavTabs';

const useStyles = makeStyles((theme) => ({

}));

export default function Layout() {


    return (
        <Dashboard>
            <Grid container>
                <Grid item xs={12} sm={12}>
                    <NavTabs />
                </Grid>
            </Grid>
        </Dashboard>
    );
}
