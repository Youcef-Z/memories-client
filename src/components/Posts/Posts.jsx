import Post from './Post/Post';
import { style } from './styles'
import { Grid, CircularProgress, Paper } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import { selectAllPosts, selectPostsStatus, selectPostsError, fetchPosts } from '../../redux/posts';
import { useEffect } from 'react';

export default function Posts() {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)
  const postsStatus = useSelector(selectPostsStatus)
  const postsError = useSelector(selectPostsError)

  if (postsStatus === 'loading') {
    return (
      <div style={style.loadingPaper}>
        <CircularProgress />
      </div>
    )
  }
  
  return (
    
    <Grid sx={style.container} container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid item key={post._id} xs={12} sm={6}>
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
    
  )
}