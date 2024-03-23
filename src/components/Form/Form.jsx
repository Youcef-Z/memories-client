import { style } from './styles'
import { TextField, Button, Typography, Paper, Autocomplete, Chip } from '@mui/material'
import { useState, useEffect, useCallback } from 'react'
import FileBase from 'react-file-base64'
import {useDropzone} from 'react-dropzone'

import { useSelector, useDispatch } from 'react-redux';
import { addNewPost, updatePost } from '../../redux/posts'
import { selectAllPosts, selectPostsStatus, selectPostsError, fetchPosts } from '../../redux/posts';
import { selectEditId, setEditId } from '../../redux/editId'
import { selectUser } from '../../redux/auth';

export default function Form() {
  const [postData, setPostData] = useState({ title: '', message: '', tags: [], selectedFile: '' })
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const editId = useSelector(selectEditId)
  const posts = useSelector(selectAllPosts)
  const user = useSelector(selectUser)
  const [file, setFile] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    if (editId) {
      const editPost = posts.find(post => post._id === editId)
      setPostData(editPost)
    }
  }, [posts, editId])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (addRequestStatus === 'idle') {
      if (editId) {
        try {
          setAddRequestStatus('pending')
          dispatch(updatePost({ ...postData, name: user?.name }))
        } catch (error) {
          console.log(error)
        } finally {
          setAddRequestStatus('idle')
          clear()
        }
      } else {
        try {
          setAddRequestStatus('pending')
          dispatch(addNewPost({ ...postData, name: user?.name }))
        } catch (error) {
          console.log(error)
        } finally {
          setAddRequestStatus('idle')
          clear()
        }
      }
      
    }
    
  }

  const clear = () => {
    setEditId(null)
    setPostData({ title: '', message: '', tags: [], selectedFile: '' })
    setFile(null)
  }

  const onDrop = useCallback(acceptedFiles => {
    setFile(acceptedFiles[0])
    const reader = new FileReader()
    reader.readAsDataURL(acceptedFiles[0])
    reader.onload = () => {
      setPostData({...postData, selectedFile: reader.result})
    }
  }, [postData])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({ onDrop, multiple: false, accept: {'images/png': ['.png'], 'images/jpeg': ['.jpg', '.jpeg']} })

  if (!user) { 
    return (
      <Paper sx={style.paper} elevation={6}>
        <Typography variant='h6'>Please sign in to create memories.</Typography>
      </Paper>
    )
  }
  return (
    <Paper sx={style.paper}>
      <form autoComplete='off' noValidate style={style.form} onSubmit={handleSubmit}>
        <Typography variant='h6'>{editId ? 'Editing' : 'Creating'} a Memory</Typography>
        <TextField name='title' style={{margin: 7}} variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e) => { setPostData({ ...postData, title: e.target.value }) }} />
        <TextField name='message' style={{margin: 7}} variant='outlined' label='Message' fullWidth value={postData.message} onChange={(e) => { setPostData({ ...postData, message: e.target.value }) }} />
        {/* <TextField name='tags' style={{margin: 7}} variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={(e) => { setPostData({ ...postData, tags: e.target.value.split(' ') }) }} /> */}
        <Autocomplete
                multiple
                freeSolo
                id="tags-standard"
                options={[]}
                getOptionLabel={(option) => option}
                defaultValue={[]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Add Tags"
                    placeholder="Add Tags"
                  />
                )}
                onChange={(e, newTags) => setPostData({ ...postData, tags: newTags })}
                style={{ margin: 7 }}
                value={postData.tags}
                sx={{ width: '100%' }}
              />
        <div style={style.fileInput}>
          {/* <FileBase
            type='file'
            multiple={false}
            onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })}
          /> */}
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
              isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
            }
          </div>
          <Typography sx={{margin: 2, textOverflow: "ellipsis", overflow: "hidden"}}>{file && file.name}</Typography>
        </div>
        <Button style={style.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
        <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}