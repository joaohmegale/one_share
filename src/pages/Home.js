import React from 'react'
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const endOfPosts = useRef();
  const navigate = useNavigate();


  useEffect(() => {
    axios.get('http://localhost:3001/posts').then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  // useEffect(() => {
  //   endOfPosts.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [listOfPosts])

  return (
    <div>
      {listOfPosts.map((value) => {
        return (
          <div className='post' key={value.id} onClick={() => navigate(`/posts/byId/${value.id}`)}>
            <div className='title'>{value.title}</div>
            <div className='body'>{value.postText}</div>
            <div className='footer'>{value.username}</div>
          </div>
        )
      })}
      <div ref={endOfPosts} />
    </div>
  )
}

export default Home