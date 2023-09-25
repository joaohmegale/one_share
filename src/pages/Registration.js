import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';


function Registration() {

  const initialValues = {
    username: "",
    password: "",
  }

  const validationSchema = Yup.object({
    username: Yup.string().min(3).max(20).required(),
    password: Yup.string().min(4).max(20).required(),
  })

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then((response) => {
      if (response.data.type === "success") {
        toast.success('Registro feito com sucesso');
      } else {
        toast.error('Usuario ja existente');
      }
    })
  };

  return (
    <div><Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      <Form className='formContainer'>
        <h1>Registration</h1>
        <ErrorMessage name='username' component="span" />
        <Field autoComplete="off" id="inputCreatePost" name="username" placeholder="Username..." />
        <ErrorMessage name='password' component="span" />
        <Field type="password" autoComplete="off" id="inputCreatePost" name="password" placeholder="password..." />
        <button type='submit'>Register</button>
      </Form>
    </Formik></div>
  )
}

export default Registration