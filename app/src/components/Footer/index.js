import React from 'react';
import './index.css';

const Footer = () => {
    return ( 
        <div className="footer">
            <div className="container">
                <div className="row">
                    {/* Column1 */}
                    <div className="col">
                        <h4>WHADDAYA WANNA EAT</h4>
                        <ul className="list-unstyled">
                            <li>phone</li>
                            <li>UCF</li>
                            <li>address</li>
                        </ul>
                    </div>
                    {/* Column2 */}
                    <div className="col">
                        <h4>STUFF</h4>
                        <ul className="list-unstyled">
                            <li>STUFF1</li>
                            <li>STUFF2</li>
                            <li>STUFF3</li>
                        </ul>
                    </div>
                    {/* Column3 */}
                    <div className="col">
                        <h4>AHHHH</h4>
                        <ul className="list-unstyled">
                            <li>AH</li>
                            <li>AHH</li>
                            <li>AHHH</li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <p classname="col-sm">
                        &copy;(new Date().getFullYear()) WHADDAYA WANNA EAT | All rights reserved | Terms of Service | Privacy

                    </p>
                </div>
            </div>          
        </div>
    )
}

export default Footer;
