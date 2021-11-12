import React from 'react';
import symbol1 from '../../symbol1.png';
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from './NavbarElements';


const Navbar = () => {
    return (        
               <Nav>
                   <img src={symbol1} className="App-logo" class="img-responsive" alt="logo"/>
                    <NavLink to="/">
                        {/*<h1>Whaddaya Wanna Eat?</h1>*/}
                    </NavLink>
                    <Bars />
                    <NavMenu>
                        <NavLink to="/" activeStyle>
                            Home
                        </NavLink>
                        <NavLink to="/about" activeStyle>
                            About
                        </NavLink>
                        <NavLink to="/services" activeStyle>
                            Services
                        </NavLink>
                        {/* <NavLink to="/contact-us" activeStyle>
                            Contact Us
                        </NavLink> */}
                    </NavMenu>
                    {/* <NavBtn>
                        <NavBtnLink to='/signin'>Sign In</NavBtnLink>
                    </NavBtn> */}
                </Nav>
       
    )
}

export default Navbar;
