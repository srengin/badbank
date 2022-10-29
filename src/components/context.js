import React, { createContext, useReducer, useState} from 'react';
import { initializeApp } from 'firebase/app';
import {signInWithPopup, GoogleAuthProvider, getAuth} from 'firebase/auth';
import { createUserWithEmailAndPassword , onAuthStateChanged, signOut}  from 'firebase/auth';

import { resolvePath } from 'react-router-dom';





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
export const LoadingContext = createContext(null);
export const AuthContext = createContext(null);

export const user = {
     
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    balance: 0,
    admin: false,
    accountNum: "",
    transact: []
    
  }
 
export const reducer = (state, action) => {
    
    switch(action.type) {
      case 'VERIFYUSER':
        return action.payload.newState;
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
