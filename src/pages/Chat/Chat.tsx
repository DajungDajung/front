import styled from 'styled-components';
import ChatRoom from '../../components/chat/ChatRoom';
import ChatRoomDetail from '../../components/chat/ChatRoomDetail';
import React, { JSX, useState } from 'react';
import { ChatRoom as ChatRoomProps } from '../../types/chat.type';

const mockChatRoom: ChatRoomProps[] = [
  {
    id: 1,
    nickname: '가나다',
    itemTitle: '에어팟',
    updatedAt: '2025-05-28 19:33:55',
    profileImageId: 1,
    isRead: false,
  },
  {
    id: 2,
    nickname: '마바사',
    itemTitle: '책상',
    updatedAt: '2025-05-24 19:33:55',
    profileImageId: 1,
    isRead: true,
  },
  {
    id: 3,
    nickname: '아자차',
    itemTitle: '신발',
    updatedAt: '2025-05-20 19:33:55',
    profileImageId: 1,
    isRead: true,
  },
];

function Chat(): JSX.Element {
  const [selectedRoom, setSelectedRoom] = useState<ChatRoomProps | null>(null);

  const handleSelectRoom = (room: ChatRoomProps): void => {
    setSelectedRoom(room);
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>): void => {
    const clickedElement = e.target as HTMLElement;

    if (
      clickedElement.closest('.chat_room_list') ||
      clickedElement.closest('.chat_room_detail')
    ) {
      return;
    }

    setSelectedRoom(null);
  };

  return (
    <ChatStyle onClick={handleClickOutside}>
      <div className="chat_left">
        <div className="chat_room_list">
          <ChatRoom
            rooms={mockChatRoom}
            onSelect={handleSelectRoom}
            selectedRoomId={selectedRoom?.id ?? null}
          />
        </div>
      </div>
      <div className="chat_room_detail">
        <ChatRoomDetail room={selectedRoom} />
      </div>
    </ChatStyle>
  );
}

const ChatStyle = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 80px - 35px);
  margin-top: 60px;

  .chat_left {
    width: 30%;
    min-width: 320px;
    max-width: 400px;
    border-left: 1px solid rgba(0, 0, 0, 0.2);
    border-right: 1px solid rgba(0, 0, 0, 0.2);
    height: 100%;
  }

  .chat_room_detail {
    width: 100%;
    height: 100%;
  }
`;

export default Chat;
