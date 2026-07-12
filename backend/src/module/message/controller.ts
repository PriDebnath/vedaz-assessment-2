
import { Request, Response } from "express"
import { errorHandler } from "../../utils/error-handler"
import { getMessages } from "./service"
import { getMessageSchema } from "./schema";

export const getMessagesController = async (req: Request, res: Response) => {
    try {
        const currentUserId = req?.user?.id;
        const otherUserId = req.params.userId;
        const parsedData = await getMessageSchema.parseAsync({
            senderId: currentUserId,
            receiverId: otherUserId
        })
        const messages = await getMessages(parsedData)
        res.status(200).json(messages)
    } catch (error) {
        errorHandler({ response: res, error })
    }
}