import { useState, useEffect } from 'react';
import { Container, Typography, CircularProgress, Box, Alert } from '@mui/material';
import { getPriorityNotifications } from '../services/api';
import NotificationCard from '../components/NotificationCard';
import { getReadIds } from '../utils/readStatus';
import { Log } from '../../../logging_middleware/logger';

export default function PriorityNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Log('frontend', 'INFO', 'page', 'PriorityNotifications loaded');
    
    const fetchAndSort = async () => {
      try {
        setLoading(true);
        const data = await getPriorityNotifications();
        
        let allNotifs = [];
        if (Array.isArray(data)) allNotifs = data;
        else if (data && data.notifications) allNotifs = data.notifications;
        else if (data && data.data && Array.isArray(data.data)) allNotifs = data.data;

        const readIds = getReadIds();
        
        const priorityMap = {
          'Placement': 3,
          'Result': 2,
          'Event': 1
        };

        const sorted = [...allNotifs].sort((a, b) => {
          const aRead = readIds.includes(a.id);
          const bRead = readIds.includes(b.id);
          if (aRead !== bRead) {
            return aRead ? 1 : -1;
          }

          const pA = priorityMap[a.type] || 0;
          const pB = priorityMap[b.type] || 0;
          if (pA !== pB) {
            return pB - pA;
          }

          const tA = new Date(a.timestamp).getTime();
          const tB = new Date(b.timestamp).getTime();
          return tB - tA;
        });

        setNotifications(sorted.slice(0, 10));
      } catch (err) {
        setError('Failed to load priority notifications.');
        Log('frontend', 'ERROR', 'page', `Fetch prio err: ${err.message}`.substring(0,48));
      } finally {
        setLoading(false);
      }
    };

    fetchAndSort();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" mb={3} fontWeight="bold">
        Priority Notifications
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {notifications.length === 0 && !error ? (
            <Typography variant="body1" color="text.secondary" textAlign="center" my={5}>
              No priority notifications found.
            </Typography>
          ) : (
            notifications.map(notif => (
              <NotificationCard key={notif.id} notification={notif} />
            ))
          )}
        </>
      )}
    </Container>
  );
}
