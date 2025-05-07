import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import UserInfos from './pages/UserInfos/userInfos';
import ItemsCreate from './pages/items/ItemsCreate';
import ItemsSearch from './pages/items/ItemsSearch';
import ItemsDetail from './pages/items/ItemsDetail';
import ItemsEdit from './pages/items/ItemsEdit';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import FindId from './pages/FindId/FindId';
import ResetPwd from './pages/ResetPwd/ResetPwd';
import NewPwd from './pages/NewPwd/NewPwd';
import DajungDajung from './pages/MainHome/DajungDajung';
import UserInfo from './components/userInfo/userInfo';
import MyPage from './pages/MyPage/myPage';
import UpdateInfo from './components/updateInfo/UpdateInfo';
import Unsubscribe from './pages/unsubscribe/Unsubscribe';
import UploadItems from './pages/UploadItems/UploadItems';
import UserLikes from './pages/UserLikes/UserLikes';

function App() {
  // const { data, loading, error } = defaultApi('get', '');
  // console.log(data);

  return (
    <div className="app-wrapper">
      <Header />

      <main className="main-content">
        <Routes>
          <Route path='/store/:id' element={<UserInfos />} />
          <Route path="/items/create" element={<ItemsCreate />} />
          <Route path="/items" element={<ItemsSearch />} />
          <Route path="/items/:id" element={<ItemsDetail />} />
          <Route path="/items/edit/:id" element={<ItemsEdit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/findid" element={<FindId />} />
          <Route path="/resetpwd" element={<ResetPwd />} />
          <Route path="/newpwd" element={<NewPwd />} />
          <Route path="/dajungdajung" element={<DajungDajung />} />
          <Route path='/users' element={<MyPage />}>
            <Route path='mypage' element={<UserInfo />} />
            <Route path='mypage/update' element={<UpdateInfo />} />
            <Route path='unsubscribe' element={<Unsubscribe />} />
            <Route path='upload' element={<UploadItems />} />
            <Route path='likes' element={<UserLikes />} />
          </Route>
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
