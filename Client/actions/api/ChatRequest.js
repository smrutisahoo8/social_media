import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000'});

export const createChat = (data)=> API.post(`/chat/`, data);

export const deleteChat = (data)=> API.delete(`/chat/`, data);

export const userChats = (id)=> API.get(`/chat/${id}`);