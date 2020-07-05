import React from 'react';
import '../scss/styles.scss'

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
            <div className="App">
                <div className="App__header">
                    <div className="App__header__text">
                        <h1>
                            Notetaking.<br/>
                            Easier than<br/> Ever.
                        </h1>
                        <h4>
                            Take notes anywhere, anytime. Never forget a thing again. Have all your thoughts easily accesible in one place.
                        </h4>
                        <button id="App__header__text__signup">
                            SIGN UP FOR FREE
                        </button>
                    </div>
                    <div className="App__header__image">
                        <img src="/scribe-banner-img.png" alt="banner-image"></img>
                    </div>
                </div>
                <div className="App__main-content">

                </div>

            </div>
        </>
    )


}