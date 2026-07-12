import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";


import type { Message, SendMessagePayload } from "../types";


const getMessages = (userId: number) =>
  apiClient<Message[]>(`/api/v1/messages/${userId}`, {
    method: "GET",
  });

export function useGetMessages(
  userId: number,
  enabled: boolean,
) {
  const query = useQuery({
    queryKey: ["messages", userId],
    queryFn: () => getMessages(userId),
    enabled,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 30, // 30 minutes
  });

  return {
    ...query,
    messages: query.data ?? [],
  };
}