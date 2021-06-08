import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Routes from './routes';
import rootReducer from './store/reducers/rootReducer';
import { applyMiddleware, createStore,compose} from 'redux';
import firebase from 'firebase/app'
import {Provider,useSelector} from "react-redux";
import { createFirestoreInstance,getFirestore,reduxFirestore } from 'redux-firestore'
import { ReactReduxFirebaseProvider,getFirebase,isLoaded} from 'react-redux-firebase';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import thunk from 'redux-thunk'
import config from './config';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const store = createStore(
  rootReducer,
  compose(
      applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
      reduxFirestore(firebase, config)
  )
);

const theme = createMuiTheme({
  palette: {
    primary: {
      main:'#f5ae03' ,
    },
    secondary: {
      main:'#1e235a',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root:{
    display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
  }
}));


const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch:store.dispatch,
  createFirestoreInstance,
}

function AuthIsLoaded({ children }) {
  const classes = useStyles();
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)){
    return(
      <div className={classes.root}>
      <CircularProgress color="secondary" />
    </div>
    )
  } 
  return children
}

  ReactDOM.render(
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
      <ThemeProvider theme={theme}>
        <AuthIsLoaded>
        <Routes/>
        </AuthIsLoaded>
      </ThemeProvider>
      </ReactReduxFirebaseProvider>
    </Provider>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
