import { useState, useEffect, useMemo } from 'react';
import { Container, Typography, CircularProgress, Box, Alert } from '@mui/material';
import { getNotifications } from '../services/api';
import NotificationCard from '../components/NotificationCard';
import FilterBar from '../components/FilterBar';
import PaginationBar from '../components/PaginationBar';
import NotificationCounts from '../components/NotificationCounts';
import { Log } from '../../../logging_middleware/logger';
import { markAllAsRead, getReadIds, isRead } from '../utils/readStatus';

export default function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [type, setType] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('Newest');
  const [totalPages, setTotalPages] = useState(1);
  const [readIds, setReadIds] = useState([]);
  const [forceReadToggle, setForceReadToggle] = useState(false);

  useEffect(() => {
    Log('frontend', 'INFO', 'page', 'AllNotifications loaded');
    setReadIds(getReadIds());
  }, []);

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
        setTotalPages(data.totalPages || Math.ceil((data.total || 100) / limit) || 1);
      } else if (data && data.data && Array.isArray(data.data)) {
        setNotifications(data.data);
        setTotalPages(data.totalPages || Math.ceil((data.total || 100) / limit) || 1);
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

  useEffect(() => {
    fetchNotifications();
    // eslint-disable-next-line
  }, [page, limit]);

  useEffect(() => {
    setPage(1);
  }, [type, limit, search, sort]);

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

    return result;
  }, [notifications, type, search, sort, forceReadToggle]); // eslint-disable-line

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          All Notifications
        </Typography>
      </Box>

      <NotificationCounts notifications={notifications} readIds={readIds} />

      <FilterBar 
        type={type} 
        setType={setType} 
        limit={limit} 
        setLimit={setLimit} 
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
              No notifications match your current filters.
            </Alert>
          ) : (
            filteredAndSortedNotifications.map(notif => (
              <NotificationCard key={notif.id} notification={notif} forceRead={forceReadToggle} />
            ))
          )}

          <PaginationBar count={totalPages} page={page} setPage={setPage} />
        </>
      )}
    </Container>
  );
}
