import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import GoogleLogo from '../../assets/google.png';
import NaverLogo from '../../assets/naver.png';
import KakaoLogo from '../../assets/kakao.png';
import Logo from '../../assets/Logo.png';

interface SigninForm {
  email: string;
  password: string;
}

const SOCIAL_LOGIN_URLS: Record<'google' | 'naver' | 'kakao', string> = {
  kakao: "http://3.34.9.40:3002/auth/kakao",
  google: "http://3.34.9.40:3002/auth/google",
  naver: "http://3.34.9.40:3002/auth/naver",
};

const Signin: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<SigninForm>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const { email, password } = form;

    if (email.trim() === '' || password.trim() === '') {
      alert('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      const res = await axiosInstance.post('/auth/signin', { email, password });
      localStorage.setItem('nickname', res.data.nickname);
      alert('로그인 성공! 메인페이지로 이동합니다.');
      navigate('/');
    } catch (err) {
      console.error('로그인 요청 중 오류가 발생했습니다:', err);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleSocialLogin = (provider: 'google' | 'naver' | 'kakao') => {
    const url = SOCIAL_LOGIN_URLS[provider];
    if (url) {
      window.location.href = url;
    } else {
      alert(`${provider} 로그인 URL이 설정되지 않았습니다.`);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center">
      <div style={{ marginTop: '100px' }} className="flex flex-col items-center">
        <img src={Logo} alt="logo" className="mb-6 w-[180px]" />

        <div className="bg-white px-10 py-8 rounded-2xl shadow-xl w-[410px] min-h-[480px] text-center">
          <div className="flex flex-col gap-4 items-center">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="이메일을 입력해주세요"
              className="block w-[300px] h-[43px] !pl-2.5 !mt-[25px] border border-gray-300 rounded-md text-sm 
              pl-4 placeholder:text-gray-400 placeholder:text-sm"
            />

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력해주세요"
              className="block w-[300px] h-[43px] !pl-2.5 border border-gray-300 rounded-md text-sm 
              pl-4 placeholder:text-gray-400 placeholder:text-sm"
            />

            <div className="w-[310px] border-t-2 border-[#A3A0A0]" />
            <div className="flex flex-col gap-2 mt-[16px] items-center">
              <button
                type="button"
                className="cursor-pointer w-[300px] min-h-[40px] bg-pink-300 text-white font-semibold rounded-md 
                shadow-md hover:bg-pink-400 transition-all duration-200"
                onClick={handleSignin}
              >
                로그인
              </button>

              <button
                type="button"
                className="cursor-pointer w-[300px] min-h-[40px] bg-pink-300 text-white font-semibold rounded-md 
                shadow-md hover:bg-pink-400 transition-all duration-200"
                onClick={() => navigate('/signup')}
              >
                회원가입
              </button>
            </div>
          </div>

          <div className="flex flex-col items-end relative !top-[10px] right-[57px] space-y-[2px]">
            <button
              onClick={() => navigate('/findid')}
              className="cursor-pointer !text-[15px] text-gray-400 !font-light underline decoration-gray-400 hover:decoration-2 hover:decoration-gray-600 transition"
            >
              아이디 찾기
            </button>
            <button
              onClick={() => navigate('/resetpwd')}
              className="cursor-pointer !text-[15px] text-gray-400 !font-light underline decoration-gray-400 hover:decoration-2 hover:decoration-gray-600 transition"
            >
              비밀번호 재설정
            </button>
          </div>

          <div className="flex flex-col items-center relative top-[30px]">
            <p className="text-sm font-medium relative top-[10px]">SNS 계정으로 간편하게 시작하기</p>

            <div className="flex justify-center gap-17 relative top-[30px]">
              <button
                type="button"
                className="cursor-pointer flex flex-col items-center"
                onClick={() => handleSocialLogin('google')}
              >
                <img
                  src={GoogleLogo}
                  alt="google"
                  className="w-10 h-10 rounded-lg border border-gray-200"
                />
                <span className="!text-xs text-gray-600 !mt-2 leading-none">google</span>
              </button>

              <button
                type="button"
                className="cursor-pointer flex flex-col items-center"
                onClick={() => handleSocialLogin('naver')}
              >
                <img
                  src={NaverLogo}
                  alt="naver"
                  className="w-10 h-10 rounded-lg bg-white"
                />
                <span className="!text-xs text-gray-600 !mt-2 leading-none">naver</span>
              </button>

              <button
                type="button"
                className="cursor-pointer flex flex-col items-center"
                onClick={() => handleSocialLogin('kakao')}
              >
                <img
                  src={KakaoLogo}
                  alt="kakao"
                  className="w-10 h-10 rounded-lg bg-white"
                />
                <span className="!text-xs text-gray-600 !mt-2 leading-none">kakao</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
