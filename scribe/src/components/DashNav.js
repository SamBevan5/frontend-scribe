import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import UserContext from '../context/UserContext';
import 'primeicons/primeicons.css';

export default (props) => {

    const {userData, setUserData} = useContext(UserContext)
    const history = useHistory();

    const logout = () => {
        setUserData ({
            token: undefined,
            user: undefined
        })
        localStorage.removeItem("auth-token")
        history.push('/')
    }


    return (
        <div className= "dashnav">
            <div className="dashnav__hamburger">
                <i className="pi pi-list" style={{color: "white", fontSize: "1.8em", margin: "0", padding: "0"}}></i>
            </div>
            <div className="dashnav__img">
                <a href="/"><img src="scribe-alt2.png" alt="scribe-logo"></img></a>
            </div>
            <div className="dashnav__links">
                <Link to="" style={{ textDecoration: 'none' }}><span id="logout" onClick={logout}>Logout</span></Link>   
            </div>
        </div>
    );
};