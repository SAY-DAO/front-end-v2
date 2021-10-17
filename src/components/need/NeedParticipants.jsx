import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Typography, Grid, Avatar, Chip, Stack } from '@mui/material';
import { useHistory } from 'react-router';
import roles from '../../apis/roles';

export default function ChildFamily({ participants }) {
  const { t } = useTranslation();

  return (
    <Grid sx={{ marginBottom: 5 }}>
      <Stack direction="column" spacing={1} alignItems="center">
        {participants &&
          participants.map(
            (member, index) =>
              !member.isDeleted && (
                <Chip
                  key={index}
                  sx={{
                    textAlign: 'left',
                    minHeight: 45,
                  }}
                  label={
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ minWidth: 220 }}
                    >
                      <Typography variant="subtitle2">
                        {`${t(roles.roles[member.user_role])}`}
                      </Typography>
                      <Typography variant="subtitle2" style={{ right: 0 }}>
                        {`${member.username}`}
                      </Typography>
                    </Grid>
                  }
                  size="medium"
                />
              )
          )}
      </Stack>
    </Grid>
  );
}

ChildFamily.propTypes = {
  participants: PropTypes.array.isRequired,
};
