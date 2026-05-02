import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { useState } from 'react';
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

export default function NotificationCard({ notification }) {
  const [read, setRead] = useState(() => isRead(notification.id));

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
        bgcolor: read ? 'background.paper' : '#e3f2fd',
        transition: '0.3s',
        '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Chip 
              label={notification.type} 
              color={getTypeColor(notification.type)} 
              size="small" 
            />
            {!read && (
              <Chip label="NEW" color="error" size="small" sx={{ fontWeight: 'bold' }} />
            )}
          </Box>
          <Typography variant="caption" color="text.secondary">
            {new Date(notification.timestamp).toLocaleString()}
          </Typography>
        </Box>
        <Typography variant="body1">
          {notification.message}
        </Typography>
      </CardContent>
    </Card>
  );
}
