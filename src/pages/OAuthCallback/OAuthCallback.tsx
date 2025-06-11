// src/pages/OAuthCallback.tsx
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const nickname = searchParams.get('nickname');

    if (token && nickname) {
      // localStorage.setItem('token', token);
      document.cookie = `token=${token}; secure; samesite=None`;
      localStorage.setItem('nickname', nickname);
      alert(`${nickname}님 환영합니다!`);
      navigate('/');
    } else {
      alert('소셜 로그인 실패');
      navigate('/signin');
    }
  }, []);

  return (
    <div className="text-center mt-20 text-lg">로그인 처리 중입니다...</div>
  );
};

export default OAuthCallback;
