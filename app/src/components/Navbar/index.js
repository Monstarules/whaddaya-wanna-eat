import React from 'react';
import symbol1 from '../../symbol1.png';
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from './NavbarElements';
import gear from "../../gear.png";



const Navbar = () => {
    return (        
               <Nav>
                   <img src={symbol1} className="navLogo" class="img-responsive" alt="logo"/>
                    <NavLink to="/">
                        {/*<h1>Whaddaya Wanna Eat?</h1>*/}
                    </NavLink>
                  
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
                        <NavLink to="/settings" activeStyle><a href="" className="settings"><img className="settings" src={gear} width="25px" height="25px"/></a>
                        </NavLink>
                    </NavMenu>
                    {/* <NavBtn>
                        <NavBtnLink to='/signin'>Sign In</NavBtnLink>
                    </NavBtn> */}
                </Nav>
       
    )
}

export default Navbar;
