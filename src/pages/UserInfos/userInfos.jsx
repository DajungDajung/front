import UserInfo from '../../components/userInfo/userInfo';
import styles from './userInfos.module.css';
import CardItems from '../../components/cardItem/cardItems';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import Pagination from '../../components/Pagination/pagination';

export default function UserInfos() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState();
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/store/${id}`)
      .then((response) => {
        setUserData(response.data.userData[0]);
        setItemData(response.data.itemData);
      })
      .catch((err) => {
        if (err && err.response) {
          if (err.response.status === 404) {
            alert('존재하지 않는 사용자입니다.\n메인페이지로 이동합니다.');
            navigate('/');
          }
        }
      });
  }, [id]);

  const [page, setPage] = useState(1);
  const itemPerPage = 10;
  const indexOfLast = page * itemPerPage;
  const indexOfFirst = indexOfLast - itemPerPage;
  const currentitems = itemData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(itemData.length / itemPerPage);

  return (
    <>
      <UserInfo userData={userData} />
      <div className={styles.salingBox}>
        <p>상품</p>
        <p className={styles.count}>{itemData.length}</p>
        <div className={styles.itemList}></div>
        <div className={styles.salingItems}>
          {currentitems.map((item) => (
            <CardItems item={item} />
          ))}
        </div>
        <div>
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            setCurrentPage={setPage}
          />
        </div>
      </div>
    </>
  );
}
