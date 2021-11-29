import React from 'react';
import './index.css';

const PATCH = (id) => {
    var currUrl = window.location.href;
    var id = currUrl.substring(currUrl.lastIndexOf('=') + 1);

	var pass = document.getElementById("password").value;
	var pass2 = document.getElementById("password2").value;

	document.getElementById("resetPassword").innerHTML = "";

    if(pass.length < 5){
        alert("Password is too short. Please make sure passwords are at least 5 characters in length.");
    }
    else if (pass != pass2) {
        alert("Passwords do not match. Please make sure passwords are the same before submitting.");
    }
	else {
		var password = pass;
		console.log(JSON.stringify({password}));
		fetch(`https://waddaya-wanna-eat.herokuapp.com/api/users/resetPassword/${id}`, {
			method: `PATCH`,
			body: JSON.stringify({password}),
			headers: { 'Content-type': `application/json; charset=UTF-8` },
		}).then((response) => response.json(alert("Password has been reset. Please return to the app login screen to login.")))
		document.getElementById("password").value = "";
		document.getElementById("password2").value = "";
	}
}

const Settings = () => {
    return (
        <div>
            <h1>Forgot your password? Let us help you.</h1>
            <div className="box_container">
                <div className="text">
                    To reset your password, enter a new password at least 5 characters long and confirm it below.
                </div>
                <div id="resetPassword"></div>
                <form className="form">
                    <div>
                    <label>
                        New password:&nbsp;
                        <input type="password" id="password" className="input" />
                    </label><br />
                    <label>
                        Confirmation: &nbsp;
                        <input type="password" id="password2" className="input2"/>
                    </label>
                    </div>
                    <button onClick={PATCH} className="button" type="button">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Settings;
