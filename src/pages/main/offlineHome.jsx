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
          direction: 'rtl !important',
        }}
      >
        <Box
          component="img"
          src="/images/maintenance.png"
          alt="در حال"
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
            direction: 'ltr !important',
            mb: 1,
          }}
        >
          {content ||
            'در اردیبهشت ۱۴۰۵، به‌دلیل ضرورت تأمین منابع مناسب برای پیشبرد این پروژه، تصمیم گرفتیم ارائه خدمات SAY را به‌صورت موقت متوقف کنیم. مدت این توقف در حال حاضر قابل پیش‌بینی نیست؛ با این حال امیدواریم این وقفه کوتاه باشد و پس از ازسرگیری فعالیت‌ها، همچنان همراه SAY باشید.'}
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <Link
              href="https://eco.saydao.org"
              target="_blank"
              sx={{ fontWeight: 400, color: '#ba690c ' }}
            >
              اکوسیستم
            </Link>
          </Grid>

          <Grid item xs={6}>
            <Link
              href="https://docs.saydao.org"
              target="_blank"
              sx={{ fontWeight: 400, color: '#ba690c' }}
            >
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
