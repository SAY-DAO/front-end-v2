import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Typography, Grid, Avatar, Chip, Stack } from '@material-ui/core';
import roles from '../../apis/roles';

export default function ChildFamily({ theChild }) {
  const { t } = useTranslation();

  return (
    <div>
      <Stack direction="column" spacing={1}>
        {theChild.childFamilyMembers.map((member) => (
          <Chip
            key={member.username}
            avatar={
              <Avatar
                alt={member.username}
                src={member.avatarUrl}
                sx={{
                  width: '35px !important',
                  height: '35px !important',
                  marginRight: '5px !important',
                }}
              />
            }
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
                  {`${t(roles.roles[member.role])}`}
                </Typography>
                <Typography variant="subtitle2" style={{ right: 0 }}>
                  {`${member.username}`}
                </Typography>
              </Grid>
            }
            size="medium"
          />
        ))}
      </Stack>
    </div>
  );
}

ChildFamily.propTypes = {
  theChild: PropTypes.object.isRequired,
};
