import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Registration from './pages/Registration';
import NavBar from './pages/NavBar';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getInfo } from './processes/session';

import 'react-toastify/dist/ReactToastify.css';

const Root = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInfo())
    }, [dispatch]);

    return(
        <div className="App">
        <ToastContainer autoClose={3000}/>
        <Router>
          <NavBar />
          <Routes>
            <Route path='/' exact Component={Home} />
            <Route path='/createpost' exact Component={CreatePost} />
            <Route path='/posts/byId/:id' exact Component={Post} />
            <Route path='/login' exact Component={Login} />
            <Route path='/registration' exact Component={Registration} />
          </Routes>
        </Router>
      </div>
    )
}

export default Root;