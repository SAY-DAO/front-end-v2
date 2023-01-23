import React from 'react';
import { Grid, Typography, CardContent, Card } from '@mui/material';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export default function NeedPageService({ oneNeed }) {
  const { t } = useTranslation();

  return (
    <>
      {oneNeed.details && (
        <Grid>
          <Card
            sx={{
              display: 'flex',
              marginLeft: 2,
              marginRight: 2,
              padding: 1,
            }}
            elevation={3}
          >
            <CardContent
              sx={{
                paddingBottom: '10px !important',
                paddingTop: '10px !important',
                paddingLeft: 0,
                paddingRight: 0,
              }}
            >
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  whiteSpace: 'nowrap',
                  width: '80px',
                  textOverflow: 'ellipsis',
                  fontSize: '12px',
                  lineHeight: '16px',
                }}
              >
                {t('needPage.serviceDetail', {
                  needName: oneNeed.name,
                  childSayName: oneNeed.childSayName,
                })}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  whiteSpace: 'nowrap',
                  width: '80px',
                  textOverflow: 'ellipsis',
                }}
              >
                {oneNeed.details}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )}
    </>
  );
}

NeedPageService.propTypes = {
  oneNeed: PropTypes.object,
};
