import { useEffect } from "react"
import { Paper, Typography, CircularProgress, Divider } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import moment from "moment"
import { useParams, useNavigate } from "react-router-dom"
import { selectPost, selectPostStatus, fetchPost } from "../../redux/post"

import { style } from "./styles"

export default function PostDetails() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const post = useSelector(selectPost)
  const postStatus = useSelector(selectPostStatus)
  const { id } = useParams()
  

  useEffect(() => {
    dispatch(fetchPost(id))
  }, [id, dispatch])

  if (!post) {return null}

  if (postStatus === 'loading') {
    return (
      <Paper sx={style.loadingPaper} elevation={3}>
        <CircularProgress size="6em"/>
      </Paper>
    )
  }

  if (postStatus === 'failed') {
    return (
      <Paper sx={{ padding: '20px', borderRadius: '15px'}} elevation={3}>
        <Typography>Error while fetching posts</Typography>
      </Paper>
    )
  }
  
  
  return (
    <Paper sx={{ padding: '20px', borderRadius: '15px'}} elevation={3}>
      <div style={style.card}>
        <div style={style.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div style={style.imageSection}>
          <img src={post.selectedFile} alt={post.title} style={style.media} />
        </div>
      </div>
    </Paper>
  )
  
}