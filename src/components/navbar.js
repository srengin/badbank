import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../index.css';
import ReactTooltip from 'react-tooltip';
import  { useState, useContext, } from 'react';
import { UserContext, LoginContext} from './context.js';



function Navbar(){
    const {state, dispatch} = useContext(UserContext);
    const {userLoggedIn, setUserLoggedIn} = useContext(LoginContext);
    console.log("teh state in nav bar: ", state);
 

    function logout(){
        const action = {type: 'LOGOUT'};
        dispatch(action);
        setUserLoggedIn(false);
    }


    return (
        
        <nav className="navbar navbar-expand-lg bg-success" >
            <div className="container-fluid">
                <Link className="navbar-brand text-white" to="/">BadBank</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                    <li className="nav-item ">
                        <NavLink className={({ isActive }) => (isActive ? "link-active nav-link text-white" : "link nav-link text-white")} data-tip data-for="home" aria-current="page" to="/">Home</NavLink>
                    </li>
                {userLoggedIn && <>
                    <li className="nav-item">
                        <NavLink className={({ isActive }) => (isActive ? "link-active nav-link text-white" : "link nav-link text-white")} data-tip data-for="deposits" to="/deposits">Deposits</NavLink></li>
                    <li className="nav-item">
                        <NavLink className={({ isActive }) => (isActive ? "link-active nav-link text-white" : "link nav-link text-white")} data-tip data-for="withdrawal" to="/withdrawal">Withdrawal</NavLink></li>
                    <li className="nav-item">
                     <NavLink className={({ isActive }) => (isActive ? "link-active nav-link text-white" : "link nav-link text-white")} data-tip data-for="alldata" to="/alldata">All Data</NavLink>
                    </li></>
                    }
                </ul>
                
                <ul className ="navbar-nav ">
                {!userLoggedIn &&
                    <><li className="nav-item">
                        <NavLink className={({ isActive }) => (isActive ? "link-active nav-link text-white" : "link nav-link text-white")} data-tip data-for="login" to="/login">Log In</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={({ isActive }) => (isActive ? "link-active nav-link text-white" : "link nav-link text-white")} data-tip data-for="login" to="/createaccount">Create Account</NavLink>
                    </li> </> }
                {userLoggedIn &&  <><li className="nav-item">
                        <button data-tip data-for="logout" onClick={logout}>Hi {state.firstName ? state.firstName : state.email}! | Logout</button>
                    </li></>}

                </ul>
                <ReactTooltip id="home" place="top" effect="solid">
                        Go bank to the home page
                </ReactTooltip>
                <ReactTooltip id="deposits" place="top" effect="solid">
                        Deposit into your bank account
                </ReactTooltip>
                <ReactTooltip id="withdrawal" place="top" effect="solid">
                        Withdrawal from your bank account
                </ReactTooltip>
                <ReactTooltip id="alldata" place="top" effect="solid">
                        Admin Information
                </ReactTooltip>
                <ReactTooltip id="login" place="top" effect="solid">
                        Login to see your account information at BadBank
                </ReactTooltip>
                <ReactTooltip id="createaccount" place="top" effect="solid">
                        Create a new account at BadBank
                </ReactTooltip>
                <ReactTooltip id="logout" place="top" effect="solid">
                        Click here to Log Out.
                </ReactTooltip>

              </div>
            </div>
        </nav>
    );
}

export default Navbar