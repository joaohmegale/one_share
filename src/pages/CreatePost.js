import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function CreatePost() {
  const { isLoggedIn, username } = useSelector(state => state);
  const navigate = useNavigate();

  useEffect((() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }), [])

  if (!isLoggedIn) {
    navigate('/login');
  } else { }

  const initialValues = {
    title: "",
    postText: "",
    username: username,
  }

  const validationSchema = Yup.object({
    title: Yup.string().required(),
    postText: Yup.string().required(),
    username: Yup.string().min(3).max(20).required(),
  })

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data, {
      headers: {
        accessToken: localStorage.getItem('accessoken'),
      }
    }).then(
      toast.success('Post criado com sucesso'),
      navigate('/')
    ).catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className='createPostPage'>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className='formContainer'>
          <h1>Create a post</h1>
          <ErrorMessage name='titles' component="span" />
          <Field autoComplete="off" id="inputCreatePost" name="title" placeholder="Title..." />
          <ErrorMessage name='post' component="span" />
          <Field autoComplete="off" id="inputCreatePost" name="postText" placeholder="Text..." />
          <button type='submit'>Create Post</button>
        </Form>
      </Formik>
    </div>
  )
}

export default CreatePost;