import z from "zod";
import { messages } from "./model";


export type Message = typeof messages.$inferSelect

export const createMessageShema = z.object({
    receiverId: z.number(),
    senderId: z.number(),
    text: z.string(),
}) satisfies z.ZodType<typeof messages.$inferInsert>



export const getMessageSchema = createMessageShema.omit({
    text: true
})

export type GetMessage = z.infer<typeof getMessageSchema>