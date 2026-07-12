
export type Message = {
  id: string;
  senderId: number;
  receiverId: number;
  text: string;
  createdAt: string;
  updatedAt?: string | null;
  isDeleted: boolean;
  deliveredAt: string | null;
  readAt: string | null;
};

export type SendMessagePayload = {
  senderId: number;
  receiverId: number;
  text: string;
};