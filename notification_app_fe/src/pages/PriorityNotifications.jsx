import { useState, useEffect, useMemo } from 'react';
import { Container, Typography, CircularProgress, Box, Alert } from '@mui/material';
import { getPriorityNotifications } from '../services/api';
import NotificationCard from '../components/NotificationCard';
import FilterBar from '../components/FilterBar';
import NotificationCounts from '../components/NotificationCounts';
import { Log } from '../../../logging_middleware/logger';
import { markAllAsRead, getReadIds, isRead } from '../utils/readStatus';

export default function PriorityNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [type, setType] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('Priority');
  const [readIds, setReadIds] = useState([]);
  const [forceReadToggle, setForceReadToggle] = useState(false);

  useEffect(() => {
    Log('frontend', 'INFO', 'page', 'PriorityNotifications loaded');
    setReadIds(getReadIds());
    
    const fetchAndSort = async () => {
      try {
        setLoading(true);
        const data = await getPriorityNotifications();
        
        let allNotifs = [];
        if (Array.isArray(data)) allNotifs = data;
        else if (data && data.notifications) allNotifs = data.notifications;
        else if (data && data.data && Array.isArray(data.data)) allNotifs = data.data;

        setNotifications(allNotifs);
      } catch (err) {
        setError('Failed to load priority notifications.');
        Log('frontend', 'ERROR', 'page', `Fetch prio err: ${err.message}`.substring(0,48));
      } finally {
        setLoading(false);
      }
    };

    fetchAndSort();
  }, []);

  const handleMarkAllRead = () => {
    markAllAsRead(notifications.map(n => n.id));
    setReadIds(getReadIds());
    setForceReadToggle(prev => !prev);
    Log('frontend', 'INFO', 'page', 'Marked all read');
  };

  const filteredAndSortedNotifications = useMemo(() => {
    let result = [...notifications];

    if (type !== 'All') {
      result = result.filter(n => n.type === type);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(n => n.message?.toLowerCase().includes(q) || n.type?.toLowerCase().includes(q));
    }

    result.sort((a, b) => {
      if (sort === 'Newest') return new Date(b.timestamp) - new Date(a.timestamp);
      if (sort === 'Oldest') return new Date(a.timestamp) - new Date(b.timestamp);
      if (sort === 'Priority') {
        const pA = a.type === 'Placement' ? 3 : a.type === 'Result' ? 2 : a.type === 'Event' ? 1 : 0;
        const pB = b.type === 'Placement' ? 3 : b.type === 'Result' ? 2 : b.type === 'Event' ? 1 : 0;
        if (pA !== pB) return pB - pA;
        return new Date(b.timestamp) - new Date(a.timestamp);
      }
      if (sort === 'Unread') {
        const readA = isRead(a.id) ? 1 : 0;
        const readB = isRead(b.id) ? 1 : 0;
        if (readA !== readB) return readA - readB;
        return new Date(b.timestamp) - new Date(a.timestamp);
      }
      return 0;
    });

    return result.slice(0, 10);
  }, [notifications, type, search, sort, forceReadToggle]); // eslint-disable-line

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          Priority Notifications
        </Typography>
      </Box>

      <NotificationCounts notifications={notifications} readIds={readIds} />

      <FilterBar 
        type={type} 
        setType={setType} 
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        onMarkAllRead={handleMarkAllRead}
      />

      {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {filteredAndSortedNotifications.length === 0 && !error ? (
            <Alert severity="info" sx={{ borderRadius: 2 }}>
              No priority notifications match your current filters.
            </Alert>
          ) : (
            filteredAndSortedNotifications.map(notif => (
              <NotificationCard 
                key={notif.id} 
                notification={notif} 
                forceRead={forceReadToggle} 
                onRead={() => setReadIds(getReadIds())}
              />
            ))
          )}
        </>
      )}
    </Container>
  );
}
