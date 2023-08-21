import React, { useState } from 'react';
import { Avatar, Box, Card, CardActionArea, Grid, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';
import { useNavigate } from 'react-router';
import { apiDao } from '../../../env';
import WalletDialog from '../../modals/WalletDialog';
import { prepareUrl } from '../../../utils/helpers';

const SignatureCard = ({ need, setCardSelected, cardSelected }) => {
  const navigate = useNavigate();
  const [openWallets, setOpenWallets] = useState(false);

  const handleCardClick = () => {
    setCardSelected(need.id);
    navigate(`/dao/signatures/${need.id}`);
  };
  return (
    <CardActionArea onClick={handleCardClick}>
      <Card
        elevation={3}
        sx={{
          opacity: cardSelected === need.id || cardSelected === 0 ? 1 : 0.9,
          p: 0,
          borderRadius: 8,
          height: 150,
          background: `url(${`${apiDao}/midjourney/images/${need.midjourneyImage}`})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          position: 'relative',
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ zIndex: 10, position: 'absolute', bottom: 5 }}
        >
          <Grid item xs={4}>
            <Avatar alt="my child" sx={{width:35, height:35, m:'auto'}}src={prepareUrl(need.child.awakeAvatarUrl)} />
          </Grid>
          <Grid item xs>
            <Typography sx={{ color: 'white', mt: 1, fontWeight: 800 }} fontSize="small">
              {need.nameTranslations.fa}
            </Typography>
            <Typography sx={{ color: 'white', fontWeight: 400 }} fontSize="small">
              {need.child.sayNameTranslations.fa}
            </Typography>
          </Grid>
        </Grid>

        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: 40,
            bgcolor: 'black',
            opacity: 0.38,
          }}
        />

        <WalletDialog openWallets={openWallets} setOpenWallets={setOpenWallets} />
      </Card>
    </CardActionArea>
  );
};

export default SignatureCard;

SignatureCard.propTypes = {
  need: PropTypes.object,
  setCardSelected: PropTypes.func,
  cardSelected: PropTypes.string,
};
