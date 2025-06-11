import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../assets/Logo.png';

const { VITE_BACK_URL } = import.meta.env;

interface ResetPwdForm {
  name: string;
  email: string;
  phone: string;
}

const ResetPwd: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<ResetPwdForm>({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedPhone = form.phone.replace(/[^0-9]/g, '');

    try {
      const response = await axios.post(
        `${VITE_BACK_URL}/auth/reset`,
        {
          name: form.name,
          email: form.email,
          contact: sanitizedPhone,
        },
        { withCredentials: true }
      );

      console.log('응답 결과:', response.data);
      navigate('/newpwd', { state: { email: form.email } });
    } catch (error) {
      console.error('비밀번호 초기화 오류:', error);
      alert('비밀번호 초기화에 실패했습니다.');
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white">
      <img src={Logo} alt="logo" className="mb-6 w-[180px]" />
      <div className="bg-white px-10 py-8 rounded-2xl shadow-xl w-[390px] h-[340px] text-center">

        <form className="flex flex-col !mt-[24px] gap-4 items-center" onSubmit={handleSubmit}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="이름"
            required
            className="w-[300px] h-[43px] border border-gray-300 rounded-md !pl-2.5 text-sm placeholder-gray-400"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="이메일"
            required
            className="w-[300px] h-[43px] border border-gray-300 rounded-md !pl-2.5 text-sm placeholder-gray-400"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="전화번호 (- 없이 숫자만 입력)"
            required
            className="w-[300px] h-[43px] border border-gray-300 rounded-md !pl-2.5 text-sm placeholder-gray-400"
          />

          <div className="w-[300px] border-t-2 border-gray-300 my-2" />

          <button
            type="submit"
            className="cursor-pointer w-[300px] h-[40px] bg-pink-300 text-white font-semibold rounded-md 
            shadow-md hover:bg-pink-400 transition-all duration-200"
          >
            비밀번호 초기화
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPwd;
