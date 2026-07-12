
import { Request, Response } from "express"
import { errorHandler } from "../../utils/error-handler"
import { getMessages } from "./service"
import { getMessageSchema } from "./schema";

export const getMessagesController = async (req: Request, res: Response) => {
    try {
        const currentUserId = req?.user?.id;
        const receiverId = req?.params?.receiverId;
        const query ={
            senderId: currentUserId,
            receiverId: Number(receiverId)
        }
        console.log({query,p: req.params});

        const parsedData = await getMessageSchema.parseAsync(query)
        console.log({parsedData});

        const messages = await getMessages(parsedData)
        console.log({messages});
        
        res.status(200).json(messages)
    } catch (error) {
        errorHandler({ response: res, error })
    }
}