import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import { Log } from '../../../logging_middleware/logger';

export default function FilterBar({ type, setType, limit, setLimit, search, setSearch, sort, setSort, onMarkAllRead }) {
  const handleTypeChange = (e) => {
    setType(e.target.value);
    Log('frontend', 'INFO', 'component', `Filter set to ${e.target.value}`.substring(0,48));
  };

  const handleLimitChange = (e) => {
    setLimit(e.target.value);
    Log('frontend', 'INFO', 'component', `Page size set to ${e.target.value}`.substring(0,48));
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    Log('frontend', 'INFO', 'component', `Sort set to ${e.target.value}`.substring(0,48));
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
      <TextField 
        label="Search Messages" 
        variant="outlined" 
        size="small" 
        value={search} 
        onChange={handleSearchChange}
        sx={{ minWidth: 200, flexGrow: 1 }}
      />
      <FormControl sx={{ minWidth: 150 }} size="small">
        <InputLabel>Type</InputLabel>
        <Select value={type} label="Type" onChange={handleTypeChange}>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Event">Event</MenuItem>
          <MenuItem value="Result">Result</MenuItem>
          <MenuItem value="Placement">Placement</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 150 }} size="small">
        <InputLabel>Sort By</InputLabel>
        <Select value={sort} label="Sort By" onChange={handleSortChange}>
          <MenuItem value="Newest">Newest First</MenuItem>
          <MenuItem value="Oldest">Oldest First</MenuItem>
          <MenuItem value="Priority">Priority First</MenuItem>
          <MenuItem value="Unread">Unread First</MenuItem>
        </Select>
      </FormControl>
      {setLimit && (
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel>Page Size</InputLabel>
          <Select value={limit} label="Page Size" onChange={handleLimitChange}>
            <MenuItem value={5}>5 per page</MenuItem>
            <MenuItem value={10}>10 per page</MenuItem>
          </Select>
        </FormControl>
      )}
      <Button variant="contained" color="secondary" onClick={onMarkAllRead}>
        Mark All Read
      </Button>
    </Box>
  );
}
