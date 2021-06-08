import React from 'react'
import {Switch,BrowserRouter as Router,Route } from 'react-router-dom';
import App from './App';
import Signup from "./components/User/Signup";
import Signin from "./components/User/Signin";
import CreateResources from './components/resources/CreateResources';
import CreateNeed from './components/Needs/CreateNeed';
import MyPost from './components/User/MyPosts/MyPost';
import NeedTabs from './components/Needs/NeedTabs';
import HomePage from './components/Home/HomePage';


const Routes = () => {

    return(
    <Router>
        <Switch>
            <Route path= "/" exact component = {HomePage}/>
            <Route path = "/dashboard" exact component = {App}/>
            <Route path ="/signup" exact component = {Signup}/>
            <Route path ="/signin" exact component = {Signin}/>
            <Route path ="/createRes" exact component = {CreateResources} />
            <Route path="/postNeed" exact component= {CreateNeed} />
            <Route path="/needs" exact component={NeedTabs} />
            <Route path="/myposts" exact component = {MyPost} />
        </Switch>
    </Router>
    )
}

export default Routes;