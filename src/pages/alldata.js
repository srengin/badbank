import React, { useState, useContext } from 'react';
import { UserContext, LoginContext, Card } from '../components/context.js';

function Alldata(){
    const { state, show } = useContext(UserContext);
    const {userLoggedIn, setUserLoggedIn} = useContext(LoginContext);
    const user = state.filter((item)=> item.isLoggedIn);
    
    const [data, setData] = React.useState('');    
    /**
     *  (userLoggedIn ?
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
     */

    React.useEffect(() => {
        
        // fetch all accounts from API
        fetch('/account/all')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(JSON.stringify(data));                
            });

    }, []);

    return (<>
        <h5>All Data in Store:</h5>
        <p>Hello world {data}</p>
    

   
        <h3>Please Login to access your account Halloween Night</h3>)
        </>
    );

}

export default Alldata;