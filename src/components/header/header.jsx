import Logo from '../../assets/Logo.png'
import searchIcon from '../../assets/searchIcon.png'
import styles from './header.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginStore } from '../../store/useAuthStore'
import { axiosInstance } from '../../api/axiosInstance'

function Header() {
  const isLogined = useLoginStore((state) => state.isLogined);
  const setLogout = useLoginStore((state) => state.setLogOut);
  const navigate = useNavigate()

  const handleLogout = () => {
    axiosInstance.delete('/auth/logout')
      .then((res) => {
        setLogout();
        alert('로그아웃 되었습니다.');
        navigate('/dajungdajung');
      }).catch(err => {
        console.log(err)
        alert('로그아웃 실패!')
      })
  }

  return (
    <nav>
      <div className={styles.container}>
        <Link to='/dajungdajung' className={styles.logo}>
          <img src={Logo} className={styles.logo} />
        </Link>
        <form className={styles.searchBox} method='post'>
          <input placeholder='검색어를 입력하세요' />
          <img className={styles.searchIcon} src={searchIcon} />
        </form>
        <div className={styles.navItems}>
          <Link to='/' className={styles.chating}>채팅하기</Link>
          <Link to='/items/create' className={styles.selling}>판매하기</Link>
          {
            isLogined ? (
              <Link to='#' onClick={handleLogout} className={styles.login}>로그아웃</Link>
            ) : (
              <Link to='/login' className={styles.login}>로그인</Link>
            )
          }
        </div>
      </div>
    </nav>
  )
}

export default Header;
