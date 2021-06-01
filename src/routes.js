import React from 'react'
import {Switch,BrowserRouter as Router,Route } from 'react-router-dom';
import App from './App';
import Signup from "./components/User/Signup";
import Signin from "./components/User/Signin";
import CreateResources from './components/resources/CreateResources';
import CreateNeed from './components/Needs/CreateNeed';
import MyPost from './components/User/MyPosts/MyPost';
import NeedTabs from './components/Needs/NeedTabs';
import NeedLayout from './components/Needs/NeedLayout';

const Routes = () => {

    return(
    <Router>
        <Switch>
            <Route path = "/" exact component = {App}/>
            <Route path ="/signup" exact component = {Signup}/>
            <Route path ="/signin" exact component = {Signin}/>
            <Route path ="/create" exact component = {CreateResources} />
            <Route path="/post" exact component= {CreateNeed} />
            <Route path="/needs" exact component={NeedTabs} />
            <Route path="/myposts" exact component = {MyPost} />
        </Switch>
    </Router>
    )
}

export default Routes;