import React, { useState } from 'react'
import './header.css'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/apiCalls/authApiCall';

const Header = () => {
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [dropdown, setDropdown] = useState(false);

    const navigate = useNavigate();


  // Logout Handler
  const logoutHandler = () => {
    dispatch(logoutUser())
    setDropdown(false);
    navigate('/')
  }

  return (
    <header className="header">
        <div className="header-left">
        <div className="header-logo">
        <strong>KEMO</strong>
        <i className="bi bi-pencil"></i>
      </div>
      <div onClick={() => setToggle((prev) => !prev)} className="header-menu">
        {toggle ? (
          <i className="bi bi-x-lg"></i>
        ) : (
          <i className="bi bi-list"></i>
        )}
      </div>
        </div>
        <nav
      style={{ clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      className="navbar"
    >
      <ul className="nav-links">
        <Link to="/" onClick={() => setToggle(false)} className="nav-link">
          <i className="bi bi-house"></i> Home
        </Link>
        <Link to="/posts" onClick={() => setToggle(false)} className="nav-link">
          <i className="bi bi-stickies"></i> Posts
        </Link>
        {
          user && (
            <Link to="/posts/create-post" onClick={() => setToggle(false)} className="nav-link">
              <i className="bi bi-journal-plus"></i> Create
           </Link>
          )
        }
        {
          user?.isAdmin && (
            <Link to="/admin-dashboard" onClick={() => setToggle(false)} className="nav-link">
             <i className="bi bi-person-check"></i> Admin Dashboard
           </Link>
          )
        }
      </ul>
    </nav>
        <div className="header-right">
          {user ?
          <>
           <div className="header-right-user-info">
            <span onClick={() => setDropdown((prev) => !prev)} className="header-right-username">
              {user?.username}
            </span>
            <img src={user?.profilePhoto.url} alt="user photo" className="header-right-user-photo" />
            {dropdown && (
              <div className="header-right-dropdown">
                <Link
                  to={`/profile/${user?._id}`}
                  className="header-dropdown-item"
                  onClick={() => setDropdown(false)}
                >
                  <i className="bi bi-file-person"></i>
                  <span>Profile</span>
                </Link>
                <div onClick={logoutHandler} className="header-dropdown-item">
                  <i className="bi bi-box-arrow-in-left"></i>
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
          </> : <>
          <Link to="/login" className="header-right-link">
            <i className="bi bi-box-arrow-in-right"></i>
            <span>Login</span>
          </Link>
          <Link to="/register" className="header-right-link">
            <i className="bi bi-person-plus"></i>
            <span>Register</span>
          </Link>
          </>
          }
        </div>
    </header>
  )
}

export default Header