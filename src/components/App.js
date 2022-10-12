import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useReducer, useState, useMemo, useEffect } from 'react';
import Navbar from './navbar.js';
import Homepage from '../pages/homepage.js';
import Withdrawal from '../pages/withdrawal.js';
import Deposits from '../pages/deposits.js';
import Alldata from '../pages/alldata.js';
import Login from '../pages/login.js';
import CreateAccount from '../pages/createaccount.js';
import Founders from '../pages/founders.js';
import Promotions from '../pages/promotion.js';
import { UserContext, LoginContext, istate, reducer, auth } from './context.js';
import Masonry from 'react-masonry-css'
import '../index.css';
import {onAuthStateChanged}  from 'firebase/auth';

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

    function callAuthRoute2(){
        // call server with token
        auth.currentUser.getIdToken()
            .then((idToken)=>{
                console.log('idToken******', idToken);
       (async ()=>{
            let response = await fetch('/auth', {
                method: "GET",
                headers: {
                    'authorization': idToken
                }
            });
          console.log("56");
            let text = await response.json();
            console.log('response:', text);
            if(text.auth){
              const email = text.email;
              console.log(email);
              const url = `/account/findOne/${email}`;
                var res  = await fetch(url);
                var data = await res.json();    
                console.log("data weird", data); 
                const{firstName, lastName, phone, balance, transact, admin} = data;
              const action = { type: 'VERIFYUSER', payload: {firstName, lastName, phone, email, balance, transact, admin}};
                dispatch(action);    
            }})();
      }).catch(e=>{
        console.log('e:', e);
      })
      }

      useEffect(()=>{
        onAuthStateChanged(auth, (currentUser)=>{
            console.log("in UseEffect", currentUser);
          setUserLoggedIn(currentUser? true : false);
          if(currentUser){
          callAuthRoute2();
          }
        });
        }, []);

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