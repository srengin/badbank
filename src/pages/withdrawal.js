import React, { useContext, useState } from 'react';
import { UserContext, Card, LoginContext} from '../components/context.js';

function Withdrawal(){
    const {state, dispatch } = useContext(UserContext);
    const {userLoggedIn, setUserLoggedIn} = useContext(LoginContext);
    const user = state.filter((item)=> item.isLoggedIn);
    const [withdrawal, setWithdrawal] = useState("");
    const [showForm, setShowForm]       = React.useState(true);

    function validate(withdrawal1, balance1) {
        console.log("withdrawal", withdrawal1);
        console.log("user.balance", user.balance);
        if (isNaN(withdrawal1)){
            alert("Please input a number for a valid withdrawal");
            return false;
        }else if(parseFloat(withdrawal1)<0) {
            alert("Please enter a positive number for withdraw.");
            return false;
        }else if(parseFloat(withdrawal1) > balance1){
            console.log("Hello why isn't it reading the alret");
            alert("Overdraft Prevention: withdrawal amount is greater than balance");
            return false;
        }
        else return true;
    }

    function handleCreate(){
        event.preventDefault();
        if(!validate(withdrawal, user[0].balance)) return;
        const action = { type: 'WITHDRAWAL', payload: {user, withdrawal} };
        dispatch(action);
        setWithdrawal("");
        setShowForm(false);
    }
    console.log("state:", state);

    return(
        (userLoggedIn ?
        <Card
        bgcolor="success"
        txtcolor="white"
        header="Withdrawals"
        title= {`Hi ${user[0].name}\nYour Current Balance is: $${user[0].balance}`}
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