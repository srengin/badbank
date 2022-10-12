import { stringLength } from '@firebase/util';
import mongoose from 'mongoose';


const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    phone: String,
    email: {
        type: String,
        required: true,
    },
    balance: Number,
    admin: {
        type: Boolean,
        default: false,
    },
    transact: [String],
    accountNum: String,

})

export default mongoose.model('User', userSchema);