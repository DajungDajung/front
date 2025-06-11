import { useNavigate } from 'react-router-dom';
import style from './Unsubscribe.module.css';
import { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';

export default function Unsubscribe() {
  const navigate = useNavigate();
  const [_isOut, setIsOut] = useState(null);
  const signOffConfirm = () => {
    if (
      confirm('탈퇴 시 등록된 정보는 복구가 불가능합니다.\n 탈퇴하시겠습니까?')
    ) {
      axiosInstance
        .delete('/users/mypage')
        .then(() => {
          alert('탈퇴 처리 되었습니다.\n 이용해주셔서 감사합니다.');
          navigate('/');
          localStorage.removeItem('nickname');
        })
        .catch(() => {
          alert('죄송합니다. 나중에 다시 시도해주세요');
        });
    }
  };
  return (
    <div className={style.unsubContainer}>
      <div>
        <h1>정말 탈퇴하시겠습니까?</h1>
        <p>탈퇴 버튼 선택 시 계정은 삭제되며 복구할 수 없습니다.</p>
        <div className={style.buttons}>
          <button
            type="submit"
            onMouseOver={() => setIsOut(true)}
            onClick={signOffConfirm}
          >
            탈퇴하기
          </button>
          <button
            type="button"
            onMouseOver={() => setIsOut(false)}
            onClick={() => navigate(-1)}
          >
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
}
