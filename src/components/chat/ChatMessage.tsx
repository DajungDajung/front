import styled from 'styled-components';
import { getImgSrc } from '../../utils/image';
import { JSX } from 'react';

interface ChatMessageProps {
  message: string;
  isMine: boolean;
  time: string;
  profileImage: number;
}

function ChatMessage({
  message,
  isMine,
  time,
  profileImage,
}: ChatMessageProps): JSX.Element {
  return (
    <ChatMessageStyle $isMine={isMine}>
      {!isMine && (
        <>
          <img
            className="profile"
            src={getImgSrc(profileImage)}
            alt="상대 프로필"
          />
          <div className="message_bubble">
            <p>{message}</p>
          </div>
          <span className="time">{time}</span>
        </>
      )}
      {isMine && (
        <>
          <span className="time">{time}</span>
          <div className="message_bubble">
            <p>{message}</p>
          </div>
          <img
            className="profile"
            src={getImgSrc(profileImage)}
            alt="내 프로필"
          />
        </>
      )}
    </ChatMessageStyle>
  );
}

const ChatMessageStyle = styled.div<{ $isMine: boolean }>`
  display: flex;
  align-items: flex-end;
  justify-content: ${({ $isMine }) => ($isMine ? 'flex-end' : 'flex-start')};
  margin: 16px;
  gap: 10px;

  .profile {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }

  .message_bubble {
    background-color: ${({ $isMine }) => ($isMine ? '#EC7FA9' : '#FFB8E0')};
    color: ${({ $isMine }) => ($isMine ? 'white' : 'black')};
    padding: 12px;
    border-radius: ${({ $isMine }) =>
      $isMine ? '20px 0 20px 20px' : '0 20px 20px 20px'};
    max-width: 60%;
    position: relative;

    p {
      margin: 0;
      font-size: 14px;
      word-break: break-word;
    }
  }
  .time {
    display: block;
    margin-top: 4px;
    font-size: 12px;
    text-align: right;
    color: gray;
  }
`;

export default ChatMessage;
