import React, { useContext, useState } from 'react';
import { UserContext, Card, LoginContext, auth} from '../components/context.js';


function Withdrawal(){
    const {state, dispatch } = useContext(UserContext);
    const {userLoggedIn, setUserLoggedIn} = useContext(LoginContext);
    const [withdrawal, setWithdrawal] = useState("");
    const [showForm, setShowForm]       = React.useState(true);

    function validate(withdrawal1, balance1) {
        console.log("withdrawal", withdrawal1);
        console.log("State.balance", state.balance);
        if (isNaN(withdrawal1)){
            alert("Please input a number for a valid withdrawal");
            return false;
        }else if(parseFloat(withdrawal1)<0) {
            alert("Please enter a positive number for withdraw.");
            return false;
        }else if(parseFloat(withdrawal1) > balance1){
            alert("Overdraft Prevention: withdrawal amount is greater than balance");
            return false;
        }
        else return true;
    }

    function handleCreate(){
        event.preventDefault();
        if(!validate(withdrawal, state.balance)) return;
        var transact = `Withdrawal of ${withdrawal}.`
        try{
            const url = `https://ancient-coast-35441.herokuapp.com/account/updateAccount/${state.email}/${parseFloat(withdrawal)*-1}/${transact}`;
            let email = auth.currentUser.email;
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
            }catch(err){
              console.log("error2:", err);
            }
        
        setWithdrawal("");
        
    }
    console.log("state:", state);

    return(
        (userLoggedIn ?
        <Card
        bgcolor="success"
        txtcolor="white"
        header="Withdrawals"
        title= {`Hi ${state.name ? state.name : state.email}\nAccount Number: ${state.accountNum}\nYour Current Balance is: $${state.balance.toFixed(2)}`}
        text={``}
        body={ showForm ? (<form>Withdrawal<br/>
                    <input type="input" className="form-control" id="withdrawal" 
                    placeholder="withdrawal amount" value={withdrawal} onChange = {e => setWithdrawal(e.target.value)}/>
                    <br/>
                    <button type="submit" className="btn btn-light" disabled={!withdrawal} onClick={handleCreate}>Submit Withdrawal</button></form> ):
                    (<><h5>Success: Withdrawal completed.</h5>
                    <button type="submit" className="btn btn-light" onClick={()=>setShowForm(true)}>Make another withdrawal</button></>)}
            >
        </Card> :
        <h3>Please Login to Access Your Account</h3>)
        
    );

}


export default Withdrawal;