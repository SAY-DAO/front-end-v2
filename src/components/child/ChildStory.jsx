import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Grid,
  Avatar,
  Chip,
  Stack,
  Divider,
} from '@material-ui/core';
import roles from '../../apis/roles';
import VoiceBar from '../searchResult/VoiceBar';

export default function ChildStory({ theChild }) {
  const { t } = useTranslation();

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item sx={{ width: '80%' }}>
        <VoiceBar url={theChild.voiceUrl} />
      </Grid>
      <Grid
        item
        container
        direction="row"
        sx={{ marginBottom: 2, marginTop: 4 }}
      >
        <Grid item xs={10}>
          <Divider sx={{ width: '95%' }} />
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1">
            {t('childPage.childTab.story')}
          </Typography>
        </Grid>
      </Grid>
      <Grid item sx={{ textAlign: 'center', padding: 1 }}>
        <Typography variant="body1">{theChild.bio}</Typography>
      </Grid>
    </Grid>
  );
}

ChildStory.propTypes = {
  theChild: PropTypes.object.isRequired,
};
