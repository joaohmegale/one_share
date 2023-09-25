import React from 'react'
import { useState, useCallback } from 'react';
// import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as loginProcess, getInfo } from '../processes/session';


function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  //const [newUsername, setnewUsername] = useState('');
  const [password, setPassword] = useState('');
  //const [newPassword, setnewPassword] = useState('');

  const login = useCallback(async () => {
    console.log('esta clicando');
    const data = { username, password };

    const { payload } = await dispatch(loginProcess(data));

    if(payload){
      await dispatch(getInfo()); 

      navigate('/');
    }else {
      toast.error('Login failed');
    }
  }, [dispatch, username, password]); 

    // axios.post("http://localhost:3001/auth/login", data).then((response) => {
    //   if (response.data.error) {
    //     toast.error(response.data.error);
    //   }else{
    //     localStorage.setItem('accessToken', response.data);
    //     toast.success('Usuario logado com sucesso');
    //     navigate('/');
    //   }
    // });
  

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

export default Login;