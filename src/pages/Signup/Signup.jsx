import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import axios from 'axios';
import { BASE_URL } from '../../api/BASE_URL';
import { axiosInstance } from '../../api/axiosInstance';

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    nickname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    axiosInstance.post('/auth/signup', {
      email: form.email,
      contact: form.phone,
      password: form.password,
      name: form.name,
      nickname: form.nickname
    }).then((response) => {
      console.log('회원가입 요청 준비 완료:', form);
      alert('회원가입이 완료되었습니다');
      navigate('/login');
    }).catch(err => {
      console.log(err);
      alert('회원가입에 실패했습니다.')
    })
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">회원가입</h2>

      <form className="signup-form" onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} className="signup-input" placeholder="이름" required />
        <input name="nickname" value={form.nickname} onChange={handleChange} className="signup-input" placeholder="닉네임" required />
        <input name="email" type="email" value={form.email} onChange={handleChange} className="signup-input" placeholder="이메일" required />
        <input name="phone" value={form.phone} onChange={handleChange} className="signup-input" placeholder="전화번호 (- 없이 숫자만 입력)" required />
        <input name="password" type="password" value={form.password} onChange={handleChange} className="signup-input" placeholder="비밀번호" required />
        <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} className="signup-input" placeholder="비밀번호 확인" required />

        <div className="signup-divider" />
        <button type="submit" className="signup-btn">회원가입</button>
      </form>
    </div>
  );
};

export default Signup;
