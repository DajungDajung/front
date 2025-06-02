export interface ChatRoom {
  id: number;
  nickname: string;
  profileImageId: number;
  itemTitle: string;
  updatedAt: string;
  isRead: boolean;
}

export interface ChatMessage {
  id: number;
  senderId: number;
  content: string;
  createdAt: string;
}
export interface ChatUser {
  id: number;
  nickname: string;
  profileImageId: number;
}

export interface ChatItemInfo {
  id: number;
  title: string;
  imageId: number;
  price: number;
}

export interface ChatRoomDetail {
  roomId: number;
  item: ChatItemInfo;
  me: ChatUser;
  other: ChatUser;
  messages: ChatMessage[];
}
