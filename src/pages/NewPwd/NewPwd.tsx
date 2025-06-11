import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../assets/Logo.png';

const { VITE_BACK_URL } = import.meta.env;

interface NewPwdForm {
  newPassword: string;
  confirmPassword: string;
}

const NewPwd: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const [form, setForm] = useState<NewPwdForm>({
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!email) {
      alert('이메일 정보가 유실되었습니다. 처음부터 다시 시도해주세요.');
      navigate('/resetpwd');
      return;
    }

    try {
      const response = await axios.put(
        `${VITE_BACK_URL}/auth/reset`,
        {
          email,
          password: form.newPassword,
          passwordConfirm: form.confirmPassword,
        },
        { withCredentials: true }
      );

      console.log('비밀번호 변경 성공:', response.data);
      alert('비밀번호가 성공적으로 변경되었습니다.');
      navigate('/signin');
    } catch (error) {
      console.error('비밀번호 변경 오류:', error);
      alert('비밀번호 변경에 실패했습니다.');
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white">
      <img src={Logo} alt="logo" className="mb-6 w-[180px]" />
        <div className="bg-white px-10 py-8 rounded-2xl shadow-xl w-[390px] h-[340px] text-center">

        <form className="flex flex-col !mt-[40px] gap-4 items-center" onSubmit={handleSubmit}>
          <input
            name="newPassword"
            type="password"
            value={form.newPassword}
            onChange={handleChange}
            placeholder="새 비밀번호"
            required
            className="w-[300px] h-[43px] border border-gray-300 rounded-md !pl-2.5 text-sm placeholder-gray-400"
          />

          <input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="새 비밀번호 확인"
            required
            className="w-[300px] h-[43px] border border-gray-300 rounded-md !pl-2.5 text-sm placeholder-gray-400"
          />

          <div className="w-[300px] border-t-2 border-gray-300 my-2" />

          <button
            type="submit"
            className="cursor-pointer w-[300px] h-[40px] bg-pink-300 text-white font-semibold rounded-md 
            shadow-md hover:bg-pink-400 transition-all duration-200"
          >
            비밀번호 재설정
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPwd;
