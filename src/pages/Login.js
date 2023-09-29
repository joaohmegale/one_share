import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    const data = { username: username, password: password };

    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('infosUser', response.data.user.username);
        dispatch({
          type: 'LOGIN',
          id: response.data.user.id,
          username: response.data.user.username,
        });
        toast.success('Usuario logado com sucesso');
        navigate('/');
      }
    });
  }

  return (
    <div>
      <div className='loginContainer'>
        <h1>Login</h1>
        <input type='text' onChange={(e) => { setUsername(e.target.value) }} placeholder='Username...'></input>
        <input type='password' onChange={(e) => { setPassword(e.target.value) }} placeholder='Password...'></input>
        <button onClick={login}>Login</button>
      </div>
    </div>
  )
}

export default Login