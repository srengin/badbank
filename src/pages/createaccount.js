import React, { useState, useContext, useEffect, useReducer, useLayoutEffect} from 'react';
import { UserContext, Card, reducer, auth, signInWithGoogle, callAuthRoute, LoginContext, provider} from '../components/context.js';
import { createUserWithEmailAndPassword , onAuthStateChanged, signOut, signInWithPopup}  from 'firebase/auth';

function CreateAccount(){
    const [showForm, setShowForm]       = useState(true);
    const [firstName, setFirstName]     = useState("");
    const [lastName, setLastName]       = useState("");
    const [phone, setPhone]             = useState("");
    const [email, setEmail]             = useState("");
    const [password, setPassword]       = useState("");
    
    
    const {userLoggedIn, setUserLoggedIn} = React.useContext(LoginContext);

    const { state, dispatch, show } = useContext(UserContext);

    /*useLayoutEffect(()=>{
    onAuthStateChanged(auth, (currentUser)=>{
        console.log("in UseEffect", currentUser);
      setUserLoggedIn(currentUser? true : false);
    });
    }, []);

   */
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
        
        if (!validate(firstName, 'firstName')) return;
        if (!validate(lastName, 'lastName')) return;
        if (!validate(phone, 'phone')) return;
        if (!validate(email, 'email')) return;
        if (!validate(password, 'password')) return;
        const action = { type: 'ADD_USER', payload:{'firstName':firstName, 'lastName':lastName, 'password':password, 'email':email, 'phone':phone,'balance':0, 'admin':false} };
        
        
        dispatch(action);
        setShowForm(false);
    }

    function clearForm(){
        setFirstName('');
        setLastName('');
        setPhone('');
        setEmail('');
        setPassword('');
        setShowForm(true);
        const action = { type: 'LOGOUT'};
        dispatch(action);
        setUserLoggedIn(false);
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

    return(
        <Card
            bgcolor="success"
            header="Create Account"
            body={showForm ? (
                <>
                    First Name<br/>
                    <input type="input" className="form-control" id="firstName" 
                    placeholder="Enter first name" value={firstName} onChange = {e => {setFirstName( e.target.value)}}/>
                    <br/>
                    Last Name<br/>
                    <input type="input" className="form-control" id="lastName" 
                    placeholder="Enter last name" value={lastName} onChange = {e => {setLastName( e.target.value)}}/>
                    <br/>
                    Phone Number<br/>
                    <input type="input" className="form-control" id="phone" 
                    placeholder="Enter phone number" value={phone} onChange = {e => {setPhone( e.target.value)}}/>
                    <br/>
                    Email<br/>
                    <input type="input" className="form-control" id="email" 
                    placeholder="Enter email" value={email} onChange = {e => {setEmail(e.target.value)}}/>
                    <br/>
                    Password<br/>
                    <input type="input" className="form-control" id="password" 
                    placeholder="Enter password" value={password} onChange = {e => {setPassword(e.target.value)}}/>
                    <br/>
                    <button type="submit" disabled={!firstName && !lastName && phone && !email && !password} className="btn btn-light" onClick={handleCreate}>Create Account</button>
                    <br/><br/>
                    <button className="btn btn-light" onClick={signInWithGoogle2}>Sign In With Google</button>
                </>):
                (<>
                    {userLoggedIn ? <h5> {state?.email} you are registered and logged in</h5> : <h5>Submitting...</h5>}
                    <button type="submit" className="btn btn-light" onClick={clearForm}>Logout and Create another account</button>
                </>)
                }
        />
    );

}

export default CreateAccount;