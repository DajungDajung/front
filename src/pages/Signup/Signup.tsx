import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import Logo from '../../assets/Logo.png';

interface SignupForm {
  name: string;
  nickname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<SignupForm>({
    name: '',
    nickname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [agreeAll, setAgreeAll] = useState(false);
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const updated = { ...agreements, [name]: checked };
    setAgreements(updated);
    setAgreeAll(Object.values(updated).every(Boolean));
  };

  const handleAgreeAllChange = () => {
    const newValue = !agreeAll;
    setAgreeAll(newValue);
    setAgreements({
      terms: newValue,
      privacy: newValue,
      marketing: newValue,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await axiosInstance.post('/auth/signup', {
        name: form.name,
        nickname: form.nickname,
        email: form.email,
        contact: form.phone,
        password: form.password,
      });

      alert('회원가입이 완료되었습니다');
      navigate('/signin');
    } catch (err) {
      console.error('회원가입 오류:', err);
      alert('이메일 혹은 전화번호가 중복됩니다.');
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center">
      <div style={{ marginTop: '100px' }} className="flex flex-col items-center">
        <img src={Logo} alt="logo" className="mb-6 w-[180px]" />

        <div className="bg-white px-10 py-8 rounded-2xl shadow-xl w-[420px] text-center">
          <form className="flex flex-col gap-3 items-center" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-2 w-[300px]">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="이름"
                required
                className="h-[43px] border border-gray-300 rounded-md !pl-2.5 text-[20px] placeholder:text-gray-400"
              />
              <input
                name="nickname"
                value={form.nickname}
                onChange={handleChange}
                placeholder="닉네임"
                required
                className="h-[43px] border border-gray-300 rounded-md !pl-2.5 text-sm placeholder:text-gray-400"
              />
            </div>

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="이메일"
              required
              className="w-[300px] h-[43px] border border-gray-300 rounded-md !pl-2.5 text-sm placeholder:text-gray-400"
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="전화번호"
              required
              className="w-[300px] h-[43px] border border-gray-300 rounded-md !pl-2.5 text-sm placeholder:text-gray-400"
            />

            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="비밀번호"
              required
              className="w-[300px] h-[43px] border border-gray-300 rounded-md !pl-2.5 text-sm placeholder:text-gray-400"
            />

            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="비밀번호 확인"
              required
              className="w-[300px] h-[43px] border border-gray-300 rounded-md !pl-2.5 text-sm placeholder:text-gray-400"
            />

            <button
              type="submit"
              className="cursor-pointer w-[300px] h-[40px] mt- bg-pink-300 text-white font-semibold rounded-md 
              shadow-md hover:bg-pink-400 transition-all duration-200"
            >
              회원가입
            </button>

            <div className="relative top-[16px] w-[300px] h-[160px] text-left text-gray-700">
              <label className="cursor-pointer flex items-center mb-2 font-medium !text-[18px]">
                <input
                  type="checkbox"
                  checked={agreeAll}
                  onChange={handleAgreeAllChange}
                  className="cursor-pointer !mr-1.5 w-[18px] h-[18px]"
                />
                전체 동의
              </label>

              <div className="border-t border-gray-500 !mt-2 !mb-2" />

              <label className="cursor-pointer flex items-center mb-1 !text-[15px]">
                <input
                  type="checkbox"
                  name="terms"
                  checked={agreements.terms}
                  onChange={handleAgreementChange}
                  className="cursor-pointer !mr-1.5"
                />
                이용 약관 동의 <span className="!text-pink-500 ml-1">*</span>
              </label>

              <label className="cursor-pointer flex items-center mb-1 !text-[15px]">
                <input
                  type="checkbox"
                  name="privacy"
                  checked={agreements.privacy}
                  onChange={handleAgreementChange}
                  className="cursor-pointer !mr-1.5"
                />
                다중다중 개인정보 수집 및 이용 동의 <span className="!text-pink-500 ml-1">*</span>
              </label>

              <label className="cursor-pointer flex items-center mb-1 !text-[15px]">
                <input
                  type="checkbox"
                  name="marketing"
                  checked={agreements.marketing}
                  onChange={handleAgreementChange}
                  className="cursor-pointer !mr-1.5"
                />
                [선택] 마케팅 활용 동의 및 광고 수신 동의
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
