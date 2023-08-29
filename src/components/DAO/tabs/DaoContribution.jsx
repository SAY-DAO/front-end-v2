import React from 'react';
import { Container, Divider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ContributionList from '../contribution/ContributionList';
import ContributionNetwork from '../contribution/ContributionNetwork';

const DaoContribution = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Divider sx={{ mb: 0 }} />
      <ContributionNetwork />
      <Typography sx={{ textAlign: 'center', mb: 2, mt: 2, fontWeight: 400 }}>
        {t('dao.contributionTab.title')}
      </Typography>
      <ContributionList />
    </Container>
  );
};

export default DaoContribution;
