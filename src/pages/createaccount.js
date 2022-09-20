import React, { useState, useContext, useReducer} from 'react';
import { UserContext, Card, reducer } from '../components/context.js';


function CreateAccount(){
    const [showForm, setShowForm]       = React.useState(true);
    const [name, setName]       = React.useState("");
    const [email, setEmail]     = React.useState("");
    const [password, setPassword] = React.useState("");

    const { state, dispatch, show } = useContext(UserContext);

    
  

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
        const action = { type: 'ADD_USER', payload:{'name':name, 'email':email, 'password':password, 'balance':100, 'isAdmin':false, 'isLoggedIn': false, userTransactions: ['Account Created, balance: $100.00']} };
        
        setShowForm(false);
        dispatch(action)
    }

    function clearForm(){
        setName('');
        setEmail('');
        setPassword('');
        setShowForm(true);
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
                    <button type="submit" disabled={!name && !email && !password} className="btn btn-light" onClick={handleCreate}>Create Account</button>
                </>):
                (<>
                    <h5> Success</h5>
                    <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
                </>)
                }
        />
    );

}

export default CreateAccount;