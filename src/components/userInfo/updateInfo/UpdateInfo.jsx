import style from './UpdateInfo.module.css';
import profileImage from '../../../assets/default_image.jpg';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axiosInstance from '../../../api/axiosInstance';

const scheme = yup.object({
  name: yup
    .string('한글 혹은 영어로 작성해주세요')
    .required('필수 작성란입니다.')
    .matches(
      /^[가-힣]+$|^[a-zA-Z]+( [a-zA-Z]+)*$/,
      '한글 혹은 영어로 작성해주세요',
    )
    .min(1),
  email: yup
    .string('이메일은 숫자로만 작성할 수 없습니다.')
    .required('필수 작성란입니다.')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      '알맞은 이메일 형식으로 작성해주세요',
    ),
  nickname: yup
    .string('닉네임은 숫자로만 작성할 수 없습니다.')
    .required('필수 작성란입니다.')
    .matches(
      /^(?=.*[가-힣a-zA-Z])[가-힣a-zA-Z0-9]+$/,
      '닉네임은 한글 혹은 영어로만 작성해주세요',
    ),
  contact: yup.string().required('필수 작성란입니다.'),
  info: yup.string().required('필수 작성란입니다.'),
  password: yup
    .string()
    .required('비밀번호를 작성해주세요.')
    .matches(
      /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=~`[\]{}|\\:;"'<>,.?/]).{8,}$/,
      '비밀번호는 알파벳 소문자 + 숫자 + 특수기호로 이루어져야 합니다.',
    ),
  checkPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], '비밀번호가 다릅니다.')
    .required('비밀번호 확인이 필요합니다.'),
});

export default function UpdateInfo() {
  const navigate = useNavigate();
  const { contextUserData } = useOutletContext();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(scheme),
  });

  const updateSubmit = (data) => {
    const { _checkPassword, ...submitData } = data;
    if (submitData.contact) {
      submitData.contact = submitData.contact.replace(/-/g, '');
    }

    console.log(submitData);
    axiosInstance
      .put('/users/mypage', submitData)
      .then(() => {
        alert('사용자 정보가 수정되었습니다.');
        navigate('/users/mypage');
      })
      .catch(() => {
        alert('정보 수정 실패');
      });
  };

  const formatPhoneNumber = (e) => {
    const rawData = e.target.value;
    console.log(rawData);
    const onlyNum = rawData.replace(/[^\d]/g, '');

    if (onlyNum.length === 11) {
      const formatted = onlyNum.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      setValue('contact', formatted);
      clearErrors('contact');
    } else if (onlyNum.length !== 11) {
      setError('contact', {
        type: 'manual',
        message: '전화번호를 올바르게 기입해주세요',
      });
    }
  };

  useEffect(() => {
    if (contextUserData) {
      reset({
        name: contextUserData.name,
        nickname: contextUserData.nickname,
        email: contextUserData.email,
        info: contextUserData.info,
        contact: contextUserData.contact,
      });
    }
  }, [contextUserData, reset]);
  return (
    <form
      className={style.updateInfoContainer}
      onSubmit={handleSubmit(updateSubmit)}
    >
      <div className={style.imageBox}>
        <img src={profileImage} alt="" />
        <button type="file">업로드</button>
      </div>
      <hr />
      <div className={style.inputContainer}>
        {errors.name && <p>*{errors.name?.message}</p>}
        <input
          type="text"
          name="name"
          placeholder={`기존 데이터 : ${contextUserData.name}`}
          {...register('name')}
        />
        {errors.nickname && <p>*{errors.nickname?.message}</p>}
        <input
          type="text"
          name="nickname"
          placeholder={`기존 데이터 : ${contextUserData.nickname}`}
          {...register('nickname')}
        />
        {errors.email && <p>*{errors.email?.message}</p>}
        <input
          type="email"
          name="email"
          placeholder={`기존 데이터 : ${contextUserData.email}`}
          {...register('email')}
        />
        {errors.info && <p>*{errors.info?.message}</p>}
        <textarea
          name="info"
          placeholder={`기존 데이터 : ${contextUserData.info}`}
          {...register('info')}
        ></textarea>
        {errors.contact && <p>*{errors.contact?.message}</p>}
        <input
          type="text"
          name="contact"
          placeholder={`기존 데이터 : ${contextUserData.contact}`}
          {...register('contact', {
            onChange: (e) => {
              formatPhoneNumber(e);
            },
          })}
        />
        {errors.password && <p>*{errors.password?.message}</p>}
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          {...register('password')}
        />
        {errors.checkPassword && <p>*{errors.checkPassword?.message}</p>}
        <input
          type="password"
          name="checkPassword"
          placeholder="비밀번호 확인"
          {...register('checkPassword')}
        />
      </div>
      <hr />
      <div className={style.buttonContainer}>
        <button type="submit">수정하기</button>
        <button
          type="button"
          onClick={() => {
            reset();
          }}
        >
          다시쓰기
        </button>
      </div>
    </form>
  );
}
