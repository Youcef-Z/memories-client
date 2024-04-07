import { Container, Typography, Grow, Grid, Paper, AppBar, TextField, Button, Chip, Autocomplete } from '@mui/material'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import { style } from './styles'
import Paginate from '../Paginate/Paginate'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '../../lib/hooks'
import { useEffect, useState } from 'react'
import { fetchPosts, fetchPostsBySearch } from '../../redux/posts'
import { useDispatch } from 'react-redux'

export default function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const query = useQuery()
  const page = query.get('page') || 1
  const searchQuery = query.get('searchQuery')
  const tagsQuery = query.get('tags')
  const [searchTerm, setSearchTerm] = useState('')
  const [tags, setTags] = useState([])

  useEffect(() => {
    if (searchQuery || tagsQuery) {
      dispatch(fetchPostsBySearch({ searchTerm: searchQuery || 'none', tags: tagsQuery || 'none' }))
    } else {
      navigate('/')
    }

  }, [dispatch, searchQuery, navigate])

  const searchPosts = () => {
    if (searchTerm.trim() || tags.length > 0) {
      dispatch(fetchPostsBySearch({ searchTerm, tags: tags.join(',') }))
      navigate(`/posts/search?searchQuery=${searchTerm || 'none'}&tags=${tags.join(',')}`)
    } else {
      navigate('/')
    }
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPosts()
    }
  }

  const handleTagsChange = (newTags) => {
    setTags(newTags)
  }

  return (
    <Grow in>
      <Container>
        <Grid sx={style.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={8}>
            <Posts />
          </Grid>
          <Grid item xs={12} sm={4}>
            <AppBar sx={style.appBarSearch} position="static" color="inherit">
              <TextField name="search" variant="outlined" label="Search Memories" fullWidth value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleKeyPress} />
              {/* <MuiChipsInput  sx={{ margin: '10px 0' }} value={tags} onChange={handleTagsChange} label='Search Tags' variant='outlined' /> */}
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
                    label="Search Tags (Type and press Enter)"
                    placeholder="Search Tags"
                  />
                )}
                onChange={(e, newTags) => handleTagsChange(newTags)}
                style={{ margin: '10px 0' }}
                value={tags}
                sx={{ width: '100%' }}
              />
              <Button onClick={searchPosts} sx={style.searchButton} color="primary" variant="contained">Search</Button>
            </AppBar>
            <Form />
            {(!searchQuery && !tags.length) && (
              <Paper sx={style.pagination} elevation={6}>
                <Paginate page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}