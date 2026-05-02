import { Box, Pagination } from '@mui/material';
import { Log } from '../../../logging_middleware/logger';

export default function PaginationBar({ count, page, setPage }) {
  const handleChange = (event, value) => {
    setPage(value);
    Log('frontend', 'INFO', 'component', `Page changed to ${value}`.substring(0,48));
  };

  if (!count || count <= 1) return null;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
      <Pagination 
        count={count} 
        page={page} 
        onChange={handleChange} 
        color="primary" 
        size="large"
      />
    </Box>
  );
}
