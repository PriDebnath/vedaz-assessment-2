import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { socket } from "@/lib/socket-io";
import { env } from "@/enviroments/env";

import type { Message, SendMessagePayload } from "../types";

export function useChat(currentUserId: number) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handler = (message: Message) => {
      // Ignore deleted messages if your backend ever emits them
      if (message.isDeleted) return;

      // Determine which conversation this message belongs to
      const otherUserId =
        message.senderId === currentUserId
          ? message.receiverId
          : message.senderId;

      queryClient.setQueryData<Message[]>(
        ["messages", otherUserId],
        (old = []) => {
          // Prevent duplicates
          if (old.some((m) => m.id === message.id)) {
            return old;
          }

          return [...old, message];
        },
      );
    };

    socket.on(env.VITE_SOCKET_MESSAGE_EVENT_NAME, handler);

    return () => {
      socket.off(env.VITE_SOCKET_MESSAGE_EVENT_NAME, handler);
    };
  }, [currentUserId, queryClient]);

  function sendMessage(payload: SendMessagePayload) {
    socket.emit(env.VITE_SOCKET_MESSAGE_EVENT_NAME, payload);
  }

  return {
    sendMessage,
  };
}