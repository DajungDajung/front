import { ChatItemInfo } from './item.type';

export interface ChatRoom {
  roomId: number;
  itemId: number;
  lastMessage: string;
  updatedAt: string;
  userId: number;
  nickname: string;
  imgId: number;
  meId: number;
  unreadCount: number;
  itemInfo?: ChatItemInfo;
}

export interface ChatMessage {
  id: number;
  roomId: number;
  senderId: number;
  receiverId: number;
  contents: string;
  createdAt: string;
  isRead: number;
  opponentId: number;
  opponentNickname: string;
  opponentImg: number;
  itemId: number;
  itemTitle: string;
  itemPrice: number;
  itemImg: number;
}

export interface ChatUser {
  id: number;
  nickname: string;
  profileImageId: number;
}

export interface ChatRoomDetail {
  roomId: number;
  item: ChatItemInfo;
  me: ChatUser;
  other: ChatUser;
  messages: ChatMessage[];
}
