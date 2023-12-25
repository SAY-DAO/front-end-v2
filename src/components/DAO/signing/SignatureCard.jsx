import React from 'react';
import { Avatar, Box, Card, CardActionArea, Grid, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';
import { useNavigate } from 'react-router';
import { prepareUrl } from '../../../utils/helpers';

const SignatureCard = ({ need }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/dao/signatures/${need.id}`);
  };
  return (
    <CardActionArea onClick={handleCardClick}>
      <Card
        elevation={3}
        sx={{
          p: 0,
          borderRadius: 8,
          height: 150,
          background: `url(${`${process.env.REACT_APP_GITHUB_IMAGE_SERVE}/${need.midjourneyImage}`})`,
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
            <Avatar
              alt="my child"
              sx={{ width: 35, height: 35, m: 'auto', bgcolor: 'white' }}
              src={prepareUrl(need.child.awakeAvatarUrl)}
            />
          </Grid>
          <Grid item xs>
            <Typography sx={{ color: 'white', mt: 1, fontWeight: 400 }} fontSize="small">
              {need.child.sayNameTranslations.fa}
            </Typography>
            <Typography
              sx={{
                color: 'white',
                fontWeight: 800,
                maxWidth: '85px',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
              fontSize="small"
            >
              {need.nameTranslations.fa}
            </Typography>
          </Grid>
        </Grid>

        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: 150,
            bgcolor: 'black',
            opacity: 0.28,
          }}
        />
      </Card>
    </CardActionArea>
  );
};

export default SignatureCard;

SignatureCard.propTypes = {
  need: PropTypes.object,
};
