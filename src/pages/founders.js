import React from 'react';
import { UserContext, Card } from '../components/context.js';
import founders from '../pictures/founders.png';

function Founders(){
    const ctx = React.useContext(UserContext);  
    return(
     <Card 
        bgcolor="white"
        txtcolor="black"
        width="auto"
        header="A message from our Founders"
        title="Welcome to the Baddest bank"
        text="You can trust us with your money!"
        body={(<img src={founders} className="img-fluid " alt="responsive image"/>)}
     />
    );

}

export default Founders;