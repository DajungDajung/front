import styles from './userInfo.module.css';
import { getImgSrc } from '../../utils/image';
import { getDaysAgo } from '../../utils/date';
import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

export default function UserInfo({ userData }) {
  const [finalUserData, setFinalUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      setFinalUserData(userData);
    } else {
      axiosInstance
        .get('/users/mypage')
        .then((response) => {
          setFinalUserData(response.data);
        })
        .catch((err) => {
          if (err.response?.status === 404) {
            alert('존재하지 않는 사용자입니다.\n메인페이지로 이동합니다.');
            navigate('/');
          }
        });
    }
  }, [userData, navigate]);
  if (!finalUserData) {
    return <div className={styles.userInfo}>로딩중...</div>;
  }

  return (
    <div className={styles.userInfo}>
      <div className={styles.profilebox}>
        <img
          className={styles.profileImage}
          src={getImgSrc(finalUserData?.img_id)}
        />
      </div>
      <div className={styles.infobox}>
        <div>
          <h2 className={styles.nickname}>{finalUserData?.nickname}</h2>
          <div className={styles.listItems}>
            <p className={styles.option}>상점오픈일</p>
            <p>{getDaysAgo(finalUserData?.created_at)}</p>
          </div>
          <div className={styles.listItems}>
            <p className={styles.option}>상품판매</p>
            <p>{0} 회</p>
          </div>
          <div className={styles.profileDescription}>
            <p>
              {finalUserData?.info
                ? finalUserData?.info
                : '상점에 대한 설명이 없습니다.'}
            </p>
          </div>
        </div>
        <div className={styles.extraInfo}>
          <table>
            <tbody>
              <tr>
                <td className={styles.tTitle}>이메일</td>
                <td className={styles.tContent}>{finalUserData?.email}</td>
              </tr>
              <tr>
                <td className={styles.tTitle}>전화번호</td>
                <td className={styles.tContent}>
                  {finalUserData?.contact.replace(
                    /(\d{3})(\d{4})(\d{4})/,
                    '$1-$2-$3',
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
