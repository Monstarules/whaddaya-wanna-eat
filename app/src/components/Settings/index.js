import React from 'react';
import './index.css';

function resetPass()
{	
	var currUrl = window.location.href;
    var id = currUrl.substring(currUrl.lastIndexOf('#') + 1);

	var pass = document.getElementById("password").value;
	var pass2 = document.getElementById("password2").value;

	document.getElementById("resetPassword").innerHTML = "";

    if(pass === pass2){
        var tmp = {"Password":pass};
	    var jsonPayload = JSON.stringify( tmp );
    }
    else{
        alert("Passwords do not match. Please make sure passwords are the same before submitting.");
    }
	
	var url = `https://waddaya-wanna-eat.herokuapp.com/api/users/resetPassword?acc=${id}`;
	
	var xhr = new XMLHttpRequest();
	xhr.open("PATCH", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState === 4 && this.status === 200) 
			{
				document.getElementById("resetPassword").innerHTML = "Password has been reset.";
                alert("Password has been reset.");
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("resetPassword").innerHTML = err.message;
        alert("error");
	}
	
}

function PATCH ()
{
    var currUrl = window.location.href;
    var id = currUrl.substring(currUrl.lastIndexOf('=') + 1);
	console.log(id)

	var pass = document.getElementById("password").value;
	var pass2 = document.getElementById("password2").value;

	document.getElementById("resetPassword").innerHTML = "";

    if(pass === pass2){
        if(pass.length < 5){
            alert("Password is too short. Please make sure passwords are at least 5 characters in length.");
        }
        var tmp = {"password" : \"pass\"};
    }
    else{
        alert("Passwords do not match. Please make sure passwords are the same before submitting.");
    }
	console.log(JSON.stringify({tmp}))
	alert("HARD PAUSE")

    fetch(`https://waddaya-wanna-eat.herokuapp.com/api/users/resetPassword/${id}`, {
      method: `PATCH`,
      body: JSON.stringify({tmp}),
      headers: { 'Content-type': `application/json; charset=UTF-8` },
    }).then((response) => response.json(alert("Password has been reset. Please return to the app login screen to login."))).catch((err) => console.log('error: ', err))
    
    document.getElementById("password").value = "";
    document.getElementById("password2").value = "";
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
                    <button onClick={PATCH} className="button">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Settings;
