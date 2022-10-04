import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useReducer, useState, useMemo } from 'react';
import Navbar from './navbar.js';
import Homepage from '../pages/homepage.js';
import Withdrawal from '../pages/withdrawal.js';
import Deposits from '../pages/deposits.js';
import Alldata from '../pages/alldata.js';
import Login from '../pages/login.js';
import CreateAccount from '../pages/createaccount.js';
import Founders from '../pages/founders.js';
import Promotions from '../pages/promotion.js';
import { UserContext, LoginContext, istate, reducer } from './context.js';
import Masonry from 'react-masonry-css'
import '../index.css';

import { initializeApp } from "firebase/app";

const firebaseConfig = {

    apiKey: "AIzaSyCvqZeGAySesFpWWC-vDAarKWtcRjRCvjE",
    authDomain: "badbank-cd36f.firebaseapp.com",
    projectId: "badbank-cd36f",
    storageBucket: "badbank-cd36f.appspot.com",
    messagingSenderId: "1050167168889",
    appId: "1:1050167168889:web:fca7f24814cf154d2ca9a8"
  
  };
  
  
  // Initialize Firebase
  
  const app = initializeApp(firebaseConfig);



function App() {
    const breakpointColumnsObj = {
        default: 1,
        500: 1
      };
    const [state, dispatch] = useReducer(reducer, istate.users);  
    console.log("in app state", state);
    const contextValue = useMemo(()=>({state, dispatch}), [state, dispatch]);
    console.log("in app contextValue", contextValue);
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    return (
            <BrowserRouter>
                <UserContext.Provider value={contextValue} >
                <LoginContext.Provider value={{userLoggedIn, setUserLoggedIn}} >
                <Navbar />
                <div className="container-fluid">
                    <div className="row no-gutters align-items-stretch">
                        <div className="col  col-lg-auto col-md-auto">
                            <Masonry  breakpointCols={breakpointColumnsObj} className="my-masonry-grid container" columnClassName="my-masonry-grid_column">
                        
                                <Routes>
                                    <Route path='/' element={<><Homepage /> <Promotions /></>} />
                                    <Route path='/login' element={<Login />} />
                                    <Route path='/createaccount' element={<CreateAccount />} />
                                    <Route path='/balance' element={<h1>Account Balance</h1>} />
                                    <Route path='/deposits' element={<Deposits />} />
                                    <Route path='/withdrawal' element={<Withdrawal />} />
                                    <Route path='/alldata' element={<Alldata/>} />
                                   
                                </Routes>
                            </Masonry>
                        </div>
                        <div className='col col-lg-auto col-md-auto flex-fill ``'>
                            <Founders />
                        </div>  
                    </div> 
                </div>
                <div className="footer border-top navbar-bottom bg-success">
                    <div className="container">
                        <span className="text-muted"> copyright and contact information here</span>
                    </div>
                </div>
                </LoginContext.Provider>    
                </UserContext.Provider>
            </BrowserRouter>
    );
}

export default App;