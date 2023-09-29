import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Registration from './pages/Registration';
import NavBar from './pages/NavBar';
import Error from './pages/Error';

import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const dispatch = useDispatch();
  useSelector(state => state);
  useEffect(() => {
    axios.get("http://localhost:3001/auth", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
      if (response.data.error) {
        dispatch({
          type: 'LOGOUT'
        });
      } else {
        dispatch({
          type: 'LOGIN',
        });
      }
    });
  }, [dispatch])

  return (
    <div className="App">
      <ToastContainer autoClose={2000} />
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' exact Component={Home} />
          <Route path='/createpost' exact Component={CreatePost} />
          <Route path='/posts/byId/:id' exact Component={Post} />
          <Route path='/login' exact Component={Login} />
          <Route path='/registration' exact Component={Registration} />

          <Route path='*' exact Component={Error} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
