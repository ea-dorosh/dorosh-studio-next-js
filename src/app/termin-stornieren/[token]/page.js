import { Box } from '@mui/material';
import AppointmentCancellation from '@/components/AppointmentCancellation/AppointmentCancellation';

export const metadata = {
  title: `Termin stornieren - MOOD BEAUTY München`,
  description: `Stornieren Sie Ihren Termin bei MOOD BEAUTY München einfach und unkompliziert.`,
  robots: `noindex, nofollow`, // Don't index cancellation pages
};

export default function AppointmentCancellationPage({ params }) {
  const { token } = params;

  return (
    <Box sx={{ minHeight: `calc(100vh - 200px)` }}>
      <AppointmentCancellation token={token} />
    </Box>
  );
}

