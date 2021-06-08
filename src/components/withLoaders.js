import React from 'react';
import {CircularProgress} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));


const withLoader = (WrappedComponent) => {
  const Loader = () =>{
    const classes = useStyles();
    return (
      <div className = {classes.root}>
      <CircularProgress/>
    </div>
    )
  } 
   return ({resources,...props}) => {
     return  resources ? <WrappedComponent {...props} /> : Loader
  
   }
 }

 export default withLoader;