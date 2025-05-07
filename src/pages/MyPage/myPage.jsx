import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/sidebar/sidebar'
import style from './myPage.module.css'
import { BASE_URL } from '../../api/BASE_URL'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { axiosInstance } from '../../api/axiosInstance'

const outletDataRoutes = {
  info: '/users/mypage',
  item: '/items/myitem',
  like: '/users/likes'
}

const outletFrontRoutes = {
  info: '/users/mypage',
  infoUpdate: '/users/mypage/update',
  item: '/users/upload',
  like: '/users/likes',
  unsub: '/users/unsubscribe'
}

export default function MyPage() {
  const navigate = useNavigate();
  const [contextUserData, setContextUserData] = useState({});
  const [contextUserItemData, setContextUserItemData] = useState([]);
  const [contextUserLikeData, setContextUserLikeData] = useState([]);
  const location = useLocation();
  // const token = localStorage.getItem('token')

  useEffect(() => {
    const path = location.pathname;
    if (path === outletFrontRoutes.info || window.location.pathname === outletFrontRoutes.infoUpdate) {
      axiosInstance.get(outletDataRoutes.info)
        .then((response) => {
        setContextUserData(response.data[0]);
      })
      .catch(err => {
      if (err && err.response) {
        if (err.response.status === 401) {
          alert('접근권한이 없습니다.\n로그인을 해주세요');
          navigate('/login');
        } else if(err.response.status === 404) {
          return ;
        } else {
          alert('잠시 후 다시 시도해주세요');
          navigate('/dajungdajung');
        }
      } else {
        alert('잠시 후 다시 시도해주세요');
        navigate('/dajungdajung');
      }
       })
    }
    if (path === outletFrontRoutes.item) {
      axiosInstance.get(outletDataRoutes.item).then((response) => {
        setContextUserItemData(response.data);
      }).catch(err => {
        if (err && err.response) {
          if (err.response.status === 401) {
            alert('접근권한이 없습니다.\n로그인을 해주세요');
            navigate('/login');
          } else if(err.response.status === 404) {
          return ;
        }  else {
            alert('잠시 후 다시 시도해주세요');
            navigate('/dajungdajung');
          }
        } else {
          alert('잠시 후 다시 시도해주세요');
          navigate('/dajungdajung');
        }
      })
    }
    if (path === outletFrontRoutes.like) {
      axiosInstance.get(outletDataRoutes.like).then((response) => {
        setContextUserLikeData(response.data)
      }).catch(err => {
        if (err && err.response) {
          if (err.response.status === 401) {
            alert('접근권한이 없습니다.\n로그인을 해주세요');
            navigate('/login');
          } else if(err.response.status === 404) {
          return ;
        }  else {
            alert('잠시 후 다시 시도해주세요');
            navigate('/dajungdajung');
          }
        } else {
          alert('잠시 후 다시 시도해주세요');
          navigate('/dajungdajung');
        }
      })
    }
  }, [location.pathname])

  return (
    <div className={style.myPageContainer}>
      <div className={style.myPage}>
        <Sidebar />
        <Outlet context={{ contextUserData, contextUserItemData, contextUserLikeData }} />
      </div>
    </div>
  )
}
