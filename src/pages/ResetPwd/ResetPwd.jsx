import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ResetPwd.css';
const { VITE_BACK_URL } = import.meta.env;

const ResetPwd = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
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
        {
          withCredentials: true,
        },
      );

      console.log('응답 결과:', response.data);

      navigate('/newpwd', { state: { email: form.email } });
    } catch (error) {
      console.error('비밀번호 초기화 오류:', error);
      alert('비밀번호 초기화에 실패했습니다.');
    }
  };

  return (
    <div className="resetpwd-container">
      <h2 className="resetpwd-title">비밀번호 초기화</h2>

      <form className="resetpwd-form" onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="resetpwd-input"
          placeholder="이름"
          required
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="resetpwd-input"
          placeholder="이메일"
          required
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="resetpwd-input"
          placeholder="전화번호 (- 없이 숫자만 입력)"
          required
        />
        <div className="resetpwd-divider" />
        <button type="submit" className="button button--primary">
          비밀번호 초기화
        </button>
      </form>
    </div>
  );
};

export default ResetPwd;
