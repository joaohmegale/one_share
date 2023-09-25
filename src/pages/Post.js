import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Post() {
  let { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPost(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, []);

  const addComment = () => {
    console.log(sessionStorage.getItem("accessToken"))
    axios.post(`http://localhost:3001/comments`,
      {
        commentBody: newComment,
        PostId: id
      },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        }
      }
    )
      .then((response) => {
        if (response.data.error) {
          toast.error("Voce precisa estar logado para comentar");
        } else {
          setComments([...comments, response.data]);
          setNewComment("");
          toast.success('Comentario feito com sucesso.');
        }
      })
  }

  return (
    <div className='postPage'>
      <div className='leftSide'>
        <div className='post' id='individual'>
          <div className='title'>{post.title}</div>
          <div className='body'>{post.postText}</div>
          <div className='footer'>
            {post.username}
          </div>
        </div>
      </div>
      <div className='rightSide'>
        <div className='commentContainer'>
          <input type='text' placeholder='Make a comment!' autoComplete='off' value={newComment} onChange={(e) => { setNewComment(e.target.value) }} />
          <button onClick={addComment}> Add a comment</button>
        </div>
        <div className='commentList'>
          {comments.map((comment, key) => {
            return (
              <div className='comment' key={key}> 
              {comment.commentBody}
              <label> Username: {comment.username}</label>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Post;