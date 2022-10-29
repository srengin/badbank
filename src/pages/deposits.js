import React, { useContext, useState } from 'react';
import { UserContext, Card, LoginContext, auth} from '../components/context.js';

function Deposits(){
    const {state, dispatch} = useContext(UserContext);
   
    const [deposit, setDeposit] = useState("");
    const [showForm, setShowForm]       = React.useState(true);
    const {userLoggedIn, setUserLoggedIn} = useContext(LoginContext);

    function validate (depositAmt) {
        if (isNaN(depositAmt)){
            alert("Please input a number for a valid deposit");
            return false;

        }else if(parseFloat(depositAmt)<0) {
            alert("Please enter a positive number for a deposit.");
            return false;
        }
        else return true;
    }
    function handleCreate(){
        event.preventDefault();
        if(!validate(deposit)) return;
        var transact = `Deposit of ${deposit}.`
        try{
            const url = `https://ancient-coast-35441.herokuapp.com/account/updateAccount/${state.email}/${parseFloat(deposit)}/${transact}`;
            // Add Authentication
            
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
                            });
                      
                      let newState= await res.json();   
                      if (newState.auth===false){
                        var action = { type: 'LOGOUT'};
                        dispatch(action);
                      }else{
                      console.log("data in verify user", newState);  
                      var action = { type: 'VERIFYUSER', payload: {newState}};
                      dispatch(action);  
                      setShowForm(false);
                      }
                    })();
                    
              })})();
        //end Add Auth
        
                
            }catch(err){
              console.log("error2:", err);
            }
        setDeposit("");
        
    }
    console.log("state:in deposit", state);

    return(
        (userLoggedIn ? 
        <Card
        bgcolor="success"
        txtcolor="white"
        header="Deposits"
        title= {`Hi ${state?.email}\nAccount Number: ${state.accountNum}\nYour Current Balance is: $${state.balance.toFixed(2)}`}
        text={``}
        body={showForm ? (<form>Deposit<br/>
                    <input type="input" className="form-control" id="deposit" 
                    placeholder="deposit amount" value={deposit} onChange = {e => setDeposit(e.target.value)}/>
                    <br/>
                    <button type="submit" disabled={!deposit} className="btn btn-light" onClick={handleCreate}>Submit Deposit</button></form>)
                    : (<><h5>Success: Deposit completed.</h5>
                    <button type="submit" className="btn btn-light" onClick={()=>setShowForm(true)}>Make another deposit</button></>)}
            >
        </Card>:
        <h3>Please Login to Access your account.</h3>)
        
    );

}

export default Deposits;