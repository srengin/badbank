import React, { useState, useContext, useReducer} from 'react';
import { UserContext, Card, reducer } from '../components/context.js';
import {auth, signInWithGoogle} from '../../server/config';
import { createUserWithEmailAndPassword , onAuthStateChanged, signOut}  from 'firebase/auth';

function CreateAccount(){
    const [showForm, setShowForm]       = React.useState(true);
    const [name, setName]       = React.useState("");
    const [email, setEmail]     = React.useState("");
    const [password, setPassword] = React.useState("");
    const [user, setUser] = useState({});

    const { state, dispatch, show } = useContext(UserContext);

    onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser);
    })

    const register = async ()=>{
        try {
            handleCreate();
            const user = await createUserWithEmailAndPassword(auth, email, password);
            setShowForm(false);
            console.log(user);
        }catch(error){
            console.log(error.message);
        }

    }

    const logout = async()=>{
        await signOut(auth);
    };

    function validate(field, label){
        if (!field){
            alert(`${label} cannot be empty`)
            return false;
        }else{
            if (label === 'password'){
               if(field.length < 8){
                alert("Please enter a password 8 characters or longer");
                return false;
               }

            }
        }
        return true;
    }

    function handleCreate(){
        event.preventDefault();
        console.log(name, email, password);
        
        if (!validate(name, 'name')) return;
        if (!validate(email, 'email')) return;
        if (!validate(password, 'password')) return;
        //const action = { type: 'ADD_USER', payload:{'name':name, 'email':email, 'password':password, 'balance':100, 'isAdmin':false, 'isLoggedIn': false, userTransactions: ['Account Created, balance: $100.00']} };
        
        setShowForm(false);
        //dispatch(action)
        function handle(){
            console.log(name,email,password);
            const url = `/account/create/${name}/${email}/${password}`;
            (async () => {
                var res  = await fetch(url);
                var data = await res.json();    
                console.log(data);        
            })();
            //props.setShow(false);
          }    
          handle();
    }

    function clearForm(){
        setName('');
        setEmail('');
        setPassword('');
        setShowForm(true);
    }

    console.log("Current User: ", auth.currentUser);
    function callAuthroute(){
        // call server with token
        auth.currentUser.getIdToken()
            .then((idToken)=>{
                console.log('idToken', idToken);
            
        (async ()=>{
            let response = await fetch('/auth', {
                method: "GET",
                headers: {
                    'Authorization': idToken
                }
            });
            let text = await response.text();
            console.log('response:', response);

        })();
    }).catch(e=>console.log('e:', e));
    }
    return(
        <Card
            bgcolor="success"
            header="Create Account"
            body={showForm ? (
                <>
                    Name<br/>
                    <input type="input" className="form-control" id="name" 
                    placeholder="Enter name" value={name} onChange = {e => {setName( e.target.value)}}/>
                    <br/>
                    Email<br/>
                    <input type="input" className="form-control" id="email" 
                    placeholder="Enter email" value={email} onChange = {e => {setEmail(e.target.value)}}/>
                    <br/>
                    Password<br/>
                    <input type="input" className="form-control" id="password" 
                    placeholder="Enter password" value={password} onChange = {e => {setPassword(e.target.value)}}/>
                    <br/>
                    <button type="submit" disabled={!name && !email && !password} className="btn btn-light" onClick={register}>Create Account</button>
                    <br/>
                    <button onClick={signInWithGoogle}>Sign In With Google</button>
                </>):
                (<>
                    <h5> Success {user?.email} registered</h5>
                    <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
                </>)
                }
        />
    );

}

export default CreateAccount;