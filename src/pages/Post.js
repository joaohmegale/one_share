import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import editImage from '../img/editImage.png';
import { useNavigate } from 'react-router-dom';

function Post() {
  const { username } = useSelector(state => state);
  let { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editing, setEditing] = useState(false);
  const [newPostText, setNewPostText] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPost(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, [axios]);

  const addComment = () => {
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
    ).then((response) => {
      if (response.data.error) {
        toast.error("Voce precisa estar logado para comentar");
      } else {
        setComments([...comments, response.data]);
        setNewComment("");
        toast.success('Comentario feito com sucesso.');
      }
    })
  }

  const deleteComment = (id) => {
    axios.delete(`http://localhost:3001/comments/${id}`,
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
          infosUser: localStorage.getItem("infosUser"),
        }
      }
    ).then(() => {
      setComments(comments.filter((value) => {
        return value.id !== id;
      })
      )
      toast.success('Comentario deletado.');
    });
  }

  const update = () => {
    setEditing(true);
  }

  const saveUpdate = () => {
    const data = {
      id: id,
      postText: newPostText,
    }

    if (post.username !== username) {
      toast.error('Voce nao é o autor do post');
    } else {
      axios.put(`http://localhost:3001/posts/byid/${id}`, data)
        .then((response) => {
          return response.data,
            toast.success('Post atualizado com sucesso.'),
            setPost(data),
            setEditing(false),
            navigate('/')
        })
    }
  }

  const deletePost = () => {
    const data = { id: id }

    if (post.username !== username) {
      toast.error('Voce nao é o autor do post');
    } else {
      axios.delete(`http://localhost:3001/posts/byId/${id}`, data)
        .then((response) => {
          return response.data,
          toast.success('Post deletado com sucesso'),
          navigate('/')
        });
    }
  }

  return (
    <div className='postPage'>
      <div className='leftSide'>
        <div className='post' id='individual'>
          {editing ? (
            <>
              <div className='updatePostArea'>
                <div className='updateTitleArea'>Atualize o post</div>
                {/* <div className='updateHeader'>
                  <input type="text" value={newTitle} placeholder='Digite o novo titulo...' onChange={(e) => setNewTitle(e.target.value)} />
                </div> */}
                <div className='updateBody'>
                  <input value={newPostText} placeholder='Digite o novo texto' onChange={(e) => setNewPostText(e.target.value)} />
                </div>
                <button onClick={saveUpdate}>Salvar</button>
                <button onClick={deletePost}>Apagar</button>
              </div>
            </>
          ) : (
            <>
              <div className='title'>{post.title}</div>
              <div className='body'>
                <div className='editImageContainer'>
                  <img onClick={update} src={editImage} />
                </div>
                {post.postText}
              </div>
              <div className='footer'>
                {post.username}
              </div>
            </>
          )}
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
                <label>{comment.username}</label>
                {username === comment.username && localStorage.getItem('infosUser') &&
                  <button className='deleteButton' onClick={() => deleteComment(comment.id)}>Delete</button>}
              </div>
            )
          })}
        </div>
      </div>
    </div >
  )
}

export default Post;