import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = 'http://localhost:3001'

let config = {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }
}

export const getInfo = createAsyncThunk('users/info', async () => {
  const { data } = await axios.get(`${api}/auth/info`, config);

  return data;
});

export const login = createAsyncThunk('auth/login', async (loginData) => {
  const { data } = await axios.post(`${api}/auth/login`, loginData, config);

  return data;
});