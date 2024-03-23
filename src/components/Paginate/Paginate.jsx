import Pagination from '@mui/material/Pagination';
import { style } from './styles'
import { PaginationItem } from '@mui/material';
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../redux/posts'
import { selectNumberOfPages } from '../../redux/posts';

export default function Paginate({ page }) {
  const dispatch = useDispatch()
  const numberOfPages = useSelector(selectNumberOfPages)

  useEffect(() => {
    if (page) dispatch(fetchPosts(page))
  }, [page, dispatch])

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
    <Pagination 
      
      count={numberOfPages}
      page={Number(page) || 1}
      color='primary'
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
    </div>
  )
}