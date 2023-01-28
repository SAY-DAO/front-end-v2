import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Stack, Chip, Grid, Typography, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function AvailableRoles({
  inviteeRole,
  mother,
  father,
  isGone,
  handleSelectRole,
}) {
  const { t } = useTranslation();

  // Mother 1
  const motherChip = () => {
    if ((inviteeRole === 1 || inviteeRole === null) && !mother)
      return (
        <Chip
          variant="outlined"
          label={
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ minWidth: 220 }}
            >
              <Grid item xs={6}>
                <Typography sx={{ padding: 2 }} variant="subtitle1">
                  {t('family.roles.mother')}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {!isGone && (
                  <Link onClick={() => handleSelectRole(1)}>
                    <Typography
                      sx={{ padding: 2, fontWeight: 600 }}
                      variant="body2"
                      color="primary"
                    >
                      {t('search-result.getRole')}
                    </Typography>
                  </Link>
                )}
              </Grid>
            </Grid>
          }
        />
      );
    if (mother)
      return (
        <Chip
          variant="outlined"
          label={
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ minWidth: 220 }}
            >
              <Grid item xs={6}>
                <Typography sx={{ padding: 2 }} variant="subtitle1">
                  {t('family.roles.mother')}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ padding: 2 }} variant="subtitle2">
                  @{mother}
                </Typography>
              </Grid>
            </Grid>
          }
        />
      );
  };

  // Father 0
  const fatherChip = () => {
    if ((inviteeRole === 0 || inviteeRole === null) && !father)
      return (
        <Chip
          variant="outlined"
          label={
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ minWidth: 220 }}
            >
              <Grid item xs={6}>
                <Typography sx={{ padding: 2 }} variant="subtitle1">
                  {t('family.roles.father')}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {!isGone && (
                  <Link onClick={() => handleSelectRole(0)}>
                    <Typography
                      sx={{ padding: 2, fontWeight: 600 }}
                      variant="body2"
                      color="primary"
                    >
                      {t('search-result.getRole')}
                    </Typography>
                  </Link>
                )}
              </Grid>
            </Grid>
          }
        />
      );
    if (father)
      return (
        <Chip
          variant="outlined"
          label={
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ minWidth: 220 }}
            >
              <Grid item xs={6}>
                <Typography sx={{ padding: 2 }} variant="subtitle1">
                  {t('family.roles.father')}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ padding: 2 }} variant="subtitle2">
                  @{father}
                </Typography>
              </Grid>
            </Grid>
          }
        />
      );
  };

  return (
    <Stack direction="column" spacing={1}>
      {/* Mother 1 */}
      {motherChip()}

      {/* mother's sister 3 */}
      {inviteeRole === 3 || inviteeRole === null ? (
        <Chip
          variant="outlined"
          label={
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ minWidth: 220 }}
            >
              <Grid item xs={6}>
                <Typography sx={{ padding: 2 }} variant="subtitle1">
                  {t('family.roles.aunt')}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {!isGone && (
                  <Link onClick={() => handleSelectRole(3)}>
                    <Typography
                      sx={{ padding: 2, fontWeight: 600 }}
                      variant="body2"
                      color="primary"
                    >
                      {t('search-result.getRole')}
                    </Typography>
                  </Link>
                )}
              </Grid>
            </Grid>
          }
        />
      ) : (
        ''
      )}

      {/* mother's brother 4 */}
      {inviteeRole === 4 || inviteeRole === null ? (
        <Chip
          variant="outlined"
          label={
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ minWidth: 220 }}
            >
              <Grid item xs={6}>
                <Typography sx={{ padding: 2 }} variant="subtitle1">
                  {t('family.roles.daei')}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {!isGone && (
                  <Link onClick={() => handleSelectRole(4)}>
                    <Typography
                      sx={{ padding: 2, fontWeight: 600 }}
                      variant="body2"
                      color="primary"
                    >
                      {t('search-result.getRole')}
                    </Typography>
                  </Link>
                )}
              </Grid>
            </Grid>
          }
        />
      ) : (
        ''
      )}

      {/* father 0 */}
      {fatherChip()}

      {/* father's sister  5 */}
      {inviteeRole === 5 || inviteeRole === null ? (
        <Chip
          variant="outlined"
          label={
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ minWidth: 220 }}
            >
              <Grid item xs={6}>
                <Typography sx={{ padding: 2 }} variant="subtitle1">
                  {t('family.roles.ame')}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {!isGone && (
                  <Link onClick={() => handleSelectRole(5)}>
                    <Typography
                      sx={{ padding: 2, fontWeight: 600 }}
                      variant="body2"
                      color="primary"
                    >
                      {t('search-result.getRole')}
                    </Typography>
                  </Link>
                )}
              </Grid>
            </Grid>
          }
        />
      ) : (
        ''
      )}

      {/* father's brother 2 */}
      {inviteeRole === 2 || inviteeRole === null ? (
        <Chip
          variant="outlined"
          label={
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ minWidth: 220 }}
            >
              <Grid item xs={6}>
                <Typography sx={{ padding: 2 }} variant="subtitle1">
                  {t('family.roles.uncle')}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {!isGone && (
                  <Link onClick={() => handleSelectRole(2)}>
                    <Typography
                      sx={{ padding: 2, fontWeight: 600 }}
                      variant="body2"
                      color="primary"
                    >
                      {t('search-result.getRole')}
                    </Typography>
                  </Link>
                )}
              </Grid>
            </Grid>
          }
        />
      ) : (
        ''
      )}
    </Stack>
  );
}

AvailableRoles.propTypes = {
  inviteeRole: PropTypes.number,
  isGone: PropTypes.bool,
  father: PropTypes.string,
  mother: PropTypes.string,
  handleSelectRole: PropTypes.func,
};
