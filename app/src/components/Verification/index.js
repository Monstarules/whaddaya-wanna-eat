import React from 'react';
import './index.css';

const VERIFY = (id) => {
    var currUrl = window.location.href;
    var id = currUrl.substring(currUrl.lastIndexOf('=') + 1);
	
	fetch(`https://waddaya-wanna-eat.herokuapp.com/confirm/${id}`, {
		method: `GET`,
		body: JSON.stringify({}),
		headers: { 'Content-type': `application/json; charset=UTF-8` },
	})
}

const Verification = () => {
    return (
        <div className="things" onload={VERIFY}>
	    <img src onerror={VERIFY}/>
            <h1>Thank you for choosing us!</h1>
            <p className="texts">Your account is now verified! Thank you for choosing Whaddaya Wanna Eat for your restaurant picking needs. We hope the use of our app helps to leave you full and satisifed.
            <br /><br />
            Please return to the login page of the app to login.
            </p>
        </div>
    )
}

export default Verification;
