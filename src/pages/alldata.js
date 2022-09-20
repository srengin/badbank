import React, { useState, useContext } from 'react';
import { UserContext, LoginContext, Card } from '../components/context.js';

function Alldata(){
    const { state, show } = useContext(UserContext);
    const {userLoggedIn, setUserLoggedIn} = useContext(LoginContext);
    const user = state.filter((item)=> item.isLoggedIn);
    

    return( (userLoggedIn ?
        <div>
            <h1>All Data</h1>
            <div className="container-fluid">
                <div className="row">
          
            {user[0].isAdmin && state.map((user) => 
                <Card className="col-4"
                    bgcolor="success"
                    txtcolor="white"
                    header={user.name}
                    title= {`Current Balance: ${user.balance.toFixed(2)}`}
                    text="Transactions: "
                    body={user.userTransactions.map((transaction)=><p>{transaction}</p>)}
                >
                </Card>
                )} 
            {!user[0].isAdmin && <Card className="col-4"
                    bgcolor="success"
                    txtcolor="white"
                    header={user[0].name}
                    title= {`Current Balance: ${user[0].balance.toFixed(2)}`}
                    text="Transactions: "
                    body={user[0].userTransactions.map((transaction)=><p>{transaction}</p>)}
                >
                </Card>}
             
                </div>
            </div>
        </div> :
        <h3>Please Login to access your account</h3>)
    );

}

export default Alldata;