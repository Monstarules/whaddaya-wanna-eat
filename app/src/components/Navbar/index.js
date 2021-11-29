import React from 'react';
import symbol1 from '../../symbol1.png';
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from './NavbarElements';
import gear from "../../gear.png";



const Navbar = () => {
    return (        
               <Nav>
                   <img src={symbol1} className="navLogo" alt="logo"/>
                    <NavLink to="/">
                        {/*<h1>Whaddaya Wanna Eat?</h1>*/}
                    </NavLink>
                  
                    <NavMenu>
                        <NavLink to="/">
                            Home
                        </NavLink>
                        <NavLink to="/about">
                            About
                        </NavLink>
                        <NavLink to="/services">
                            Services
                        </NavLink>
                    </NavMenu>
                    {/* <NavBtn>
                        <NavBtnLink to='/signin'>Sign In</NavBtnLink>
                    </NavBtn> */}
                </Nav>
       
    )
}

export default Navbar;
