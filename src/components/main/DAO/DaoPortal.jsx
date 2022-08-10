import { Box } from '@mui/material';
import React from 'react';

export default function DaoPortal() {
  return (
    <div>
      <Box
        sx={{
          width: 300,
          height: 300,
          backgroundColor: 'primary.dark',
          '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      />
    </div>
  );
}
