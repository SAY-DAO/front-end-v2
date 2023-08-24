import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { prepareUrl } from '../../../utils/helpers';
import { dateConvertor } from '../../../utils/persianToEnglish';

export default function CommentCard({ comment }) {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {comment.user && (
        <>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={prepareUrl(comment.user.avatarUrl)} />
            </ListItemAvatar>
            <ListItemText
              primary={`${comment.user.firstName} ${comment.user.lastName}`}
              secondary={
                <>
                  {/* <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  > */}
                    {comment.content}
                  {/* </Typography> */}
                  <Typography sx={{ mt: 1 }} variant="body1" color="text.primary">
                    {dateConvertor(`${comment.createdAt}`)}
                  </Typography>
                </>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
      )}
    </List>
  );
}

CommentCard.propTypes = {
  comment: PropTypes.object,
};
