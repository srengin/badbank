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
            setUserLoggedIn(true);
            console.log(user);
        }catch(error){
            console.log(error.message);
        }

    }
    
    const signInWithGoogle2 = () => {
        signInWithPopup(auth, provider).then((result)=>{
            console.log("displayName", result.user.displayName);
            
            const name = String(result.user.displayName).split(' ');
            const action = { type: 'ADD_G_USER', payload:{'firstName': name[0], 'lastName':name[1], 'password':"N/A", 'email':result.user.email, 'balance':0, 'admin':false} };
            dispatch(action);
            setShowForm(false);
        }).catch((error)=>{
            console.log(error);
        });
      };

    function validate(field, label){
        if (!field){
            alert(`Cannot leave ${label} field empty`)
            return false;
        }
        return true;
    }

   
    function handleCreate(){
        event.preventDefault();
       
        
        
        
        const action = { type: 'LOGIN', payload: {user} };
        
        dispatch(action);
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
                    placeholder="Enter email" value={email} onChange = {e => setEmail(e.target.value)}/>
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