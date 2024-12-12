import mongoose, {Schema, Document} from "mongoose";

export interface Message extends Document{
    content: string
    createAt: Date
}

// create schema 

const MessageSchema: Schema<Message> = new Schema({

        content:{
            type: String,
            required: true
        },
        createAt:{
            type: Date,
            required: true,
            default: Date.now
        }
})

// user define 

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isAcceptingMessage: boolean;
    message: Message[]
    
}

const UserSchema: Schema<User> = new Schema({

    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true       
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/, 'please use a valid email address']   
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    verifyCode: {
        type: String,
        required: [true, "VerifyCode is requierd"]
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verify code Expiry is required"]
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true,
    },
    message: [MessageSchema]

})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)


export default UserModel;