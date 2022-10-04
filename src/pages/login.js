import React, { useState, useContext} from 'react';

import { UserContext, Card, LoginContext } from '../components/context.js';
import { useReducer } from 'react';
import { signInWithEmailAndPassword , onAuthStateChanged, signOut}  from 'firebase/auth';
import {auth} from '../../server/config';

function Login(){
    const [email, setEmail]     = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showForm, setShowForm] = React.useState(true);


    const {state, dispatch} = React.useContext(UserContext);
    const {userLoggedIn, setUserLoggedIn} = React.useContext(LoginContext);
    
    const login= async ()=>{
        try {
            
            const user = await signInWithEmailAndPassword(auth, email, password);
            setShowForm(false);
            console.log(user);
            setShowForm(false);
        }catch(error){
            console.log(error.message);
        }

    }
    

    function validate(field, label){
        if (!field){
            alert(`Cannot leave ${label} field empty`)
            return false;
        }
        return true;
    }

   
    function handleCreate(){
        event.preventDefault();
        console.log("email and password", email, password);
        console.log("state: 2", state);
        if (!validate(email, 'email')) return;
        if (!validate(password, 'password')) return;
        let user = state.filter((item)=> item.email.toLowerCase() === email.toLowerCase().trim());
        console.log("user: ", user);
        if(user.length === 0){
            alert("Account not found, please click on Create an Account");
            clearForm();
            return;
        }else if(user[0].password != password){
            alert("Invalid password: please reenter.");
            clearForm();
            return;
        }
        const action = { type: 'LOGIN', payload: {user} };
        setUserLoggedIn(true);
        dispatch(action);
    }

    function clearForm(){
        setEmail('');
        setPassword('');
        
    }
    console.log("state in login", state);
    
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