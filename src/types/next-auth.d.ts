import  "next-auth";
import { DefaultSession } from "next-auth";

// directly decalre datatype for callbacks options
declare module 'next-auth' {
    interface User{
        _id?: string;
        isVerified?: boolean
        isAcceptingMessages?: boolean
        username?: string
    }

    interface session{
        user: {
            _id?: string;
            isVerified?: boolean
            isAcceptingMessages?: boolean
            username?: string

        } & DefaultSession['user'] // default session in asssuming key
    }
}

//  another way declare data type
declare module 'next-auth/jwt'{
    interface JWT{
        _id?: string;
        isVerified?: boolean
        isAcceptingMessages?: boolean
        username?: string
    }
}

