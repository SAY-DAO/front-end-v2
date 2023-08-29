import * as React from 'react';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { prepareUrl } from '../../../utils/helpers';
import { dateConvertor } from '../../../utils/persianToEnglish';

export default function CommentCard({ comment }) {
  return (
    <Grid container>
      <Grid item xs={2}>
        <Avatar alt="Remy Sharp" src={prepareUrl(comment.user.avatarUrl)} />
      </Grid>
      <Grid item container spacing={1} direction="column" xs>
        <Grid item>
          <Typography variant="subtitle2" color="text.primary">
            {`${comment.user.firstName} ${comment.user.lastName}`}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            color="text.primary"
            sx={{
              maxWidth: 250,
            }}
          >
            {comment.content}
          </Typography>
        </Grid>
        <Grid item>
          <Typography component="span" variant="body1" color="text.primary">
            {dateConvertor(`${comment.createdAt}`)}
          </Typography>
        </Grid>
        <Grid item sx={{ mb: 2, width: '60%' }}>
          <Divider />
        </Grid>
      </Grid>
    </Grid>
  );
}

CommentCard.propTypes = {
  comment: PropTypes.object,
};
