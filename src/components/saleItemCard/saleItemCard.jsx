import { useNavigate } from 'react-router-dom';
import style from './saleItemCard.module.css';
import { getImgSrc } from '../../utils/image';
import { getDaysAgo } from '../../utils/date';
import axiosInstance from '../../api/axiosInstance';

export default function SaleItemCard({ item, setItem }) {
  const navigate = useNavigate();
  const navigateToEachItem = (num) => {
    navigate(`/items/${num}`);
  };
  const navigateEdit = (num) => {
    navigate(`/items/edit/${num}`, { state: { item, isEdit: true } });
  };

  const itemDelete = (num) => {
    if (confirm('상품을 삭제하시겠습니까?')) {
      axiosInstance
        .delete(`/items/${num}`)
        .then((response) => {
          setItem((prev) => prev.filter((i) => i.id !== num));
          alert('상품이 삭제되었습니다.');
        })
        .catch((err) => {
          alert('상품을 삭제하지 못하였습니다.\n다시 시도해주세요.');
          console.log(err);
        });
    }
  };
  return (
    <div className={style.itemCard}>
      <div className={style.imageContainer}>
        <img
          onClick={() => navigateToEachItem(item.id)}
          src={getImgSrc(item.img_id)}
          alt="itemImage"
        />
      </div>
      <div>
        <div className={style.itemInfo}>
          <p>{item.title}</p>
          <div>
            <p className={style.itemPrice}>{item.price.toLocaleString()}원</p>
            <p className={style.itemDate}>{getDaysAgo(item.created_at)}</p>
          </div>
        </div>
        <div className={style.buttons}>
          <button type="button" onClick={() => navigateEdit(item.id)}>
            수정
          </button>
          <button type="button" onClick={() => itemDelete(item.id)}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
