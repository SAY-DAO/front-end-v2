import React from 'react';
import { Grid, Box, Typography, Link } from '@mui/material';
import PropTypes from 'prop-types';

export default function OfflineHome({ content }) {
  return (
    <Grid
      container
      sx={{
        minHeight: '100vh',
        backgroundColor: '#F7F7F7',
        p: { xs: 4, sm: 6 },
      }}
      alignItems="center"
      justifyContent="center"
    >
      <Box
        sx={{
          textAlign: 'center',
          maxWidth: 720,
          width: '100%',
          px: 2,
          direction: 'rtl', // Persian support
        }}
      >
        <Box
          component="img"
          src="/images/maintenance.png"
          alt="در حال نگهداری"
          sx={{
            width: 72,
            height: 72,
            mb: 2,
            mx: 'auto',
            display: 'block',
          }}
        />

        <Typography
          sx={{
            color: 'text.primary',
            fontWeight: 600,
            mb: 1,
          }}
        >
          {content || 'پوزش از اختلال — در حال تکمیل بخش بلاک‌چین هستیم'}
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <Link href="https://eco.saydao.org" target="_blank" sx={{ color: 'text.primary' }}>
              اکوسیستم
            </Link>
          </Grid>

          <Grid item xs={6}>
            <Link href="https://docs.saydao.org" target="_blank" sx={{ color: 'text.primary' }}>
              مستندات
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

OfflineHome.propTypes = {
  content: PropTypes.string,
};
