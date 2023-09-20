import React from 'react';
import { Container } from '@mui/material';
import ContributionList from '../contribution/ContributionList';
import ContributionNetwork from '../contribution/ContributionNetwork';

const DaoContribution = () => {
  return (
    <Container>
      <ContributionNetwork />
      <ContributionList />
    </Container>
  );
};

export default DaoContribution;
