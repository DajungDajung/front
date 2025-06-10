import { JSX, useState } from 'react';
import styled from 'styled-components';

interface ChatInputProps {
  onSend: (message: string) => void;
}

function ChatInput({ onSend }: ChatInputProps): JSX.Element {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed) {
      return;
    }

    if (typeof onSend === 'function') {
      onSend(trimmed);
    } else {
      console.warn('onSend prop is not a function');
    }

    setMessage('');
  };

  return (
    <ChatInputStyle>
      <textarea
        placeholder="메시지를 입력하세요"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />
      <button onClick={handleSend}>전송</button>
    </ChatInputStyle>
  );
}

const ChatInputStyle = styled.div`
  padding: 16px;
  box-sizing: border-box;
  background-color: transparent;

  textarea {
    width: 100%;
    min-height: 80px;
    resize: none;
    padding: 16px 100px 16px 16px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 12px;
    font-size: 16px;
    outline: none;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.4);
  }

  button {
    position: absolute;
    top: 28px;
    right: 28px;
    background-color: #d9d9d9;
    border: none;
    border-radius: 10px;
    padding: 8px 24px;
    cursor: pointer;
    font-size: 14px;
  }
`;

export default ChatInput;
