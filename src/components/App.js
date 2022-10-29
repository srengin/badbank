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
import { UserContext, LoginContext, user, reducer, auth, LoadingContext, AuthContext } from './context.js';
import Masonry from 'react-masonry-css'
import '../index.css';
import {onAuthStateChanged}  from 'firebase/auth';






function App() {
    const breakpointColumnsObj = {
        default: 1,
        500: 1};
    const [state, dispatch] = useReducer(reducer, user);  
    console.log("in app state", state);
    const contextValue = useMemo(()=>({state, dispatch}), [state, dispatch]);
    console.log("in app contextValue", contextValue);
    
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isauth, setIsauth] = useState(false);

   

    function callAuthRoute2(){
        let email = auth.currentUser.email;
        
        const url = `https://ancient-coast-35441.herokuapp.com/account/findOne/${email}`;
            (async () => {
                auth.currentUser.getIdToken()
                    .then((idToken)=>{
                    
                    (async()=>{
                        var res  = await fetch(url, {
                            method: "GET",
                            headers: {
                            'authorization': idToken,
                            'Content-Type':'application/json',
                            'Access-Control-Allow-Origin':'*',
                            
                             }
                            });
                      
                      let newState= await res.json();   
                      if (!res.ok || newState.auth===false){
                        var action = { type: 'LOGOUT'};
                        dispatch(action);
                      }else{
                    
                      console.log("data in verify user", newState);  
                      var action = { type: 'VERIFYUSER', payload: {newState}};
                      dispatch(action);                
                       
                      }
                    })();
                    
              })})();
        console.log("The state in app.js", state);
        console.log("email: ", state.email);
      }

      useEffect(()=>{
        onAuthStateChanged(auth, (currentUser)=>{
          if(currentUser){
          callAuthRoute2();
          }
        });
        }, []);
    
      
    useEffect(()=>{
            if(state.email){
                setUserLoggedIn(true);
            }else{
                setUserLoggedIn(false);
            }
            }, [state.email]);
        
    return (
            <BrowserRouter>
                <UserContext.Provider value={contextValue} >
                <LoginContext.Provider value={{userLoggedIn, setUserLoggedIn}} >
                <LoadingContext.Provider value={{loading, setLoading}} >
                <AuthContext.Provider value={{isauth, setIsauth}} >

                <Navbar />
                <div className="container-fluid">
                    <div className="row no-gutters align-items-stretch">
                        <div className="col  col-lg-auto col-md-auto">
                            <Masonry  breakpointCols={breakpointColumnsObj} className="my-masonry-grid container" columnClassName="my-masonry-grid_column">
                        
                                <Routes>
                                    <Route path='/index.html' element={<><Homepage /> <Promotions /></>} />
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
                
                </AuthContext.Provider>
                </LoadingContext.Provider>
                </LoginContext.Provider>    
                </UserContext.Provider>
            </BrowserRouter>
    );
}

export default App;