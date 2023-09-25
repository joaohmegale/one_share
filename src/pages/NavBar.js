import React from 'react'
import '../../src/App.css';
import amigoLogo from '../img/amigoLogo.png';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSessionInfo } from '../reducers/session';
import { useSelector } from 'react-redux';

function NavBar() {

  const { user, loading } = useSelector(getSessionInfo);

  console.log(loading)
 
  return (

    <div className='navbar'>
      {!loading && (  
      <div className='navbarLinks'>
        <img src={amigoLogo} alt="logo" />
        <Link to="/">Home</Link>
        <Link to="/createpost">Create a post</Link>
        {!user?.username && (
          <>
            <Link to="/login">login</Link>
            <Link to="/registration">Register</Link>
          </>
        )
        }
      </div>
      )}
      <div>
        <Link to="/">
          <h2>One Share</h2>
        </Link>
      </div>
    </div>

  )
}

export default NavBar;