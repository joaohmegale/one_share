import React, { useEffect } from 'react'
import '../../src/App.css';
import amigoLogo from '../img/amigoLogo.png';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector(state => state);
  const dispatch = useDispatch();
  const localStorageItens = ['accessToken', 'infosUser']

  const logout = function () {
    localStorageItens.forEach(item => {
      localStorage.removeItem(item)
    })
    dispatch({
      type: 'LOGOUT',
    });
    toast.success('Usuario desconectado com sucesso.');
    navigate('/login');
  }

  return (
    <div className='navbar'>
      <div className='navbarLinks'>
        <Link to='/'>
          <img src={amigoLogo} alt="logo" />
        </Link>
        {!isLoggedIn ? (
          <>
            <Link to="/login">login</Link>
            <Link to="/registration">Register</Link>
          </>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link to="/createpost">Create a post</Link>
            <button className='logoutButton' onClick={logout}>Logout</button>
          </>
        )}
      </div>
      <div>
        {/* <Link to="/">
          <h2>One Share</h2>
        </Link> */}
      </div>
    </div>
  )
}

export default NavBar;