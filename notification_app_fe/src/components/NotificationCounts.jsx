import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

export default function NotificationCounts({ notifications, readIds }) {
  const total = notifications.length;
  const unread = notifications.filter(n => !readIds.includes(n.id)).length;
  const placement = notifications.filter(n => n.type === 'Placement').length;
  const result = notifications.filter(n => n.type === 'Result').length;
  const event = notifications.filter(n => n.type === 'Event').length;

  const CountCard = ({ title, count, color }) => (
    <Grid item xs={6} sm={4} md={2.4}>
      <Card sx={{ bgcolor: color, color: 'white', textAlign: 'center', boxShadow: 3, borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
          <Typography variant="subtitle2" display="block" fontWeight="bold" textTransform="uppercase" letterSpacing={1} mb={1}>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {count}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={2} alignItems="stretch">
        <CountCard title="Total" count={total} color="#1976d2" />
        <CountCard title="Unread" count={unread} color="#d32f2f" />
        <CountCard title="Placement" count={placement} color="#2e7d32" />
        <CountCard title="Result" count={result} color="#1565c0" />
        <CountCard title="Event" count={event} color="#9c27b0" />
      </Grid>
    </Box>
  );
}
