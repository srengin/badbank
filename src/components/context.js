import React, { createContext, useReducer} from 'react';
import { initializeApp } from 'firebase/app';
import {signInWithPopup, GoogleAuthProvider, getAuth} from 'firebase/auth';
import { createUserWithEmailAndPassword , onAuthStateChanged, signOut}  from 'firebase/auth';
//import * as dotenv from 'dotenv';
//dotenv.config();
import { resolvePath } from 'react-router-dom';



console.log(process.env.REACT_APP_FIREBASE_CONFIG);

// Initialize Firebase

const app = initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG));
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();



export const signInWithGoogle = () => {
  signInWithPopup(auth, provider).then((result)=>{
      const name = result.user.displayName;
      const email = result.user.email;
  }).catch((error)=>{
      console.log(error);
  });
};


export const UserContext = createContext(null);
export const LoginContext = createContext(null);

export const istate = {
    user:  {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    balance: 0,
    admin: false,
    transact: []
    }
  }
 
export const reducer = (state, action) => {
    
    switch(action.type) {
      case 'ADD_USER':
           // callAuthRoute();
          var firstName = action.payload.firstName;
          var lastName = action.payload.lastName;
          var phone = action.payload.phone;
          var email = action.payload.email;
          var admin = action.payload.admin;
          var password = action.payload.password;
          var transact = ["Account Created, balance: $0.00"];
          
          
          try{ (async ()=>{  
          const authUser = await createUserWithEmailAndPassword(auth, email, password);
          console.log("authUser", authUser);
          })()}catch(err){console.log("try this", err)}
          try{
          const url = `/account/create/${firstName}/${lastName}/${phone}/${email}/${admin}/${transact}`;
              (async () => {
                  var res  = await fetch(url);
                  var data = await res.json();    
                  console.log("data", data);        
              })();
          }catch(err){
            console.log("error2:", err);
          }
          const newUser = {firstName, lastName, phone, email, admin, transact}
        return newUser;
      case 'ADD_G_USER':
        var firstName = action.payload.firstName;
        var lastName = action.payload.lastName;
        var phone = "N/A";
        var email = action.payload.email;
        var admin = false;
        var transact = ["Account Created, balance: $0.00"];
        var balance = 0;
        try{
          const url = `/account/findOne/${email}`;
              (async () => {
                  var res  = await fetch(url);
                  if(res!==0){
                  console.log(res);
                  var data = await res.json();
                  console.log("hello gsignup", data); 
                  phone = data.phone;
                  transact = data.transact;
                  balance = data.balance;
                  }else{
                    try{
                      const url = `/account/create/${firstName}/${lastName}/${phone}/${email}/${admin}/${transact}`;
                          (async () => {
                              var res  = await fetch(url);
                              var data = await res.json();    
                              console.log("data545454", data);        
                          })();
                      }catch(err){
                        console.log("error2:", err);
                      }
                    }
                 
        })()}catch(err){console.log(err)};
        
          
    
          const  newUser2 = {firstName, lastName, email, admin, transact, balance};
        return newUser2;
      case 'DEPOSIT':
        
        let depositAmt = parseFloat(action.payload.deposit);
        let amount = depositAmt;
        let transact1=`$${depositAmt} Deposited.`;
        try{
          const url = `/account/updateAccount/${state.email}/${amount}`;
              (async () => {
                  var res  = await fetch(url);
                  var data = await res.json();    
                  console.log("data", data);   
                  ({firstName, lastName, phone, email, balance, admin, transact} = data);
              })();
          }catch(err){
            console.log("error2:", err);
          }
        return {firstName,lastName,phone,email,balance,admin,transact};
      case 'WITHDRAWAL':
        let balance1 = action.payload.user[0].balance;
        let withdrawalAmt= parseFloat(action.payload.withdrawal);
        balance1 -= withdrawalAmt;
        state.map((user)=>{if(user.name === action.payload.user[0].name){user.balance = balance1, user.userTransactions.unshift(`$${withdrawalAmt.toFixed(2)} Withdrew, balance: $${balance1.toFixed(2)}`)}});
        return [...state];
      case 'LOGIN':
        
        return state;
      case 'VERIFYUSER':
          state = action.payload
              
          return state;  
              
            
       
      case 'LOGOUT':
        
          
          signOut(auth).then(() => {
            console.log("signout successful");
          }).catch((error) => {
            console.log(error);
          });
          
        
        let newState={};
        return newState;
        
      default:
        return state;
    }
  }



export function Card(props){
    function classes(){
        const txt = props.txtcolor ? ' text-' + props.txtcolor : ' text-black';
        return 'card mb-3  text-center m-3 p-0 border-0 no-gutters'  + txt;
    }

    const bg = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
    const width = props.width ? props.width : "18rem";

    return(
        <div className={classes()}  style={{maxWidth: `${width}`}}>
            <h5 className={"card-header " + bg}>{props.header}</h5>
            <div className={"card-body " + bg +" bg-opacity-50"} >
                {props.title && (<h5 className="card-title" style={{whiteSpace:'pre-wrap'}}>{props.title}</h5>)}
                {props.text && (<p className="card-text" >{props.text}</p>)}
                {props.body}
                {props.status && (<div id='createStatus'>{props.status}</div>)}
            </div>
        </div>
        );
}

export function callAuthRoute(){
  // call server with token
  auth.currentUser.getIdToken()
      .then((idToken)=>{
          console.log('idToken******', idToken);
      
 (async ()=>{
  console.log("55");
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


function verifyUser(){
  (async()=>{
    state= await new Promise((resolve,reject)=>{
      auth.currentUser.getIdToken()
      .then((idToken)=>{      
        (async ()=>{
                  let response = await fetch('/auth', {
                  method: "GET",
                  headers: {
                      'authorization': idToken
                  }
                  
              });
              resolve(await response.json());
              
              
            })();
          }).then((result)=>{
            (async()=>{
            if(result?.auth){
              const email = result.email;
              const url = `/account/findOne/${email}`;
      
              var res  = await fetch(url);
              var data = await res.json();    
              console.log("data weird", data); 
              const{firstName, lastName, phone, balance, transact, admin} = data;
                resolve({firstName, lastName, phone, email, balance, transact});       
            }else{
              reject()
        }})();})
        
        
        })
        
        
        
        })();
}