import styles from './userInfo.module.css';
import { getImage } from '../../utils/getImage';
import { getDaysAgo } from '../../utils/date';
import { useNavigate, useOutletContext } from 'react-router-dom';

export default function UserInfo({ userData }) {
  let finalUserData = { userData };
  if (window.location.pathname === '/users/mypage') {
    const { contextUserData } = useOutletContext();
    finalUserData = contextUserData;
  } else {
    finalUserData = finalUserData.userData
  }

  return (
    <div className={styles.userInfo}>
      <div className={styles.profilebox}>
        <img className={styles.profileImage} src={getImage(finalUserData?.img_id)} />
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
            <p>{finalUserData?.info ? finalUserData?.info : '상점에 대한 설명이 없습니다.'}</p>
          </div>
        </div>
        <div className={styles.extraInfo}>
          <table>
            <tbody>
              {/* <tr> */}
              {/*   <td className={styles.tTitle}>이름</td> */}
              {/*   <td className={styles.tContent}>{username}</td> */}
              {/* </tr> */}
              <tr>
                <td className={styles.tTitle}>이메일</td>
                <td className={styles.tContent}>{finalUserData?.email}</td>
              </tr>
              <tr>
                <td className={styles.tTitle}>전화번호</td>
                <td className={styles.tContent}>{finalUserData?.contact}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div >
  )
}
