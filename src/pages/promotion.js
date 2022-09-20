import React from 'react';
import { UserContext, Card } from '../components/context.js';
import cards from '../pictures/creditcards.png';

function Promotion(){
    const ctx = React.useContext(UserContext);  
    return(
     <Card 
        bgcolor="bg-light"
        txtcolor="black"
        header="Apply for a Bad Bank Credit Card"
        title="Interests rates as low as 29.99%"
        text="We will help you build up credit! The less money you have the more fees we charge!"
        body={(<img src={cards} className="img-fluid "  alt="responsive image"/>)}
     />
    );

}

export default Promotion;