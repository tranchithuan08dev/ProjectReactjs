/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function HeaderMenus(props) {
  const menuList = useSelector((state) => (state.MENU.list));

  const { currentUser, token } = useSelector((state) => state.AUTH);

  function mappingData(item) {
    return (
      <li key={item.id}>
        <a href="/">{item.title}</a>
        {item.childItems.length > 0 && <ul>{item.childItems.map(mappingData)}</ul>}
      </li>
    )
  }
  return (

    <div className="header-nav">
      <ul className="header-nav__lists">
        {menuList.map((mappingData))}
      </ul>
      <ul className="header-nav__lists">
        {!token &&

          <>
            <li className="user">
              <Link to="/login">
                Đăng Nhập
              </Link>
            </li>
            <li className="user">
              <Link to="/register">
                Đăng Ký
              </Link>
            </li></>}
        {token && <li><a href=""><i className="icons ion-person" /> {currentUser.name}</a>
          <ul>
            <li>
              <Link to="/dashboard/post-page">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/ChangePass">
                ChangePass
              </Link>
            </li>
            <li>
              <Link to="/Profile">
                Profile
              </Link>
            </li>
          </ul>
        </li>}



      </ul>
    </div>
  );
}

export default HeaderMenus;
