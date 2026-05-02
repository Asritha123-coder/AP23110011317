import { useState, useEffect } from 'react';
import { Container, Typography, CircularProgress, Box, Alert } from '@mui/material';
import { getNotifications } from '../services/api';
import NotificationCard from '../components/NotificationCard';
import FilterBar from '../components/FilterBar';
import PaginationBar from '../components/PaginationBar';
import { Log } from '../../../logging_middleware/logger';

export default function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [type, setType] = useState('All');
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    Log('frontend', 'INFO', 'page', 'AllNotifications loaded');
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getNotifications(page, limit, type);
        
        if (Array.isArray(data)) {
          setNotifications(data);
          setTotalPages(data.length === limit ? page + 1 : page);
        } else if (data && data.notifications) {
          setNotifications(data.notifications);
          setTotalPages(data.totalPages || Math.ceil(data.total / limit) || 1);
        } else if (data && data.data && Array.isArray(data.data)) {
          setNotifications(data.data);
          setTotalPages(data.totalPages || Math.ceil(data.total / limit) || 1);
        } else {
          setNotifications([]);
        }
      } catch (err) {
        setError('Failed to load notifications. Please try again.');
        Log('frontend', 'ERROR', 'page', `Fetch err: ${err.message}`.substring(0,48));
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [page, limit, type]);

  useEffect(() => {
    setPage(1);
  }, [type, limit]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" mb={3} fontWeight="bold">
        All Notifications
      </Typography>
      
      <FilterBar type={type} setType={setType} limit={limit} setLimit={setLimit} />

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {notifications.length === 0 && !error ? (
            <Typography variant="body1" color="text.secondary" textAlign="center" my={5}>
              No notifications found.
            </Typography>
          ) : (
            notifications.map(notif => (
              <NotificationCard key={notif.id} notification={notif} />
            ))
          )}

          <PaginationBar count={totalPages} page={page} setPage={setPage} />
        </>
      )}
    </Container>
  );
}
