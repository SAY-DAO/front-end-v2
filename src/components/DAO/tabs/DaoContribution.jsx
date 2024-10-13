import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import ContributionList from '../contribution/ContributionList';
import ContributionNetwork from '../contribution/ContributionNetwork';
import { fetchAvailableContribution } from '../../../redux/actions/main/daoAction';

const DaoContribution = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAvailableContribution());
  }, []);
  
  return (
    <Container>
      <ContributionNetwork />
      <ContributionList />
    </Container>
  );
};

export default DaoContribution;
