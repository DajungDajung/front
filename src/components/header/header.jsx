import Logo from '../../assets/Logo.png';
import searchIcon from '../../assets/searchIcon.png';
import { useEffect, useRef, useState } from 'react';
import styles from './header.module.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { createPortal } from 'react-dom';

function DropdownPortal({ children }) {
  return createPortal(children, document.body);
}

function Header() {
  const [nickname, setNickname] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [dropdownPos, setDropDownPos] = useState({ top: 0, left: 0 });
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const storedNickname = localStorage.getItem('nickname');
    setNickname(storedNickname || '');
    setShowDropdown(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim() === '') {
      return;
    }
    navigate(`/items?q=${encodeURIComponent(searchInput.trim())}`);
    setSearchInput('');
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('로그아웃 하시겠습니까?');
    if (!confirmLogout) {
      return;
    }

    axiosInstance
      .delete('/auth/logout')
      .then(() => {
        localStorage.removeItem('nickname');
        setNickname('');
        navigate('/');
        console.log('로그아웃 완료');
      })
      .catch((err) => {
        console.log(err);
        alert('로그아웃을 실패하였습니다.\n다시 시도해주세요.');
      });
  };

  useEffect(() => {
    if (showDropdown && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setDropDownPos({
        top: rect.bottom + 5,
        left: rect.left,
      });
    }
  }, [showDropdown]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img src={Logo} className={styles.logo} alt="로고" />
        </Link>

        <form className={styles.searchBox} onSubmit={handleSearch}>
          <input
            placeholder="검색어를 입력하세요"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <img
            className={styles.searchIcon}
            src={searchIcon}
            alt="검색"
            onClick={handleSearch}
          />
        </form>

        <div className={styles.navItems}>
          <Link to="/chats" className={styles.chating}>
            채팅하기
          </Link>
          <Link to="/items/create" className={styles.selling}>
            판매하기
          </Link>

          {nickname ? (
            <div
              className={styles.dropdownWrapper}
              onClick={() => setShowDropdown(!showDropdown)}
              ref={wrapperRef}
            >
              <span className={styles.nickname}>{nickname}</span>
              {showDropdown && (
                <DropdownPortal>
                  <div
                    className={styles.dropdown}
                    ref={dropdownRef}
                    style={{
                      position: 'absolute',
                      top: `${dropdownPos.top}px`,
                      left: `${dropdownPos.left}px`,
                      zIndex: 9999,
                    }}
                  >
                    <Link to="/users/mypage" className={styles.dropdownItem}>
                      마이페이지
                    </Link>
                    <button
                      className={styles.dropdownItem}
                      onClick={handleLogout}
                    >
                      로그아웃
                    </button>
                  </div>
                </DropdownPortal>
              )}
            </div>
          ) : (
            <Link to="/signin" className={styles.login}>
              로그인
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
