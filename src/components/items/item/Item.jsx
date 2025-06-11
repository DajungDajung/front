import React from 'react';
import './Item.css';
import sampleImg from '../../../assets/sampleImg.svg';
import { getDaysAgo } from '../../../utils/date';
import { useNavigate } from 'react-router-dom';
import { getImgSrc } from '../../../utils/image.js';
import { formatNumber } from '../../../utils/format';

const Item = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      className="item_container"
      onClick={() => navigate(`/items/${item.id}`)}
    >
      <img
        src={item.img_id ? getImgSrc(item.img_id) : sampleImg}
        width={220}
        height={220}
      />

      <p className="item_title">{item.title}</p>
      <div className="item_subContent">
        <p className="item_price">{formatNumber(item.price)}원</p>
        <p className="item_date">{getDaysAgo(item.created_at)}</p>
      </div>
    </div>
  );
};

export default Item;
