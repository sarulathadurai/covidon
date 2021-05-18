import React from 'react'
import {Switch,BrowserRouter as Router,Route } from 'react-router-dom';
import App from './App';
import Signup from "./components/User/Signup";
import Signin from "./components/User/Signin";
import CreateResources from './components/resources/CreateResources';

const Routes = () => {

    return(
    <Router>
        <Switch>
            <Route path = "/" exact component = {App}/>
            <Route path ="/signup" exact component = {Signup}/>
            <Route path ="/signin" exact component = {Signin}/>
            <Route path ="/create" exact component = {CreateResources} />
        </Switch>
    </Router>
    )
}

export default Routes;