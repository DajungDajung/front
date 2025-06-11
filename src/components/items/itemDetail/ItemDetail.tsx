import React, { useState, useEffect, JSX } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authRequest } from '../../../api/axiosInstance';
import { getComments } from '../../../api/commentsApi';
import { deleteItem, getItemDetail } from '../../../api/itemsApi.js';
import likeIcon from '../../../assets/ic_like.svg';
import unLikeIcon from '../../../assets/ic_unlike.svg';
import sampleImg from '../../../assets/sampleImg.svg';
import { getDaysAgo } from '../../../utils/date.js';
import { formatNumber } from '../../../utils/format.js';
import { getImgSrc } from '../../../utils/image.js';
import Comments from '../comments/Comments.js';
import useKakaoMap from '../../../hooks/useKakaoMap.js';
import './ItemDetail.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  itemDetail as iItemDetail,
  item,
} from '../../../types/item.model.js';
import type { comment } from '../../../types/comment.model.js';
import { seller } from '../../../types/user.model.js';
import { location } from '../../../types/location.model.js';

import type { location as LocationType } from '../../../types/location.model.js';

// Map component that calls useKakaoMap
const KakaoMapComponent: React.FC<{ loc: LocationType }> = ({ loc }) => {
  if (!loc.coordinate_x || !loc.coordinate_y) {
    loc.coordinate_x = 33.4507;
    loc.coordinate_y = 126.5707;
    loc.title = '약속 장소';
  }
  const { address } = useKakaoMap({
    containerId: 'mini_map',
    initialCenter: {
      lat: loc.coordinate_x,
      lng: loc.coordinate_y,
    },
    options: {
      disableUI: true,
      fixedMap: true,
    },
  });
  return (
    <>
      <div
        id="mini_map"
        className="border-[1px] rounded-xl border-gray-300 w-full h-52 relative"
      />
      <p>{[loc.title, address].join(',')}</p>
    </>
  );
};

const ItemDetail: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<iItemDetail>();
  const itemId = id ? parseInt(id) : undefined;

  const queryClient = useQueryClient();
  const { data: itemDetailData } = useQuery<item>({
    queryKey: ['itemDetail', id],
    queryFn: () => getItemDetail(id!),
    enabled: !!id,
  });

  const { data: commentsData = [], refetch: refetchCommentData } = useQuery<
    comment[]
  >({
    queryKey: ['comments', id],
    queryFn: () => getComments(id!),
  });

  const likeMutation = useMutation({
    mutationFn: () => {
      const method = isLike ? 'delete' : 'post';
      return authRequest({ method, url: `/users/likes/${item?.id}`, navigate });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['itemDetail', id!] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteItem(id!),
    onSuccess: () => {
      navigate('/');
    },
  });

  const [seller, setSeller] = useState<seller>();
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isSeller, setIsSeller] = useState<boolean>(false);
  const [comments, setComments] = useState<comment[]>([]);
  const [location, setLocation] = useState<location>();
  const [shouldRefetchComments, setShouldRefetchComments] =
    useState<boolean>(false);

  useEffect(() => {
    if (itemDetailData) {
      setItem(itemDetailData.item);
      setSeller(itemDetailData.user);
      setIsLike(itemDetailData.item.liked === 'true');
      setIsSeller(itemDetailData.item.seller === 'true');
      setLocation(itemDetailData.location);
    }
  }, [itemDetailData]);

  useEffect(() => {
    setComments(commentsData);
  }, [commentsData]);

  useEffect(() => {
    if (shouldRefetchComments) {
      refetchCommentData();
    }
  }, [shouldRefetchComments, refetchCommentData]);

  const [isMoreInfo, setIsMoreInfo] = useState(false);

  const handleEdit = () => {
    navigate(`/items/edit/${id}`, { state: { item, isEdit: true } });
  };

  const handleLikeButton = () => {
    likeMutation.mutate();
  };

  const handleDelete = async () => {
    if (window.confirm('상품을 삭제하시겠습니까?')) {
      deleteMutation.mutate();
    }
  };

  const handleMoreInfo = () => {
    setIsMoreInfo(!isMoreInfo);
  };

  const handleCommentAdded = () => {
    setShouldRefetchComments((prev) => !prev);
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
            imgId: item.img_id,
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
            <img src={item ? getImgSrc(item.img_id) : sampleImg} alt="Item" />
          </div>
          <div className="item_seller_container">
            <div className="item_seller">
              <img
                src={seller ? getImgSrc(seller.image) : sampleImg}
                alt="Item"
                width={64}
                className="rounded-full"
              />
              <p>{seller?.seller}</p>
            </div>
            <button
              className="shop_btn"
              onClick={() => navigate(`/store/${seller?.id}`)}
            >
              <p>상점 보러가기</p>
            </button>
          </div>
        </div>

        <div className="item_detail_right">
          <p className="item_detail_category">{item?.category}</p>
          <p className="item_detail_title">{item?.title}</p>
          <p className="item_detail_price">
            {item?.price ? formatNumber(item.price) + '원' : ''}
          </p>
          <p className="item_detail_date">
            {item ? getDaysAgo(item?.create_at) : ''}
          </p>
          <p className={`item_detail_info ${isMoreInfo ? '' : 'line-clamp-3'}`}>
            {item?.contents}
            <a className="" onClick={handleMoreInfo}>
              더보기
            </a>
          </p>

          <div className="item_detail_btns_container">
            <button
              className="item_detail_btn first_btn"
              onClick={() => handleLikeButton()}
            >
              <div className="item_detail_like_btn">
                <img src={isLike ? likeIcon : unLikeIcon} alt="Like" />
                <p>좋아요</p>
                <p className="like_count">{item?.like}</p>
              </div>
            </button>
            {isSeller ? (
              <button
                className="item_detail_btn mid_btn"
                onClick={() => handleEdit()}
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
                onClick={() => handleDelete()}
              >
                <p>삭제하기</p>
              </button>
            ) : (
              <button className="item_detail_btn last_btn">
                <p>구매하기</p>
              </button>
            )}
            {location && <KakaoMapComponent loc={location} />}
          </div>
        </div>
      </div>

      <div className="line" />
      <Comments
        comments={comments}
        itemId={itemId!}
        onCommentAdded={handleCommentAdded}
      />
    </>
  );
};

export default ItemDetail;
