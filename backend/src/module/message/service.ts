import { db } from "../../database/connection";
import { table } from "../../database/model";
import { and, eq, or, asc } from "drizzle-orm";
import { GetMessage } from "./schema";

export const  getMessages = async (param: GetMessage) =>{
    const {senderId, receiverId} = param
    const messages = await db
      .select()
      .from(table.messages)
      .where(
        and(
          or(
            and(
              eq(table.messages.senderId, senderId),
              eq(table.messages.receiverId, receiverId),
            ),
            and(
              eq(table.messages.senderId, receiverId),
              eq(table.messages.receiverId, senderId),
            ),
          ),
          eq(table.messages.isDeleted, false),
        ),
      )
      .orderBy(asc(table.messages.createdAt));

    return messages
}