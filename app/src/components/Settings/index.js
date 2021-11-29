import React from 'react';
import './index.css';

function resetPass() {
	var currUrl = window.location.href;
	var id = currUrl.substring(currUrl.lastIndexOf('=') + 1);

	var pass = document.getElementById("password").value;
	var pass2 = document.getElementById("password2").value;
	
	// Sorry Allie, I'm commenting this out for now.
	// document.getElementById("resetPassword").innerHTML = "";
	if(pass === pass2){
        	var tmp = {"password":pass};
	    	var jsonPayload = JSON.stringify(tmp);
		
		console.log(jsonPayload)
		
		var url = `https://waddaya-wanna-eat.herokuapp.com/api/users/resetPassword/{id}`;
	
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
    else {
        alert("Passwords do not match. Please make sure passwords are the same before submitting.");
    }
	
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
                    <button onClick="resetPass()" className="button">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Settings;
