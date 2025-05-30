import { JSX } from 'react';
import {
  ChatRoomDetail as ChatRoomDetailProps,
  ChatRoom as ChatRoomProps,
} from '../../types/chat.type';
import ChatItem from './ChatItem';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import { formatDate } from '../../utils/format';

const mockChatRoomDetail: ChatRoomDetailProps = {
  roomId: 1,
  item: {
    id: 101,
    title: '에어팟 프로',
    imageId: 101,
    price: 180000,
  },
  me: {
    id: 1,
    nickname: '내닉네임',
    profileImageId: 11,
  },
  other: {
    id: 2,
    nickname: '가나다',
    profileImageId: 22,
  },
  messages: [
    {
      id: 1,
      senderId: 2,
      content: '안녕하세요. 에어팟 아직 있나요?',
      createdAt: '2025-05-28T12:30:00',
    },
    {
      id: 2,
      senderId: 1,
      content: '네, 아직 판매 중이에요!',
      createdAt: '2025-05-28T12:31:10',
    },
    {
      id: 3,
      senderId: 2,
      content: '직거래 가능한가요?',
      createdAt: '2025-05-28T12:32:45',
    },
    {
      id: 4,
      senderId: 2,
      content: '안녕하세요. 에어팟 아직 있나요?',
      createdAt: '2025-05-28T12:30:00',
    },
    {
      id: 5,
      senderId: 1,
      content: '네, 아직 판매 중이에요!',
      createdAt: '2025-05-28T12:31:10',
    },
    {
      id: 6,
      senderId: 2,
      content: '직거래 가능한가요?',
      createdAt: '2025-05-28T12:32:45',
    },
    {
      id: 7,
      senderId: 2,
      content: '안녕하세요. 에어팟 아직 있나요?',
      createdAt: '2025-05-28T12:30:00',
    },
    {
      id: 8,
      senderId: 1,
      content: '네, 아직 판매 중이에요!',
      createdAt: '2025-05-28T12:31:10',
    },
    {
      id: 9,
      senderId: 2,
      content: '직거래 가능한가요?',
      createdAt: '2025-05-28T12:32:45',
    },
    {
      id: 10,
      senderId: 2,
      content: '안녕하세요. 에어팟 아직 있나요?',
      createdAt: '2025-05-28T12:30:00',
    },
    {
      id: 11,
      senderId: 1,
      content: '네, 아직 판매 중이에요!',
      createdAt: '2025-05-28T12:31:10',
    },
    {
      id: 12,
      senderId: 2,
      content: '직거래 가능한가요?',
      createdAt: '2025-05-28T12:32:45',
    },
    {
      id: 13,
      senderId: 2,
      content: '안녕하세요. 에어팟 아직 있나요?',
      createdAt: '2025-05-28T12:30:00',
    },
    {
      id: 14,
      senderId: 1,
      content: '네, 아직 판매 중이에요!',
      createdAt: '2025-05-28T12:31:10',
    },
    {
      id: 15,
      senderId: 2,
      content: '직거래 가능한가요?',
      createdAt: '2025-05-28T12:32:45',
    },
  ],
};

interface Props {
  room: ChatRoomProps | null;
}

function ChatRoomDetail({ room }: Props): JSX.Element {
  if (!room) {
    return <></>;
  }

  return (
    <ChatRoomDetailStyle>
      <div className="chat_item_area">
        <ChatItem item={mockChatRoomDetail.item} />
      </div>
      <div className="message_area">
        {mockChatRoomDetail.messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg.content}
            isMine={msg.senderId === mockChatRoomDetail.me.id}
            time={formatDate(msg.createdAt)}
            profileImage={
              msg.senderId !== mockChatRoomDetail.me.id
                ? mockChatRoomDetail.other.profileImageId
                : mockChatRoomDetail.me.profileImageId
            }
          />
        ))}
        <div className="chat_input_area">
          <ChatInput />
        </div>
      </div>
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
