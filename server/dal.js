import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import User from './schema.js';

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, (err)=>{
    if(err){
        console.log("Could not connect to DB error:", err);
    }else{
        console.log("connect to DB");
    }
});

// create user account
export async function create(firstName, lastName, phone, email, admin, transact){
    
    let accountNum=null;
    let user2 = null;
    do{
        let randNum = Math.floor(Math.random() * 1000000000);
        accountNum = String(randNum).padStart(9, '0');
        user2 = await User.findOne({accountNum})
                        .catch((err)=>{console.log("Create Account Num Error: ", err)});
    }while(user2)
    
    const user1 = await User.findOne({email})
                        .catch((err)=>{console.log("Find One Error: ", err)});
    
    
    const user = new User({
        firstName,
        lastName,
        phone,
        email,
        admin,
        balance:0,
        transact,
        accountNum
    });

    if(!user1){
        const newUser = await user.save()
                    .then(data=>{
                    console.log("This is the data ", data.toJSON());
                    return data;
                }).catch((err)=>{
                    console.log("This is another error" ,err);
                    return null; });
    
        return newUser;
        }else{
            return null;
        }
}

// read all users
export async function all(){
    const users = await User.find()
                    .catch((err)=>{
                        console.log("Error in Dal", err);
                        return null;
                    });
    return users;
}

// read/get a specific user's information
export async function findOne(email){
    const user = await User.findOne({email})
                        .catch((err)=>{
                            console.log("Find One Error: ", err);
                            return null;
                        })
    return user;
};

export async function updateAccount(email, amount){

    const user = await User.findOneAndUpdate(
        {email},
        { $inc: {balance:amount}},
        { returnDocument: 'after'}
    );
    return user;
};
