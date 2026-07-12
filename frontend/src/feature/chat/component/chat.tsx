import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SendHorizontal } from "lucide-react";

import { useChat } from "../hook/use-chat";
import { useGetMessages } from "../hook/use-get-messages.hook";

import type { User } from "../hook/use-get-users.hook";
import type { Message } from "../types";

interface Props {
  user: User;
  currentUser: User;
  open: boolean;
}

export default function Chat({
  user,
  currentUser,
  open,
}: Props) {
  const [message, setMessage] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);

  const { messages, isPending } = useGetMessages(
    user.id,
    open,
  );

  const { sendMessage } = useChat(currentUser.id);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  function handleSend() {
    const text = message.trim();

    if (!text) return;

    sendMessage({
      senderId: currentUser.id,
      receiverId: user.id,
      text,
    });

    setMessage("");
  }

  return (
    <div className="flex h-[75vh] flex-col">
      {/* Header */}
      <div className="border-b px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
              {user.name[0].toUpperCase()}
            </div>

            <span
              className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                user.active
                  ? "bg-green-500"
                  : "bg-gray-400"
              }`}
            />
          </div>

          <div>
            <h2 className="font-semibold">{user.name}</h2>

            <p className="text-sm text-muted-foreground">
              {user.active ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto bg-muted/20 p-5">
        {isPending ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Loading messages...
          </div>
        ) : (
          <>
            <AnimatePresence>
              {messages.map((msg) => {
                const mine =
                  msg.senderId === currentUser.id;

                return (
                  <motion.div
                    key={msg.id}
                    layout
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className={`flex ${
                      mine
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                        mine
                          ? "bg-primary text-primary-foreground"
                          : "border bg-background"
                      }`}
                    >
                      <p>{msg.text}</p>

                      <p className="mt-1 text-right text-[10px] opacity-60">
                        {new Date(
                          msg.createdAt,
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
              {
                messages?.length == 0  &&( <p className="text-center">No messages...</p>)
              }
            </AnimatePresence>

            <div ref={bottomRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="border-t bg-background p-4">
        <div className="flex items-center gap-3">
          <input
            className="flex-1 rounded-full border bg-muted px-5 py-3 outline-none focus:ring-2 focus:ring-primary"
            placeholder="Type a message..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
          />

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
            className="rounded-full bg-primary p-3 text-primary-foreground"
          >
            <SendHorizontal size={18} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}