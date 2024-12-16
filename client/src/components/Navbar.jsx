import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css';
import { useAuth } from '../store/Auth';

function Navbar() {
    const { isLoggedIn } = useAuth();
    console.log("login or not ", isLoggedIn);
    return (
        <>

            <div className="container">
                <div className="logo">
                <NavLink to="/">Website</NavLink>
                    
                </div>
                <nav>
                    <ul >
                        <li>
                            <NavLink to="/" className="list-item">Home</NavLink>
                        </li>

                        <li>
                            <NavLink to="/about" className="list-item">About</NavLink>
                        </li>

                        <li>
                        <NavLink to="/services" className="list-item">Services</NavLink>
                            
                        </li>
                        <li>
                        <NavLink to="/contact" className="list-item">Contact</NavLink>
                        </li>

                       

                        {isLoggedIn ? (
                <li className="list-item">
                  <NavLink to="/logout" className="list-item">Logout</NavLink>
                  <NavLink to="/private" className="list-item">Private</NavLink>
                  
                </li>
              ) : (
                <>
                  <li className="list-item">
                    <NavLink to="/register" className="list-item"> Register </NavLink>
                  </li>

                  <li className="list-item">
                    <NavLink to="/login" className="list-item"> Login </NavLink>
                  </li>
                </>
              )}
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Navbar