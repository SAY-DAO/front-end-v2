import { Card, CircularProgress, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useTranslation } from 'react-i18next';
import { fetchReadySignNeeds } from '../../../redux/actions/main/daoAction';
import SignatureCard from '../signing/SignatureCard';
import InfoCard from '../InfoCard';
import ToggleButton from '../signing/SignatureToggleButton';
import { READY_TO_SIGN_ONE_NEED_RESET } from '../../../redux/constants/daoConstants';

export default function DaoSignature() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [alignment, setAlignment] = useState('ready');
  const [cardSelected, setCardSelected] = useState();

  const readySigningNeeds = useSelector((state) => state.readySigningNeeds);
  const { readyNeeds, success: successSignedNeeds } = readySigningNeeds;

  const readySigningOneNeed = useSelector((state) => state.readySigningOneNeed);
  const { oneReadyNeed } = readySigningOneNeed;

  useEffect(() => {
    if (!successSignedNeeds) {
      dispatch(fetchReadySignNeeds());
    }
    if (oneReadyNeed) {
      dispatch({ type: READY_TO_SIGN_ONE_NEED_RESET });
    }
  }, [oneReadyNeed]);

  return (
    <>
      {!successSignedNeeds ? (
        <CircularProgress sx={{ mt: 1 }} />
      ) : (
        <Grid container>
          <InfoCard />
          <Card
            elevation={1}
            sx={{ p: 2, width: '100%', borderTopRightRadius: 60, borderTopLeftRadius: 60 }}
          >
            <Grid container>
              <ToggleButton alignment={alignment} setAlignment={setAlignment} />
            </Grid>
            <Box sx={{ p: 2, width: '100%', height: '100vh', overflowY: 'scroll', pb: 15, mt: 1 }}>
              {alignment !== 'ready' ? (
                readyNeeds && readyNeeds[1000000] ? (
                  <ImageList variant="masonry" cols={2} gap={10}>
                    {readyNeeds.map((payment) => (
                      <ImageListItem key={payment.id}>
                        <SignatureCard
                          need={payment.need}
                          setCardSelected={setCardSelected}
                          cardSelected={cardSelected}
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                ) : (
                  <Container sx={{ p: 3, textAlign: 'center' }}>
                    <Typography>{t('dao.signaturesTab.noListSigned')}</Typography>
                  </Container>
                )
              ) : readyNeeds && readyNeeds[0] ? (
                <ImageList variant="masonry" cols={2} gap={10}>
                  {readyNeeds.map((payment) => (
                    <ImageListItem key={payment.id}>
                      <SignatureCard
                        need={payment.need}
                        setCardSelected={setCardSelected}
                        cardSelected={cardSelected}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              ) : (
                <Container sx={{ p: 3, textAlign: 'center' }}>
                  <Typography>{t('dao.signaturesTab.noList')}</Typography>
                </Container>
              )}
            </Box>
          </Card>
        </Grid>
      )}
    </>
  );
}
