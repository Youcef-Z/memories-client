import { style } from './styles'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@mui/material'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreHorzIcon from '@mui/icons-material/MoreHoriz'
import moment from 'moment'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { selectEditId, setEditId } from '../../../redux/editId'
import { deletePost, likePost } from '../../../redux/posts'
import { selectUser } from '../../../redux/auth'

export default function Post({ post }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const editId = useSelector(selectEditId)
  const user = useSelector(selectUser)

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.sub || user?._id))
        ? (
          <><ThumbUpAltIcon fontSize='small'/>&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
        ) : (
          <><ThumbUpAltOutlined fontSize='small'/>&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        )
    }
    return <><ThumbUpAltOutlined fontSize='small'/>&nbsp;Like</>
  }

  const openPost = () => {
    navigate(`/posts/${post._id}`)
  }

  return (
    <Card sx={style.card} raised elevation={3}>
      <ButtonBase sx={style.cardAction} onClick={openPost} >
        <CardMedia sx={style.media} image={post.selectedFile} title={post.title}/>
        <div style={style.overlay}>
          <Typography variant='h6'>{post.name}</Typography>
          <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {(user?.sub === post.creator || user?._id === post.creator) && (
        <div style={style.overlay2}>
          <Button sx={{...style.button, color: 'white'}} size='small' onClick={() => {dispatch(setEditId(post._id))}}>
            <MoreHorzIcon fontSize='default'/>
          </Button>
        </div>
        )}
        <div style={style.details}>
          <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography sx={style.title} variant='h5' gutterBottom>{post.title}</Typography>
        <CardContent>
          <Typography variant='body2' color="textSecondary" component="p">{post.message}</Typography>
        </CardContent>
      </ButtonBase>
      <CardActions sx={style.cardActions}>
        <Button size='small' color='primary' disabled={!user} onClick={() => dispatch(likePost(post._id))}>
          <Likes />
        </Button>
        {(user?.sub === post.creator || user?._id === post.creator) && (
          <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize='small'/>
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  )
}