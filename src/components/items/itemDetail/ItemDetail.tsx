import React, { JSX, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authRequest } from '../../../api/axiosInstance.js';
import { getComments } from '../../../api/commentsApi';
import { deleteItem, getItemDetail } from '../../../api/itemsApi';
import likeIcon from '../../../assets/ic_like.svg';
import unLikeIcon from '../../../assets/ic_unlike.svg';
import sampleImg from '../../../assets/sampleImg.svg';
import { getDaysAgo } from '../../../utils/date.js';
import { formatNumber } from '../../../utils/format.js';
import { getImgSrc } from '../../../utils/image.js';
import Comments from '../comments/Comments';
import './ItemDetail.css';
import { Comment } from '../../../types/comment.type.js';
import { ItemDetail as ItemDetailProps } from '../../../types/item.type.js';
import { Seller } from '../../../types/user.type.js';
import camelcaseKeys from 'camelcase-keys';

function ItemDetail(): JSX.Element {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<ItemDetailProps>();
  const [seller, setSeller] = useState<Seller>();
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isSeller, setIsSeller] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);

  const handleEdit = (id: number): void => {
    navigate(`/items/edit/${id}`, { state: { item, isEdit: true } });
  };

  const fetchCommentData = useCallback(async () => {
    try {
      const response = await getComments(id);
      setComments(camelcaseKeys(response.data));
      console.log(response.data);
    } catch (err) {
      console.error('댓글 가져오기 실패:', err);
    }
  }, [id]);

  useEffect(() => {
    const fetchItemDetailData = async () => {
      try {
        const response = await getItemDetail(id);
        const camelizedItem = camelcaseKeys(response.data.item, { deep: true });
        setItem(camelizedItem);
        setSeller(camelcaseKeys(response.data.user));
        setIsLike(response.data.item.liked === 'true');
        setIsSeller(response.data.item.seller === 'true');
      } catch (error) {
        console.log('상품 상세 조회 에러 : ', error);
      }
    };

    fetchItemDetailData();
    fetchCommentData();
  }, [id, fetchCommentData]);

  const handleLikeButton = async (item_id: number, retryCount = 0) => {
    try {
      const method = isLike ? 'delete' : 'post';
      const url = `/users/likes/${item_id}`;
      await authRequest({ method, url, navigate });
      setIsLike(!isLike);

      setItem((prev) =>
        prev ? { ...prev, like: isLike ? prev.like - 1 : prev.like + 1 } : prev,
      );
    } catch (error: any) {
      console.error(`좋아요 처리 실패 (재시도 ${retryCount}회):`, error);

      if (retryCount < 2) {
        setTimeout(() => handleLikeButton(item_id, retryCount + 1), 1000);
      } else {
        console.error(
          '좋아요 처리 에러:',
          error.response?.data || error.message,
        );
      }
    }
  };

  const handleDelete = async (id: number, retryCount = 0) => {
    try {
      const doDelete = window.confirm('상품을 삭제하시겠습니까?');
      if (doDelete) {
        await deleteItem(id);
        navigate('/');
      }
    } catch (error) {
      console.error(`상품 삭제 실패 (재시도 ${retryCount}회):`, error);

      if (retryCount < 2) {
        setTimeout(() => handleDelete(id, retryCount + 1), 1000);
      } else {
        console.error('상품 삭제 에러 : ', error);
      }
    }
  };

  const handleChat = async (retryCount = 0) => {
    if (!item || !seller) {
      return;
    }

    try {
      await authRequest({
        method: 'POST',
        url: '/chats',
        data: {
          opponent_id: seller.id,
          item_id: item.id,
        },
        navigate,
      });

      navigate('/chats', {
        state: {
          opponentId: seller.id,
          itemInfo: {
            id: item.id,
            imgId: item.imgId,
            title: item.title,
            price: item.price,
          },
        },
      });
    } catch (error: any) {
      console.error(`채팅방 생성 실패 (재시도 ${retryCount}회):`, error);

      if (retryCount < 2) {
        setTimeout(() => handleChat(retryCount + 1), 1000);
      } else {
        console.error(
          '채팅방 생성 실패 : ',
          error.response?.data || error.message,
        );
      }
    }
  };

  if (!item || !seller) {
    return <div></div>;
  }

  return (
    <>
      <div className="item_detail_container">
        <div className="item_detail_left">
          <div className="img_wrapper">
            <img
              src={item?.imgId ? getImgSrc(item?.imgId) : sampleImg}
              alt="Item"
            />
          </div>
          <div className="item_seller_container">
            <div className="item_seller">
              <img
                src={getImgSrc(seller.image)}
                alt="Item"
                width={64}
                style={{ borderRadius: '100px' }}
              />
              <p>{seller.seller}</p>
            </div>
            <button
              className="shop_btn"
              onClick={() => navigate(`/store/${seller.id}`)}
            >
              <p>상점 보러가기</p>
            </button>
          </div>
        </div>

        <div className="item_detail_right">
          <p className="item_detail_category">{item.category}</p>
          <p className="item_detail_title">{item.title}</p>
          <p className="item_detail_price">
            {item?.price ? formatNumber(item.price) + '원' : ''}
          </p>
          <p className="item_detail_date">
            {item?.createdAt ? getDaysAgo(item.createdAt) : ''}
          </p>
          <p className="item_detail_info">{item.contents}</p>

          <div className="item_detail_btns_container">
            <button
              className="item_detail_btn first_btn"
              onClick={() => handleLikeButton(item.id)}
            >
              <div className="item_detail_like_btn">
                <img src={isLike ? likeIcon : unLikeIcon} alt="Like" />
                <p>좋아요</p>
                <p className="like_count">{item.like}</p>
              </div>
            </button>
            {isSeller ? (
              <button
                className="item_detail_btn mid_btn"
                onClick={() => handleEdit(item.id)}
              >
                <p>수정하기</p>
              </button>
            ) : (
              <button
                className="item_detail_btn mid_btn"
                onClick={() => handleChat()}
              >
                <p>채팅하기</p>
              </button>
            )}

            {isSeller ? (
              <button
                className="item_detail_btn last_btn"
                onClick={() => handleDelete(item.id)}
              >
                <p>삭제하기</p>
              </button>
            ) : (
              <button className="item_detail_btn last_btn">
                <p>구매하기</p>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="line" />

      <Comments
        comments={comments}
        itemId={item.id}
        onCommentAdded={fetchCommentData}
      />
    </>
  );
}

export default ItemDetail;
