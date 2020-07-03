import React from 'react';
import UserContext from '../context/UserContext';

export default (props) => {
    
    // Store jwt
    const [token, setToken] = React.useState(null)

    // Localize storage for jwt
    React.useEffect(() => {
        const checkToken = JSON.parse(window.localStorage.getItem('auth-token'))
        if (checkToken) {
            setToken(checkToken)
        }
    }, [])

    return (
        <>
            <h1>Homepage</h1>
        </>
    )


}