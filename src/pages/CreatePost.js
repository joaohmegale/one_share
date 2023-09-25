import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';


function CreatePost() {

  const navigate = useNavigate();

  const initialValues = {
    title: "",
    postText: "",
    username: "",
  }

  const validationSchema = Yup.object({
    title: Yup.string().required(),
    postText: Yup.string().required(),
    username: Yup.string().min(3).max(20).required(),
  })

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data).then(
      navigate('/')
    ).catch((error) => {
      console.log(error);
    });
    toast.success('Post criado com sucesso');
  };

  return (
    <div className='createPostPage'>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className='formContainer'>
          <label>Title:</label>
          <ErrorMessage name='titles' component="span" />
          <Field autoComplete="off" id="inputCreatePost" name="title" placeholder="(Title...)" />
          <label>Post:</label>
          <ErrorMessage name='post' component="span" />
          <Field autoComplete="off" id="inputCreatePost" name="postText" placeholder="(Text...)" />
          <label>Username:</label>
          <ErrorMessage name='username' component="span" />
          <Field autoComplete="off" id="inputCreatePost" name="username" placeholder="(Username...)" />
          <button type='submit'>Create Post</button>
        </Form>
      </Formik>
    </div>
  )
}

export default CreatePost;