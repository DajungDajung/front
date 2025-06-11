import { NavLink } from 'react-router';
import style from './sidebar.module.css';

export default function Sidebar() {
  return (
    <div>
      <div className={style.a}></div>
      <div className={style.b}>
        <div className={style.Sidebar}>
          <h1>마이페이지</h1>
          <NavLink
            to="mypage"
            className={({ isActive }) =>
              isActive ? style.sidebarItemActive : style.sidebarItem
            }
            end
          >
            유저 정보 조회
          </NavLink>
          <NavLink
            to="mypage/update"
            className={({ isActive }) =>
              isActive ? style.sidebarItemActive : style.sidebarItem
            }
            end
          >
            유저 정보 수정
          </NavLink>
          <NavLink
            to="upload"
            className={({ isActive }) =>
              isActive ? style.sidebarItemActive : style.sidebarItem
            }
            end
          >
            등록한 상품
          </NavLink>
          <NavLink
            to="likes"
            className={({ isActive }) =>
              isActive ? style.sidebarItemActive : style.sidebarItem
            }
            end
          >
            좋아요
          </NavLink>
          <NavLink
            to="unsubscribe"
            className={({ isActive }) =>
              isActive ? style.sidebarItemActive : style.sidebarItem
            }
            end
          >
            탈퇴하기
          </NavLink>
        </div>
      </div>
    </div>
  );
}
