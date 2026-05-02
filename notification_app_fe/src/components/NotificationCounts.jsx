import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

export default function NotificationCounts({ notifications, readIds }) {
  const total = notifications.length;
  const unread = notifications.filter(n => !readIds.includes(n.id)).length;
  const placement = notifications.filter(n => n.type === 'Placement').length;
  const result = notifications.filter(n => n.type === 'Result').length;
  const event = notifications.filter(n => n.type === 'Event').length;

  const CountCard = ({ title, count, color }) => (
    <Grid item xs={6} sm={4} md={2.4}>
      <Card sx={{ bgcolor: color, color: 'white', textAlign: 'center', boxShadow: 2 }}>
        <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
          <Typography variant="caption" display="block" fontWeight="bold" textTransform="uppercase">
            {title}
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {count}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2}>
        <CountCard title="Total" count={total} color="#1976d2" />
        <CountCard title="Unread" count={unread} color="#d32f2f" />
        <CountCard title="Placement" count={placement} color="#2e7d32" />
        <CountCard title="Result" count={result} color="#1565c0" />
        <CountCard title="Event" count={event} color="#9c27b0" />
      </Grid>
    </Box>
  );
}
