import React from 'react';
import './index.css';

const Settings = () => {
    return (
        <div>
            <h1>Forgot your password? Let us help you.</h1>
            <div className="box_container">
                <div className="text">
                    If you've lost your password or wish to reset it, enter your email below.
                </div>
                <form className="form">
                    <div>
                    <label>
                        Email:&nbsp;
                        <input type="email" name="email" className="input" />
                    </label>
                    </div>
                    <input className="button" type="submit" value="Submit" />
                </form>
            </div>
        </div>
    )
}

export default Settings;