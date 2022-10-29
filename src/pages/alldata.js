import React, { useState, useContext } from 'react';
import { UserContext, LoginContext, Card, auth } from '../components/context.js';

function Alldata(){
    const { state, dispactch} = useContext(UserContext);
    const {userLoggedIn, setUserLoggedIn} = useContext(LoginContext);
    const [data, setData] = React.useState('');   
    
    React.useEffect(() => {
        if (state.admin){
        // fetch all accounts from API
       
            
// Authentication       
        const url = `https://ancient-coast-35441.herokuapp.com/account/all`;
            (async () => {
                auth.currentUser.getIdToken()
                    .then((idToken)=>{
                    
                    (async()=>{
                        var res  = await fetch(url, {
                            method: "GET",
                            headers: {
                            'authorization': idToken,
                            'Content-Type':'application/json',
                            'Access-Control-Allow-Origin':'*',
                            'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'
                             }
                            }).then(response => response.json())
                            .then(data => {
                        console.log("raw all data", data);
                        setData(data);                
                        });;
                      
                      
                    })();
                    
              })})();
              // end of Authentication
    }}, []);



    
   return (userLoggedIn ?
        <div>
            <h1>All Data</h1>
            <div className="container-fluid">
                <div className="row">
          
           
            {!state.admin && <Card className="col-4"
                    bgcolor="success"
                    txtcolor="white"
                    header={`${state?.email}\nAccount Number: ${state.accountNum}\nYour Current Balance is: $${state.balance}`}
                    title= {`Current Balance: ${state.balance.toFixed(2)}`}
                    text="Transactions: "
                    body={state.transact.slice(0).reverse().map((transaction)=><li key={transaction}>{transaction}</li>)}
                >
                </Card>}

                {data && data.map((user) => 
                <Card className="col-4"
                    bgcolor="success"
                    txtcolor="white"
                    header={`${user.email}\nAccount Number: ${user.accountNum}`}
                    title= {`Current Balance: ${user.balance.toFixed(2)}`}
                    text="Transactions: "
                    body={user.transact.slice(0).reverse().map((transaction)=><li >{transaction}</li>)}
                >
                </Card>
                )} 
               
             
                </div>
            </div>
        </div> : (<>
        <h3>Please Login to access your account</h3>
        </>)
    
   );
        }


export default Alldata;