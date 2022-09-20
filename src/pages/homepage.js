import React from 'react';
import { UserContext, Card } from '../components/context.js';
import bank from '../pictures/bank.png';

function Homepage(){
    const ctx = React.useContext(UserContext);  
    return(
     <Card 
        bgcolor="success"
        txtcolor="white"
        header="Welcome to BadBank"
        title="Promotions"
        text="Currently, If you sign up for a new account we will deposit $100 directly in your account!"
        body={(<><img src={bank} className="img-fluid "  alt="responsive image"/></>)}
     />
    );

}

export default Homepage;