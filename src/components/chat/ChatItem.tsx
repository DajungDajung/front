import { JSX } from 'react';
import styled from 'styled-components';
import { ChatItemInfo } from '../../types/chat.type';
import { getImgSrc } from '../../utils/image';
import { formatNumber } from '../../utils/format';
import { useNavigate } from 'react-router-dom';

interface Props {
  item: ChatItemInfo;
}

function ChatItem({ item }: Props): JSX.Element {
  const navigate = useNavigate();

  return (
    <ChatItemStyle>
      <div className="chatitem_left">
        <img src={getImgSrc(item.itemImg)} alt="Item" />
        <p className="chatitem_title">{item.itemTitle}</p>
        <p className="chatitem_price">{formatNumber(item.itemPrice)}원</p>
      </div>
      <button onClick={() => navigate(`/items/${item.itemId}`)}>
        상품 보러가기
      </button>
    </ChatItemStyle>
  );
}

const ChatItemStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  padding: 0 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  .chatitem_left {
    display: flex;
    align-items: center;
    gap: 20px;

    img {
      width: 60px;
      border-radius: 5px;
    }

    .chatitem_title {
      font-size: 16px;
    }

    .chatitem_price {
      font-size: 16px;
      font-weight: bold;
    }
  }

  button {
    border: none;
    border-radius: 15px;
    background-color: #666;
    color: white;
    font-size: 16px;
    font-weight: 500;
    padding: 8px 48px;
    cursor: pointer;
  }
`;

export default ChatItem;
