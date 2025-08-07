import { Box, Skeleton } from '@mui/material';

export default function TimeSlotSkeleton({ count = 12, showDateText = true, showButton = true }) {
  return (
    <Box>
      {showDateText && (
        <Box sx={{ mb: 2 }}>
          <Skeleton
            variant="text"
            width="100%"
            height={48}
            sx={{
              backgroundColor: `rgba(0, 0, 0, 0.06)`,
            }}
            animation="wave"
          />
        </Box>
      )}

      <Box
        sx={{
          display: `grid`,
          gridTemplateColumns: `repeat(3, 1fr)`,
          width: `100%`,
          gap: `10px`,
          mt: 2,
        }}
      >
        {Array.from({ length: count }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            height={40}
            sx={{
              borderRadius: `9999px`,
              backgroundColor: `rgba(0, 0, 0, 0.06)`,
            }}
            animation="wave"
          />
        ))}
      </Box>

      {showButton && (
        <Box sx={{ display: `flex`, justifyContent: `center`, mt: 2 }}>
          <Skeleton
            variant="rectangular"
            width={300}
            height={40}
            sx={{
              borderRadius: `20px`,
              backgroundColor: `rgba(0, 0, 0, 0.06)`,
            }}
            animation="wave"
          />
        </Box>
      )}
    </Box>
  );
}