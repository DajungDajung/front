import { JSX } from 'react';
import styled from 'styled-components';
import { getImgSrc } from '../../utils/image';
import { formatNumber } from '../../utils/format';
import { useNavigate } from 'react-router-dom';
import { ChatItemInfo } from '../../types/item.type';

interface Props {
  item: ChatItemInfo;
}

function ChatItem({ item }: Props): JSX.Element {
  const navigate = useNavigate();

  return (
    <ChatItemStyle>
      <div className="chatitem_left">
        <img src={getImgSrc(item.imgId)} alt="Item" />
        <p className="chatitem_title">{item.title}</p>
        <p className="chatitem_price">{formatNumber(item.price)}원</p>
      </div>
      <button onClick={() => navigate(`/items/${item.id}`)}>
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
  position: relative;
  z-index: 1;

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
