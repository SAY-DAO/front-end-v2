import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from '@mui/lab';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import PageContainer from '../container/PageContainer';

const DaoTimeLine = () => (
  <PageContainer title="Timeline" description="this is Timeline page">
    <Grid container>
      <Timeline position="alternate" sx={{ color: 'rgba(0, 0, 0, 0.87)' }}>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            align="right"
            variant="body2"
            color="text.secondary"
          >
            6:30 am
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot
              color="info"
              sx={{
                p: 1,
                color: 'white',
              }}
            >
              <TrackChangesIcon icon="clock" width="22" height="22" />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Box sx={{ bgcolor: 'primary.light', p: 2, borderRadius: 3 }}>
              <Typography variant="subtitle1" component="span">
                Wake up
              </Typography>
              <Typography>Because you have many things to do</Typography>
            </Box>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            align="right"
            variant="body2"
            color="text.secondary"
          >
            9:30 am
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot
              color="warning"
              sx={{
                p: 1,
              }}
            >
              <TrackChangesIcon icon="slack" width="22" height="22" />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Box sx={{ bgcolor: 'warning.light', p: 2, borderRadius: 3 }}>
              <Typography variant="subtitle1" component="span">
                Eat
              </Typography>
              <Typography>Because you need strength</Typography>
            </Box>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem
          sx={{
            mb: {
              xs: '10px',
              sm: '0',
            },
          }}
        >
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            variant="body2"
            color="text.secondary"
          >
            10:00 am
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot
              color="success"
              sx={{
                p: 1,
              }}
            >
              <TrackChangesIcon icon="airplay" width="22" height="22" />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Box sx={{ bgcolor: 'success.light', p: 2, borderRadius: 3 }}>
              <Typography variant="subtitle1" component="span">
                Code
              </Typography>
              <Typography>Because it&apos;s awesome!</Typography>
            </Box>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            align="right"
            variant="body2"
            color="text.secondary"
          >
            12:30 am
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot
              color="error"
              sx={{
                p: 1,
              }}
            >
              <TrackChangesIcon icon="moon" width="22" height="22" />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Box sx={{ bgcolor: 'error.light', p: 2, borderRadius: 3 }}>
              <Typography variant="subtitle1" component="span">
                Sleep
              </Typography>
              <Typography>Because you need rest</Typography>
            </Box>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            align="right"
            variant="body2"
            color="text.secondary"
          >
            12:41 am
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot
              color="secondary"
              sx={{
                p: 1,
              }}
            >
              <TrackChangesIcon icon="repeat" width="22" height="22" />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Box sx={{ bgcolor: 'primary.light', p: 2, borderRadius: 3 }}>
              <Typography variant="subtitle1" component="span">
                Repeat
              </Typography>
              <Typography>Because this is the life you love!</Typography>
            </Box>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Grid>
  </PageContainer>
);

export default DaoTimeLine;
