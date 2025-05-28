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

const Signin: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<SigninForm>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password } = form;

    if (email.trim() === '' || password.trim() === '') {
      alert('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      const res = await axiosInstance.post('/auth/signin', { email, password });
      localStorage.setItem('nickname', res.data[0].nickname);
      alert('로그인 성공! 메인페이지로 이동합니다.');
      navigate('/');
    } catch (err) {
      console.error('로그인 요청 중 오류가 발생했습니다:', err);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center pt-[200px]">
      <img src={Logo} alt="logo" className="mb-4 w-[160px]" />

     <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-[360px] min-h-[460px] text-center">
        

        <form onSubmit={handleSignin} className="flex flex-col gap-4 items-center">
          <h2 className="text-xl font-semibold mb-6">다중다중 로그인</h2>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="이메일을 입력해주세요"
            className="w-[280px] min-h-[40px] border border-gray-300 rounded-md placeholder:text-[14px] pl-[200px]"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력해주세요"
            className="w-[280px] min-h-[40px] border border-gray-300 rounded-md placeholder:text-[14px] pl-[200px]"
            required
          />
          <button
            type="submit"
            className="w-[280px] min-h-[40px] bg-pink-300 text-white font-semibold rounded-md hover:bg-pink-400"
          >
            로그인
          </button>
        </form>

        <div className="w-full border-t border-gray-300 my-4" />

        <button
          className="w-[280px] min-h-[40px] bg-pink-300 text-white font-semibold rounded-md hover:bg-pink-400 mb-4"
          onClick={() => navigate('/signup')}
        >
          회원가입
        </button>

        <div className="text-sm text-gray-500 flex justify-end w-full mb-4 gap-2">
          <button onClick={() => navigate('/findid')} className="hover:underline">아이디찾기</button>
          <span>|</span>
          <button onClick={() => navigate('/resetpwd')} className="hover:underline">비밀번호재설정</button>
        </div>

        <p className="text-sm font-medium mb-3">SNS 계정으로 간편하게 시작하기</p>

        <div className="flex justify-center gap-6">
          <img src={GoogleLogo} alt="google" className="w-10 h-10" />
          <img src={NaverLogo} alt="naver" className="w-10 h-10" />
          <img src={KakaoLogo} alt="kakao" className="w-10 h-10" />
        </div>
      </div>
    </div>
  );
};

export default Signin;
