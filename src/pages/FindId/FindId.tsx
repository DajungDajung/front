import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import Logo from '../../assets/Logo.png';

interface FindIdForm {
  name: string;
  contact: string;
}

const FindId: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<FindIdForm>({
    name: '',
    contact: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const sanitizedContact = form.contact;

    try {
      const res = await axiosInstance.post('/auth/findid', {
        name: form.name,
        contact: sanitizedContact,
      });

      alert(`가입된 이메일은 다음과 같습니다:\n\n📧 ${res.data.email}`);
      navigate('/signin');
    } catch (err) {
      console.error('아이디 찾기 오류:', err);
      alert('일치하는 회원 정보가 없습니다.');
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white">
      <img src={Logo} alt="logo" className="mb-6 w-[180px]" />
      <div className="bg-white px-10 py-8 rounded-2xl shadow-xl w-[390px] h-[340px] text-center">
        <form
          className="flex flex-col !mt-[40px] gap-4 items-center"
          onSubmit={handleSubmit}
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="이름"
            required
            className="w-[300px] h-[43px] border border-gray-300 rounded-md !pl-2.5 text-sm placeholder-gray-400"
          />
          <input
            name="contact"
            value={form.contact}
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
            아이디 찾기
          </button>
        </form>
      </div>
    </div>
  );
};

export default FindId;
