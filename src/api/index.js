import axios from 'axios'

// const API = axios.create({ baseURL: 'https://memories-server-lncb.onrender.com' })
const API = axios.create({ baseURL: 'http://localhost:5000' })

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }
  return req
})

export const fetchPost = async (id) => {
  const res = await API.get(`/posts/${id}`)
  return res
}

export const fetchPosts = async (page) => {
  const res = await API.get(`/posts?page=${page}`)
  return res
}

export const fetchPostsBySearch = async (searchQuery) => {
  const res = await API.get(`/posts/search?searchQuery=${searchQuery.searchTerm || 'none'}&tags=${searchQuery.tags}`)
  return res
}

export const createPost = async (newPost) => {
  const res = await API.post('/posts', newPost)
  return res
}

export const updatePost = async (id, updatedPost) => {
  const res = await API.patch(`/posts/${id}`, updatedPost)
  return res
}

export const deletePost = async (id) => {
  const res = await API.delete(`/posts/${id}`)
  return res
}

export const likePost = async (id) => {
  const res = await API.patch(`/posts/${id}/likePost`)
  return res
}

// ******************************************************** //

export const login = (formData) => API.post('/user/login', formData)
export const signup = (formData) => API.post('/user/signup', formData)

// ******************************************************** //

export const doesEmailExist = async (email) => {
  const res = await API.post('/user/doesEmailExist', { email })
  return res
} 
