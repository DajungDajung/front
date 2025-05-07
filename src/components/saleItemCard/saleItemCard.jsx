import { useNavigate } from 'react-router-dom';
import style from './saleItemCard.module.css'
import { getImage } from '../../utils/getImage';
import { getDaysAgo } from '../../utils/date';
import axios from 'axios';
import { BASE_URL } from '../../api/BASE_URL';

export default function SaleItemCard({ item }) {
  const navigate = useNavigate();
  const navigateToEachItem = (num) => {
    navigate(`/items/${num}`)
  }
  const navigateEdit = (num) => {
    navigate(`/items/edit/${num}`, { state: { item, isEdit: true } })
  }

  const itemDelete = (num) => {
    axios.delete(BASE_URL + `/items/${num}`).then((response) => {
      alert('상품이 삭제되었습니다.');
    }).catch(err => {
      alert('오류 발생!');
    })
  }
  return (
    <div className={style.itemCard}>
      <div className={style.imageContainer}>
        <img onClick={() => navigateToEachItem(item.id)} src={getImage(item.img_id)} alt="itemImage" />
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
          <button type="button" onClick={() => navigateEdit(item.id)}>수정</button>
          <button type="button" onClick={() => itemDelete(item.id)}>삭제</button>
        </div>
      </div>
    </div>
  )
}
