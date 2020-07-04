import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import Login from './components/Login.js';
import Register from './components/Register'
import Home from './components/Home.js';
import Dashboard from './components/Dashboard'
import UserContext from './context/UserContext'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Nav from './components/Nav'

    
const App = (props) => {
    
    let hist = createBrowserHistory()

    //STATE FOR STORING OUR JWT
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined
    })


    return (
        <>
            <BrowserRouter history={hist}>
                <UserContext.Provider value={{userData, setUserData}}>
                    <Nav />
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/dashboard" component={Dashboard}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/login" component={Login}/>
                    </Switch>
                </UserContext.Provider>
            </BrowserRouter>
            
        </>
    )

}


const target = document.getElementById('root');
ReactDOM.render(<App />, target);