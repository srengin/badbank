import React, { useContext, useState } from 'react';
import { UserContext, Card, LoginContext} from '../components/context.js';

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
        const action = { type: 'DEPOSIT', payload: { deposit} };
        dispatch(action);
        setDeposit("");
        setShowForm(false);
    }
    console.log("state:", state);

    return(
        (userLoggedIn ? 
        <Card
        bgcolor="success"
        txtcolor="white"
        header="Deposits"
        title= {`Hi ${state?.firstName}\nYour Current Balance is: $${state.balance}`}
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