import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signin.css';
import axiosInstance from '../../api/axiosInstance';

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = form;

    if (email.trim() === '' || password.trim() === '') {
      alert('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    axiosInstance.post('/auth/signin', { email: form.email, password: form.password })
      .then((res) => {
        console.log('로그인 정보:', form);
        alert('로그인 성공! 메인페이지로 이동합니다.');
        navigate('/dajungdajung');
      }).catch(err => {
        console.log(err)
      })
  };

  //   try {
  //     const res = await fetch('https://afe5-58-77-32-216.ngrok-free.app/auth/signin', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       credentials: 'include',
  //       body: JSON.stringify({ email, password }),
  //     });
  //
  //     const data = await res.json();
  //
  //     if (!res.ok) {
  //       console.error('로그인 실패 응답:', data);
  //       alert('이메일 또는 비밀번호가 잘못되었습니다.');
  //       return;
  //     }
  //
  //     console.log('로그인 성공:', data);
  //     localStorage.setItem('token', data.token);
  //     localStorage.setItem('nickname', data.nickname);
  //
  //     alert('로그인 성공! 메인페이지로 이동합니다.');
  //     navigate('/dajungdajung');
  //   } catch (error) {
  //     console.error('로그인 요청 중 오류가 발생했습니다:', error);
  //     alert('로그인에 실패했습니다. 다시 시도해주세요.');
  //   }
  // };

  return (
    <div className="login-container">
      <h2 className="login-title">로그인</h2>

      <form className="login-form" onSubmit={handleLogin}>
        <input
          className="login-input"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          className="login-input"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="비밀번호"
          required
        />
        <button type="submit" className="button button--primary">로그인</button>
      </form>

      <div className="login-divider" />

      <div className="login-options">
        <button className="button button--primary" onClick={() => navigate('/signup')}>회원가입</button>
        <button className="button button--gray" onClick={() => navigate('/findid')}>아이디 찾기</button>
        <button className="button button--gray" onClick={() => navigate('/resetpwd')}>비밀번호 초기화</button>
      </div>
    </div>
  );
};

export default Login;
