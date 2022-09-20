import React, { createContext, useReducer} from 'react';

export const UserContext = createContext(null);
export const LoginContext = createContext(null);

export const istate = {
    users: [ {
    name: "Susan",
    email: "susan.engin@gmail.com",
    password: "secret22",
    balance: 100,
    isLoggedIn: false,
    isAdmin: true,
    userTransactions: ["Account Created, balance: $100.00"]
    }]
  }
 
export const reducer = (state, action) => {
    console.log("action", action);
    console.log(" reducer state", state);
    switch(action.type) {
      case 'ADD_USER':
        return [...state, action.payload];
      case 'DEPOSIT':
        let balance = action.payload.user[0].balance;
        let depositAmt = parseFloat(action.payload.deposit);
        balance += depositAmt;
        state.map((user)=>{if(user.name === action.payload.user[0].name){user.balance = balance, user.userTransactions.unshift(`$${depositAmt.toFixed(2)} Deposited, balance: $${balance.toFixed(2)}`)}});
        return [...state];
      case 'WITHDRAWAL':
        let balance1 = action.payload.user[0].balance;
        let withdrawalAmt= parseFloat(action.payload.withdrawal);
        balance1 -= withdrawalAmt;
        state.map((user)=>{if(user.name === action.payload.user[0].name){user.balance = balance1, user.userTransactions.unshift(`$${withdrawalAmt.toFixed(2)} Withdrew, balance: $${balance1.toFixed(2)}`)}});
        return [...state];
      case 'LOGIN':
        state.map((user)=>{
            if(user.email === action.payload.user[0].email){
                if (user.password===action.payload.user[0].password){
                    user.isLoggedIn=true;
                }else{user.isLoggedIn=false;}
            } else{user.isLoggedIn=false;}
        });
        return [...state];
      case 'LOGOUT':
        state.map((user)=>user.isLoggedIn=false);
        return [...state];
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