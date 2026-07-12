

import { messages } from "../../module/message/model";
import { users } from "../../module/user/model";

export const table = {
    users,
    messages
} as const

export type Table = typeof table

export { 
    users ,
    messages,
// 
}  // drizzle look at it to maintain migration