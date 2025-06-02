import React, {useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import './NewPwd.css';
const {VITE_BACK_URL} = import.meta.env

const NewPwd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const [form, setForm] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = e => {
    const {name, value} = e.target;
    setForm(prev => ({...prev, [name]: value}));
  };

  const handleSubmit = async e => {
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
        {
          withCredentials: true,
        },
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
    <div className="newpwd-container">
      <h2 className="newpwd-title">비밀번호 재설정</h2>

      <form className="newpwd-form" onSubmit={handleSubmit}>
        <input
          name="newPassword"
          type="password"
          value={form.newPassword}
          onChange={handleChange}
          className="newpwd-input"
          placeholder="새 비밀번호"
          required
        />
        <input
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="newpwd-input"
          placeholder="새 비밀번호 확인"
          required
        />
        <div className="newpwd-divider" />
        <button type="submit" className="button button--primary">
          비밀번호 재설정
        </button>
      </form>
    </div>
  );
};

export default NewPwd;
