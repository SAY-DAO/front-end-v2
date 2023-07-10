/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Typography, Grid, Avatar, Chip, Stack } from '@mui/material';
import { useHistory } from 'react-router';
import roles from '../../apis/roles.json';

export default function ChildFamily({ theChild }) {
  const history = useHistory();
  const { t } = useTranslation();

  // useEffect(() => {
  //   if (!theChild.childFamilyMembers) {
  //     history.push('/main/search');
  //   }
  // }, [theChild, history]);

  return (
    <div>
      <Stack direction="column" spacing={1} alignItems="center">
        {theChild.childFamilyMembers &&
          theChild.childFamilyMembers.map(
            (member, index) =>
              !member.isDeleted && (
                <Chip
                  key={index}
                  avatar={
                    <Avatar
                      alt={member.username}
                      src={member.avatarUrl}
                      sx={{
                        width: '35px !important',
                        height: '35px !important',
                        marginRight: '5px !important',
                        border: '1px solid #968c8c',
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
              ),
          )}
      </Stack>
    </div>
  );
}

ChildFamily.propTypes = {
  theChild: PropTypes.object.isRequired,
};
