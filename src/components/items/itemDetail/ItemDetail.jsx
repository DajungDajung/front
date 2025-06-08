import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authRequest } from '../../../api/axiosInstance.js';
import { getComments } from '../../../api/commentsApi.js';
import { deleteItem, getItemDetail } from '../../../api/itemsApi.js';
import likeIcon from '../../../assets/ic_like.svg';
import unLikeIcon from '../../../assets/ic_unlike.svg';
import sampleImg from '../../../assets/sampleImg.svg';
import { getDaysAgo } from '../../../utils/date';
import { formatNumber } from '../../../utils/format';
import { getImgSrc } from '../../../utils/image.js';
import Comments from '../comments/Comments';
import useKakaoMap from '../../../hooks/useKakaoMap';
import './ItemDetail.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const ItemDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const queryClient = useQueryClient();
  const { data: itemDetailData } = useQuery({
    queryKey: ['itemDetail', id],
    queryFn: () => getItemDetail(id).then((res) => res.data),
    enabled: !!id,
  });

  const { data: commentsData = [], refetch: refetchCommentData } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => getComments(id).then((res) => res.data),
    enabled: !!id,
  });

  const likeMutation = useMutation({
    mutationFn: () => {
      const method = isLike ? 'delete' : 'post';
      return authRequest({ method, url: `/users/likes/${item.id}`, navigate });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['itemDetail', id]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteItem(item.id),
    onSuccess: () => {
      navigate('/');
    },
  });

  const [item, setItem] = useState({});
  const [seller, setSeller] = useState({});
  const [isLike, setIsLike] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [comments, setComments] = useState([]);
  const [location, setLocation] = useState({});
  const [shouldRefetchComments, setShouldRefetchComments] = useState(false);

  useEffect(() => {
    if (itemDetailData) {
      setItem(itemDetailData.item);
      setSeller(itemDetailData.user);
      setIsLike(itemDetailData.item.liked === 'true');
      setIsSeller(itemDetailData.item.isSeller === 'true');
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
  const { address } = useKakaoMap({
    containerId: 'mini_map',
    initialCenter: {
      lat: location.coordinateX || 37.5665,
      lng: location.coordinateY || 126.978,
    },
    options: {
      disableUI: true,
      fixedMap: true,
    },
  });

  const handleEdit = (id) => {
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

  return (
    <>
      <div className="item_detail_container">
        <div className="item_detail_left">
          <div className="img_wrapper">
            <img
              src={item.img_id ? getImgSrc(item.img_id) : sampleImg}
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
            {item?.create_at ? getDaysAgo(item.create_at) : ''}
          </p>
          <p className={`item_detail_info ${isMoreInfo ? '' : 'line-clamp-3'}`}>
            {item.contents}
            <a className="" onClick={handleMoreInfo}>
              더보기
            </a>
          </p>

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
              <button className="item_detail_btn mid_btn">
                <p>채팅하기</p>
              </button>
            )}

            {isSeller ? (
              <button
                className="item_detail_btn last_btn"
                onClick={() => handleDelete(id)}
              >
                <p>삭제하기</p>
              </button>
            ) : (
              <button className="item_detail_btn last_btn">
                <p>구매하기</p>
              </button>
            )}
            <div
              className="border-[1px] rounded-xl border-gray-300 w-full h-52 object-center relative"
              id="mini_map"
            ></div>
            <p>{[location.title, address].join(',')}</p>
          </div>
        </div>
      </div>

      <div className="line" />
      <Comments
        comments={comments}
        item_id={id}
        onCommentAdded={handleCommentAdded}
      />
    </>
  );
};

export default ItemDetail;
