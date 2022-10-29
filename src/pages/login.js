import React, { useState, useContext} from 'react';


import { UserContext, Card, LoginContext, auth, provider } from '../components/context.js';
import { useReducer } from 'react';
import { signInWithEmailAndPassword , signInWithPopup, onAuthStateChanged, signOut}  from 'firebase/auth';
//import {auth} from '../../server/config';

function Login(){
    const [email, setEmail]     = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showForm, setShowForm] = React.useState(true);


    const {state, dispatch} = React.useContext(UserContext);
    const {userLoggedIn, setUserLoggedIn} = React.useContext(LoginContext);
    
    const login= async ()=>{
        try {
            if (!validate(email, 'email')) return;
            if (!validate(password, 'password')) return;
            const user = await signInWithEmailAndPassword(auth, email, password);
            setShowForm(false);
            console.log(user);
        }catch(error){
            console.log(error.message);
        }

    }
    
    const signInWithGoogle2 = () => {
        signInWithPopup(auth, provider).then((result)=>{
            console.log("displayName", result.user.displayName);
            console.log("result", result);
            var admin = false;
            var transact = "Account Created."
            var phone = "na";
            var fname = "na";
            var lname = "na";
            
            const name = String(result.user.displayName).split(' ');
            if (name.length>1){
                fname = name[0];
                lname = name[1];
            }else if(name.length ==1){
                fname = name[0];
            }
            const url = `https://ancient-coast-35441.herokuapp.com/create/${fname}/${lname}/${phone}/${result.user.email}/${admin}/${transact}`;
            try{
                (async ()=>{
                var res  = await fetch(url);
                var newState = await res.json(); 
    
            if (!newState.error){
                console.log("data", newState); 
                const action = { type: 'VERIFYUSER', payload: {newState}};
                dispatch(action); 
            }
                setShowForm(false);

            })();
        }catch(err){
            console.log(err);
            setResponse("There was an Error")};         
            
        }).catch((error)=>{
            console.log(error);
            setResponse("There was an Error signing up.")});
        };
        

    function validate(field, label){
        if (!field){
            alert(`Cannot leave ${label} field empty`)
            return false;
        }
        return true;
    }

   
   

    function clearForm(){
        setEmail('');
        setPassword('');
        
    }
   
    
    function resetAndLogout() {
        const action = {type: 'LOGOUT'};
        dispatch(action);
        clearForm();
        setUserLoggedIn(false); //
    };

    
    
    return(
        <Card
            bgcolor="success"
            header="Login"
            body={!userLoggedIn ? (
                <>
                    Email<br/>
                    <input type="input" className="form-control" id="email" 
                    placeholder="Enter email" value={email} onChange = {e => setEmail(e.target.value.toLowerCase())}/>
                    <br/>
                    Password<br/>
                    <input type="input" className="form-control" id="password" 
                    placeholder="Enter password" value={password} onChange = {e => setPassword(e.target.value)}/>
                    <br/>
                    <button type="submit" className="btn btn-light" onClick={login}>Login</button>
                    <br/><br/>
                    <button className="btn btn-light" onClick={signInWithGoogle2}>LogIn With Google</button>
                   
                </>):
                (<>
                    <h5>Success. You are logged in.</h5>
                    <button type="submit" className="btn btn-light" onClick={resetAndLogout}>Logout</button>
                </>)
                }
        />
    );

}

export default Login;