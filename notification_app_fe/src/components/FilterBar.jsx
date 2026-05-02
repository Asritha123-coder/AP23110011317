import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Log } from '../../../logging_middleware/logger';

export default function FilterBar({ type, setType, limit, setLimit }) {
  const handleTypeChange = (e) => {
    setType(e.target.value);
    Log('frontend', 'INFO', 'component', `Filter set to ${e.target.value}`.substring(0,48));
  };

  const handleLimitChange = (e) => {
    setLimit(e.target.value);
    Log('frontend', 'INFO', 'component', `Page size set to ${e.target.value}`.substring(0,48));
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
      <FormControl sx={{ minWidth: 150 }} size="small">
        <InputLabel>Type</InputLabel>
        <Select value={type} label="Type" onChange={handleTypeChange}>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Event">Event</MenuItem>
          <MenuItem value="Result">Result</MenuItem>
          <MenuItem value="Placement">Placement</MenuItem>
        </Select>
      </FormControl>
      
      <FormControl sx={{ minWidth: 120 }} size="small">
        <InputLabel>Page Size</InputLabel>
        <Select value={limit} label="Page Size" onChange={handleLimitChange}>
          <MenuItem value={5}>5 per page</MenuItem>
          <MenuItem value={10}>10 per page</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
