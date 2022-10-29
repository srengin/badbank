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
    const [response, setResponse]       = useState("Submitting...");
    
    
    const {userLoggedIn, setUserLoggedIn} = React.useContext(LoginContext);

    const { state, dispatch } = useContext(UserContext);

  
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

    useEffect(()=>{
        setShowForm(!userLoggedIn);
        }, [userLoggedIn]);
    

    function handleCreate(){
        event.preventDefault();
        
        if (!validate(firstName, 'firstName')) return;
        if (!validate(lastName, 'lastName')) return;
        if (!validate(phone, 'phone')) return;
        if (!validate(email, 'email')) return;
        if (!validate(password, 'password')) return;
        var transact = ["Account Created, balance: $0.00"];
        var admin=false;

        try{ (async ()=>{  
            let error = "";
            const authUser = await createUserWithEmailAndPassword(auth, email, password).catch((err)=>{
                setResponse("There is already an account associated with this email, please login.")});
                console.log("authUser", authUser);
                if(authUser){
                const url = `https://ancient-coast-35441.herokuapp.com/create/${firstName}/${lastName}/${phone}/${email}/${admin}/${transact}`;
                    var res  = await fetch(url);
                    var newState = await res.json();    
                    console.log("data", newState); 
                    if(res.ok){
                    const action = { type: 'VERIFYUSER', payload: {newState}};
                    dispatch(action); 
                    }else{
                        const action = {type: 'LOGOUT'};
                        dispatch(action);
                        setUserLoggedIn(false); 
                        setResponse("Unable to make an account, contact administrator")
                    }
                }       
                })();
            }catch(err){
              console.log("error creating account:", err);
            }
            
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
        setResponse("Submitting...");
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
                    placeholder="Enter email" value={email} onChange = {e => {setEmail(e.target.value.toLowerCase())}}/>
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
                    
                    {userLoggedIn ? <h5> {state.email} your account number is {state.accountNum}</h5> : <h5>{response} </h5>}
                    <button type="submit" className="btn btn-light" onClick={clearForm}>Create another account</button>
                </>)
                }
        />
    );

}

export default CreateAccount;