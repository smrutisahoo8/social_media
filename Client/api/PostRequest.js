import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const getTimelinePosts = (id) => API.get(`/post/${id}/timeline`);
export const likePost = (id, userId) => API.put(`post/${id}/like`, { userId: userId });
export const commentPost = (id, userId) => API.put(`post/${id}/comment`, { userId: userId });
export const addComment = (data) => API.put(`post`, data);

