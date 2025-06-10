import { JSX, useEffect, useState } from 'react';
import {
  ChatMessage as ChatMessageProps,
  ChatRoom as ChatRoomProps,
} from '../../types/chat.type';
import ChatItem from './ChatItem';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import { formatDate } from '../../utils/format';
import { Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { authRequest } from '../../api/axiosInstance';
import { ChatItemInfo } from '../../types/item.type';

interface Props {
  room: ChatRoomProps | null;
  socket: Socket | null;
  onRefreshRooms?: () => void;
}

function ChatRoomDetail({ room, socket, onRefreshRooms }: Props): JSX.Element {
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [chatItem, setChatItem] = useState<ChatItemInfo | null>(null);
  const navigate = useNavigate();

  const fetchMessages = async () => {
    if (!room) {
      return;
    }
    try {
      const data = await authRequest({
        method: 'GET',
        url: `/chats/${room.roomId}`,
        data: {},
        navigate,
      });

      try {
        setMessages(data.map(toCamelCase));
      } catch (setError) {
        console.error('setMessages 중 오류 발생:', setError);
      }

      if (data.length > 0) {
        const { item_id, item_title, item_price, item_img } = data[0];

        setChatItem({
          id: item_id,
          imgId: item_img,
          title: item_title,
          price: item_price,
        });
      } else if (room.itemInfo) {
        setChatItem({
          id: room.itemInfo.id,
          imgId: room.itemInfo.imgId,
          title: room.itemInfo.title,
          price: room.itemInfo.price,
        });
      }
    } catch (error) {
      console.error('채팅 메시지 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    if (!socket || !room) {
      return;
    }

    // 방 입장
    socket.emit('joinRoom', room.roomId);
    // 읽음 처리
    socket.emit('markAsRead', {
      room_id: room.roomId,
      user_id: room.userId,
    });

    return () => {
      // 방 퇴장
      socket.emit('leaveRoom', room.roomId);
    };
  }, [socket, room]);

  useEffect(() => {
    fetchMessages();
  }, [room]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleMessage = (msg: ChatMessageProps) => {
      console.log('서버에서 받은 메시지:', msg);
      setMessages((prev) => [...prev, msg]);
    };

    socket.on('chat message', handleMessage);

    return () => {
      socket.off('chat message', handleMessage);
    };
  }, [socket]);

  const handleSend = async (content: string) => {
    if (!socket || !room) {
      return;
    }

    const newMessage = {
      room_id: room.roomId,
      sender_id: room.meId,
      receiver_id: room.userId,
      contents: content,
    };

    socket.emit('sendMessage', newMessage);

    try {
      await fetchMessages();
    } catch (error) {
      console.error('fetchMessages 중 오류 발생:', error);
    }

    onRefreshRooms?.();
  };

  return (
    <ChatRoomDetailStyle>
      {room && (
        <>
          <div className="chat_item_area">
            {chatItem && <ChatItem item={chatItem} />}
          </div>
          <div className="message_area">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg.contents}
                isMine={msg.senderId !== msg.opponentId}
                time={formatDate(msg.createdAt)}
                profileImage={
                  msg.senderId !== msg.opponentId
                    ? msg.opponentImg
                    : msg.opponentImg
                }
              />
            ))}
          </div>
          <div className="chat_input_area">
            <ChatInput onSend={handleSend} />
          </div>
        </>
      )}
    </ChatRoomDetailStyle>
  );
}

const ChatRoomDetailStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;

  .chat_item_area {
    flex-shrink: 0;
  }

  .message_area {
    flex: 1;
    overflow-y: auto;
    height: 100%;
    min-height: 0;
    position: relative;
    z-index: 0;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .chat_input_area {
    position: sticky;
    bottom: 0;
    background: transparent;
    z-index: 1;
  }
`;

export default ChatRoomDetail;

function toCamelCase(msg: any): ChatMessageProps {
  return {
    id: msg.id,
    roomId: msg.room_id,
    senderId: msg.sender_id,
    receiverId: msg.receiver_id,
    contents: msg.contents,
    createdAt: msg.created_at,
    isRead: msg.is_read,
    opponentId: msg.opponent_id,
    opponentNickname: msg.opponent_nickname,
    opponentImg: msg.opponent_img,
    itemId: msg.item_id,
    itemTitle: msg.item_title,
    itemPrice: msg.item_price,
    itemImg: msg.item_img,
  };
}
