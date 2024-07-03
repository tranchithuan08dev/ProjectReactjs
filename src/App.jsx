import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import './assets/css/bootstrap-tcl.css';
import './assets/css/main.css';
import Footer from './components/Footer';
import Header from './components/Header';
import CategoryPage from './pages/CategoryPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SearchPage from './pages/SearchPage';
import { fetchCategoriesList } from './store/categoriesSlice';
import { fetchMenuList } from './store/menuSlice';
import { fetchMe } from './store/authSlice';
import ResgiterPage from './pages/ResgiterPage';

import PostDetailPage from './pages/PostDetailPage';
// import ChangePassPage from './pages/ChangePassPage';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Dashboard/Profile/index';
import ChangePasseWord from './pages/Dashboard/ChangePassword';
import NewPost from './pages/Dashboard/NewPost';

import NewUser from './pages/Dashboard/Management/NewUser';

import PostPage from './pages/Dashboard/PostPage';


function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesList());
    dispatch(fetchMenuList())
    dispatch(fetchMe())
  }, []);
  //check true false
  const isDashboard = location.pathname.includes('dashboard');
  return (
    <div className="wrapper-content">
      {!isDashboard && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<ResgiterPage />} />
        {/* <Route path="/changePass" element={<ChangePassPage />} /> */}
        <Route path="/search" element={<SearchPage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/post/:slug" element={<PostDetailPage />} />
        <Route element={<Dashboard />} >
          <Route path="/dashboard/post/:id" element={< PostPage />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/new-post" element={<NewPost />} />
          <Route path="/dashboard/new-user" element={<NewUser />} />
          {/* <Route path="/dashboard/all-user" element={<AllUser />} /> */}
          <Route path="/dashboard/change-password" element={<ChangePasseWord />} />
        </Route>
      </Routes>
      <div className="spacing" />
      {!isDashboard && <Footer />}
    </div>
  );
}

export default App;
