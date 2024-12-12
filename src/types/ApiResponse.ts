import { Message } from "postcss";

export interface ApiResponse{
    success: any;
    succesee: boolean;
    message: string;
    isAcceptingMessages?: boolean
    messages?: Array<Message>
}