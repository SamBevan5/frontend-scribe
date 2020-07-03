import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import UserContext from '../context/UserContext';

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
        <div className= "header">
            <div className="header__img">
            </div>
            <div className="header__nav">
                <Link to="/" style={{ textDecoration: 'none' }}><span>Home</span></Link>
                {userData.token ? 
                (<><Link to="/dashboard" style={{ textDecoration: 'none' }}><span>Favorites</span></Link>
                <Link to="" style={{ textDecoration: 'none' }}><span onClick={logout}>Logout</span></Link></>) : 
                (<>
                <Link to="/register" style={{ textDecoration: 'none' }}><span>Register</span></Link>
                <Link to="/login" style={{ textDecoration: 'none' }}><span>Log In</span></Link></>)}
            </div>
        </div>
    );
};