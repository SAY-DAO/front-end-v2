import { Card, CircularProgress, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useTranslation } from 'react-i18next';
import { fetchPaidNeeds } from '../../../redux/actions/main/daoAction';
import SignatureCard from '../signing/SignatureCard';
import SignatureInfoCard from '../SignatureInfoCard';
import ToggleButton from '../signing/SignatureToggleButton';
import {
  ONE_NEED_PERSONAL_RATIO_REST,
  READY_TO_SIGN_ONE_NEED_RESET,
  SIGNATURE_CREATE_RESET,
  SIGNATURE_VERIFICATION_RESET,
} from '../../../redux/constants/daoConstants';

export default function DaoSignature() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [alignment, setAlignment] = useState('ready');
  const [signedIds, setSignedIds] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const paidNeeds = useSelector((state) => state.paidNeeds);
  const { paidNeedsData, success: successPaidNeeds } = paidNeeds;

  const readySigningOneNeed = useSelector((state) => state.readySigningOneNeed);
  const { oneReadyNeed } = readySigningOneNeed;

  const { success: successSignature, error: errorSignature } = useSelector(
    (state) => state.signature,
  );

  useEffect(() => {
    dispatch(fetchPaidNeeds());
    if (oneReadyNeed) {
      dispatch({ type: READY_TO_SIGN_ONE_NEED_RESET });
    }
    return () => {
      dispatch({ type: ONE_NEED_PERSONAL_RATIO_REST });
    };
  }, []);

  const handleAlignment = (alinement) => {
    setAlignment(alinement);
  };

  useEffect(() => {
    if (paidNeedsData) {
      const alreadySignedIds = paidNeedsData.readyNeedsList
        .filter((need) => need.signatures.find((s) => s.flaskUserId === userInfo.user.id))
        .map((need) => need.id);
      setSignedIds(alreadySignedIds);
    }
  }, [paidNeedsData]);

  useEffect(() => {
    if (successSignature || errorSignature) {
      dispatch({ type: SIGNATURE_VERIFICATION_RESET });
      dispatch({ type: SIGNATURE_CREATE_RESET });
    }
  }, []);

  return (
    <Grid container>
      <SignatureInfoCard />

      <Grid container>
        <Card
          elevation={1}
          sx={{
            p: 2,
            width: '100%',
            borderTopRightRadius: 60,
            borderTopLeftRadius: 60,
            minHeight: 500,
          }}
        >
          <Grid container>
            <ToggleButton
              alignment={alignment}
              setAlignment={(alinement) => handleAlignment(alinement)}
            />
          </Grid>
          <>
            {!successPaidNeeds ? (
              <CircularProgress sx={{ mt: 1 }} />
            ) : (
              <Box
                sx={{ p: 2, width: '100%', height: '100vh', overflowY: 'scroll', pb: 15, mt: 1 }}
              >
                {alignment !== 'ready' ? (
                  paidNeedsData && paidNeedsData.signed > 0 ? (
                    <ImageList variant="Standard" cols={2} gap={10}>
                      {paidNeedsData.readyNeedsList
                        .filter((need) => signedIds.includes(need.id))
                        .map((need) => (
                          <ImageListItem key={need.id}>
                            <SignatureCard need={need} />
                          </ImageListItem>
                        ))}
                    </ImageList>
                  ) : (
                    <Container sx={{ p: 3, textAlign: 'center' }}>
                      <Typography>{t('dao.signaturesTab.noListSigned')}</Typography>
                    </Container>
                  )
                ) : paidNeedsData &&
                  paidNeedsData.readyNeedsList.filter((need) => !signedIds.includes(need.id))
                    .length > 0 ? (
                  <ImageList variant="Standard" cols={2} gap={10}>
                    {paidNeedsData.readyNeedsList
                      .filter((need) => !signedIds.includes(need.id))
                      .map((need) => (
                        <ImageListItem key={need.id}>
                          <SignatureCard need={need} />
                        </ImageListItem>
                      ))}
                  </ImageList>
                ) : (
                  <Container sx={{ p: 3, textAlign: 'center' }}>
                    <Typography>{t('dao.signaturesTab.noList')}</Typography>
                  </Container>
                )}
              </Box>
            )}
          </>
        </Card>
      </Grid>
    </Grid>
  );
}
