import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (page) => {
  const { data } = await api.fetchPosts(page)
  return data
})

export const fetchPostsBySearch = createAsyncThunk('posts/fetchPostsBySearch', async (searchQuery) => {
  const { data } = await api.fetchPostsBySearch(searchQuery)
  return data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (newPost) => {
  const { data } = await api.createPost(newPost)
  return data
})

export const updatePost = createAsyncThunk('posts/updatePost', async (updatedPost) => {
  const { data } = await api.updatePost(updatedPost._id, updatedPost)
  return data
})

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  const { data } = await api.deletePost(id)
  return data
})

export const likePost = createAsyncThunk('posts/likePost', async (id) => {
  const { data } = await api.likePost(id)
  return data
})

const initialState = {
  posts: [],
  currentPage: 1,
  numberOfPages: 1,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.error = null
        state.posts = action.payload.data
        state.currentPage = action.payload.currentPage
        state.numberOfPages = action.payload.numberOfPages
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchPostsBySearch.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchPostsBySearch.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.error = null
        state.posts = action.payload
      })
      .addCase(fetchPostsBySearch.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewPost.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(addNewPost.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.error = null
        state.posts.push(action.payload)
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex((post) => post._id === action.payload._id)
        state.posts[index] = { ...state.posts[index], ...action.payload }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload)
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex((post) => post._id === action.payload._id)
        state.posts[index] = { ...state.posts[index], ...action.payload }
      })
  },
})

export const selectAllPosts = (state) => state.posts.posts
export const selectPostsStatus = (state) => state.posts.status
export const selectPostsError = (state) => state.posts.error
export const selectNumberOfPages = (state) => state.posts.numberOfPages
export const selectCurrentPage = (state) => state.posts.currentPage

export default postsSlice.reducer