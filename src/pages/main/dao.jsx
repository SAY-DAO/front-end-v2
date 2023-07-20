import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Dao() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [tabNumber, setTabNumber] = useState();

  useEffect(() => {
    if (tabNumber === 0) {
      navigate('/main/dao/tabs/signature');
    }
    if (tabNumber === 1) {
      navigate('/main/dao/tabs/mint');
    }
    if (tabNumber === 2) {
      navigate('/main/dao/tabs/proposals');
    }
    if (tabNumber === 3) {
      navigate('/main/dao/tabs/contribute');
    }
    if (tabNumber === 4) {
      navigate('/main/dao/tabs/docs');
    }
  }, [tabNumber]);

  return (
    <Box sx={{ flexGrow: 1, pb: 10 }}>
      <Grid container spacing={1} sx={{ p: 4 }}>
        <Grid container item spacing={2} sx={{ mb: 1 }}>
          <Grid item xs={6}>
            <Card sx={{ maxWidth: 345, borderRadius: 5 }}>
              <CardActionArea onClick={() => setTabNumber(0)}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/images/dao/pc.png"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  {t('dao.tabs.signatures')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles,
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ maxWidth: 345, borderRadius: 5 }}>
              <CardActionArea onClick={() => setTabNumber(1)}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/images/dao/pc.png"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  {t('dao.tabs.mintables')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles,
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
        <Grid container item spacing={2} sx={{ mb: 1 }}>
          <Grid item xs={6}>
            <Card sx={{ maxWidth: 345, borderRadius: 5 }}>
              <CardActionArea onClick={() => setTabNumber(2)}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/images/dao/pc.png"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  {t('dao.tabs.proposals')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles,
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ maxWidth: 345, borderRadius: 5 }}>
              <CardActionArea onClick={() => setTabNumber(3)}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/images/dao/pc.png"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  {t('dao.tabs.contributes')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles,
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
        <Grid container item spacing={2} justifyContent="center">
          <Grid item xs={6}>
            <Card sx={{ maxWidth: 345, borderRadius: 5 }}>
              <CardActionArea onClick={() => setTabNumber(4)}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/images/dao/pc.png"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  {t('dao.tabs.docs')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles,
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
