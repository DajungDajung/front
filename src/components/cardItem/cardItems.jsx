import { getDaysAgo } from '../../utils/date';
import { getImage } from '../../utils/getImage';
import styles from './cardItems.module.css'
import { useNavigate } from 'react-router-dom'


export default function CardItems({ item }) {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.card} onClick={() => navigate(`/items/${item.id}`)}>
        <div className={styles.cardImage}>
          <img src={getImage(item.img_id)} />
        </div>
        <div className={styles.cardTitle}>
          <p>{item.title}</p>
        </div>
        <div className={styles.cardInfos}>
          <div>
            <p className={styles.price}>{item.price.toLocaleString()}원</p>
            <p className={styles.date}>{getDaysAgo(item.created_at)}</p>
          </div>
        </div>
      </div >
    </>
  )
}
