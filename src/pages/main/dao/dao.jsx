import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  fetchEcoMintData,
  fetchPaidNeeds,
  fetchAvailableContribution,
} from '../../../redux/actions/main/daoAction';

export default function Dao() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [tabNumber, setTabNumber] = useState();

  useEffect(() => {
    if (tabNumber === 0) {
      navigate('/main/dao/tabs/signature');
      dispatch(fetchPaidNeeds());
    }
    if (tabNumber === 1) {
      navigate('/main/dao/tabs/mint');
      dispatch(fetchEcoMintData());
    }
    if (tabNumber === 2) {
      navigate('/main/dao/tabs/proposals');
    }
    if (tabNumber === 3) {
      navigate('/main/dao/tabs/contribute');
      dispatch(fetchAvailableContribution());
    }
    if (tabNumber === 4) {
      navigate('/main/dao/tabs/docs');
    }
  }, [tabNumber]);

  return (
    <Box sx={{ flexGrow: 1, pb: 10 }}>
      <Grid container spacing={1} sx={{ p: 4 }}>
        <Grid container item spacing={2} sx={{ mb: 1 }} justifyContent="center" alignItems="center">
          <Grid item xs={6}>
            <Card
              sx={{
                maxWidth: 345,
                borderRadius: 5,
                // bgcolor: '#d0fff2',
                minHeight: 200,
                color: 'black',
              }}
            >
              <CardActionArea onClick={() => setTabNumber(0)}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/images/dao/signature.png"
                  alt="green iguana"
                  sx={{ maxWidth: 130, m: 'auto' }}
                />
                <CardContent sx={{ pt: 0 }}>
                  <Typography
                    gutterBottom
                    sx={{ fontSize: 18, fontWeight: 400, lineHeight: 1.2, mb: 2 }}
                    component="div"
                    color="text.secondary"
                  >
                    {t('dao.tabs.signatures')}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {t('dao.subTabs.signatures')}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card
              sx={{
                maxWidth: 345,
                borderRadius: 5,
                // bgcolor: '#ffd8d8',
                minHeight: 200,
                color: 'black',
              }}
            >
              <CardActionArea onClick={() => setTabNumber(1)}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/images/dao/mine.png"
                  alt="green iguana"
                  sx={{ maxWidth: 130, m: 'auto' }}
                />
                <CardContent sx={{ pt: 0 }}>
                  <Typography
                    gutterBottom
                    sx={{ fontSize: 18, fontWeight: 400, lineHeight: 1.2, mb: 2 }}
                    component="div"
                    color="text.secondary"
                  >
                    {t('dao.tabs.mintables')}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {t('dao.subTabs.mintables')}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
        <Grid container item spacing={2} sx={{ mb: 1 }} justifyContent="center" alignItems="center">
          <Grid item xs={6}>
            <Card
              sx={{
                maxWidth: 345,
                borderRadius: 5,
                // bgcolor: '#d3eef9',
                minHeight: 200,
                color: 'black',
              }}
            >
              <CardActionArea onClick={() => setTabNumber(2)}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/images/dao/proposals.png"
                  alt="green iguana"
                  sx={{ maxWidth: 130, m: 'auto', transform: 'scale(-1, 1)' }}
                />
                <CardContent sx={{ pt: 0 }}>
                  <Typography
                    gutterBottom
                    sx={{ fontSize: 18, fontWeight: 400, lineHeight: 1.2, mb: 2 }}
                    component="div"
                    color="text.secondary"
                  >
                    {t('dao.tabs.proposals')}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {t('dao.subTabs.proposals')}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card
              sx={{
                maxWidth: 345,
                borderRadius: 5,
                // bgcolor: '#f3ecc4',
                minHeight: 200,
                color: 'black',
              }}
            >
              <CardActionArea onClick={() => setTabNumber(3)}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/images/dao/contribute.png"
                  alt="green iguana"
                  sx={{ width: 170, m: 'auto' }}
                />
                <CardContent sx={{ pt: 0 }}>
                  <Typography
                    gutterBottom
                    sx={{ fontSize: 18, fontWeight: 400, lineHeight: 1.2, mb: 2 }}
                    component="div"
                    color="text.secondary"
                  >
                    {t('dao.tabs.contributes')}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {t('dao.subTabs.contributes')}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
        <Grid container item spacing={2} sx={{ mb: 1 }} justifyContent="center" alignItems="center">
          <Grid item xs={6}>
            <Card
              sx={{
                maxWidth: 345,
                borderRadius: 5,
                // bgcolor: '#ece4f7',
                minHeight: 200,
                color: 'black',
              }}
            >
              <CardActionArea onClick={() => setTabNumber(4)}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/images/dao/documents.png"
                  alt="green iguana"
                  sx={{ maxWidth: 130, m: 'auto' }}
                />
                <CardContent sx={{ pt: 0 }}>
                  <Typography
                    gutterBottom
                    sx={{ fontSize: 18, fontWeight: 400, lineHeight: 1.2, mb: 2 }}
                    component="div"
                    color="text.secondary"
                  >
                    {t('dao.tabs.docs')}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {t('dao.subTabs.docs')}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
