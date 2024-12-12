import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";


// create schema 
const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request){
     
    // TODO : use this in all other routes --- optional case ---- in this Next js you don't need this case
    // if(request.method !== 'GET'){
    //    return Response.json({
    //       success: false,
    //      message: 'Method are not allowed',
    //    }, {status: 405})
    // }

    await dbConnect()

    // localhost:3000/api/cuu?username=name?phone=android --- this url denote this type url query
    try {
        const {searchParams} = new URL(request.url)
        // create object for params
        const queryParam = {
            username: searchParams.get('username')
        }
        // validate with zod
        const result = UsernameQuerySchema.safeParse(queryParam)
        console.log(result); // todo remove ---- see data
        if(!result.success){
            const usernameErrors = result.error.format()
                .username?._errors || []
                    return Response.json({
                        success: false,
                        message: usernameErrors?.length > 0 ? usernameErrors.join(',') : 'Invalid query parameter', 
                    }, {status: 400})                     
        }

        const {username} = result.data

      const exitingVerifiedUser = await UserModel.findOne({username, isVerified: true})

       if(exitingVerifiedUser){
        return Response.json({
            success: false,
            message: 'Username is already taken',

        }, {status: 400})
    }

      return Response.json({
        sucess: true,
        message: 'Username is must be unique',

      }, {status: 400})


    } catch (error) {
        console.error("Error checking username", error);
        return Response.json(
            {
               success: false,
               message: "Error checking username" 
            },
            {
                status: 500
            }
        )
    }
}





