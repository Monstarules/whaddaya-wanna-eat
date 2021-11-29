import React from 'react';
import './index.css';

const Services = () => {
    return (
        <div>
            <h1>Terms and Services</h1>
            <p className="texts">Our app was maybe to provide a service, and we do hope that it serves you well. However, our app can only perform so many services, so we would like to explain here what exactly it is that Whaddaya Wanna Eat can do.</p>
            <h2 className="head">What we can and can't do</h2>
            <h3 className="thing">Can Do</h3>
            <div className="list2">
                <ul>
                    <li>Search for restaurants using restaurant name and/or imminent location</li>
                    <li>Associate restaurants with a user profile</li>
                    <li>Select a restuarant for the user</li>
                </ul>
            </div>
            <h3 className="thing">Can't Do</h3>
            <div className="list3">
                <ul>
                    <li>Order from restaurants</li>
                    <li>Contact Restaurants</li>
                    <li>Search for restaurants using specific meals as criteria</li>
                </ul>
            </div>
            <h2 className="head">Terms of Service</h2>
            <p className="texts">Being that there is a limit to what our app can do, this means that there are certain boundaries therein which should not be broken, and so we ask that any users of Whaddaya Wanna Eat follow our Terms of Service when using the application. You can read our Terms of Service below.</p>
            <br />
            <div className="list">
                <ol className>
                    <li>Please Use Sensibly</li>
                    <li>Do not tamper with the application's code</li>
                    <li>Do not claim this app as your own, "Whaddaya Wanna Eat" is an application developed solely by COP4331 Group#1</li>
                </ol>
            </div>
        </div>
    )
}

export default Services;