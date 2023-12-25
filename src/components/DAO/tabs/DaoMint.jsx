import { Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import MintInfoCard from '../MintInfoCard';
import { fetchEcoMintData } from '../../../redux/actions/main/daoAction';
import {
  ECOSYSTEM_MINT_RESET,
  FAMILY_ECOSYSTEM_PAYS_REST,
} from '../../../redux/constants/daoConstants';

export default function DaoMint() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const ecosystemMintData = useSelector((state) => state.ecosystemMintData);
  const { mintEcoResult } = ecosystemMintData;

  useEffect(() => {
    if (!mintEcoResult) {
      dispatch(fetchEcoMintData());
    }
    if (mintEcoResult) {
      return () => {
        dispatch({ type: ECOSYSTEM_MINT_RESET });
        dispatch({ type: FAMILY_ECOSYSTEM_PAYS_REST });
      };
    }
  }, []);

  return (
    <Grid container>
      <MintInfoCard />
      <Container sx={{ p: 4, textAlign: 'center', m: 'auto', mt: 15 }}>
        <Typography component="span">{t('dao.mintTab.notAvailable')}</Typography>
      </Container>
    </Grid>
  );
}
