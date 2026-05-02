import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { useState, useEffect } from 'react';
import { isRead, markAsRead } from '../utils/readStatus';
import { Log } from '../../../logging_middleware/logger';

const getTypeColor = (type) => {
  switch (type) {
    case 'Placement': return 'success';
    case 'Result': return 'primary';
    case 'Event': return 'secondary';
    default: return 'default';
  }
};

export default function NotificationCard({ notification, forceRead }) {
  const [read, setRead] = useState(() => isRead(notification.id));

  useEffect(() => {
    if (forceRead) setRead(true);
  }, [forceRead]);

  const handleClick = () => {
    if (!read) {
      markAsRead(notification.id);
      setRead(true);
      Log('frontend', 'INFO', 'component', `Read ${notification.id.substring(0, 8)}`);
    }
  };

  return (
    <Card 
      onClick={handleClick}
      sx={{ 
        mb: 2, 
        cursor: 'pointer',
        bgcolor: read ? 'background.paper' : '#f0f7ff',
        borderLeft: read ? '4px solid transparent' : '4px solid #1976d2',
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        transition: 'all 0.2s ease-in-out',
        '&:hover': { transform: 'scale(1.01)', boxShadow: 4 }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Chip 
              label={notification.type} 
              color={getTypeColor(notification.type)} 
              size="small" 
              sx={{ fontWeight: 'bold', px: 1 }}
            />
            {!read && (
              <Chip label="NEW" color="error" size="small" sx={{ fontWeight: 'bold', height: 20 }} />
            )}
          </Box>
          <Typography variant="caption" color="text.secondary" fontWeight="500">
            {new Date(notification.timestamp).toLocaleString(undefined, {
              month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
            })}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: read ? 'text.secondary' : 'text.primary', fontWeight: read ? 400 : 500 }}>
          {notification.message}
        </Typography>
      </CardContent>
    </Card>
  );
}
