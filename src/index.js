import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Routes from './routes';
import rootReducer from './store/reducers/rootReducer';
import { applyMiddleware, createStore,compose} from 'redux';
import firebase from 'firebase/app'
import {Provider} from "react-redux";
import { createFirestoreInstance,getFirestore,reduxFirestore } from 'redux-firestore'
import { ReactReduxFirebaseProvider,getFirebase} from 'react-redux-firebase';
import thunk from 'redux-thunk'
import config from './config';
 
const store = createStore(
  rootReducer,
  compose(
      applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
      reduxFirestore(firebase, config)
  )
);

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch:store.dispatch,
  createFirestoreInstance
}

ReactDOM.render(
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
      <Routes/>
      </ReactReduxFirebaseProvider>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
