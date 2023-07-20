/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@emotion/react';
import { Box, Card, IconButton, Tooltip } from '@mui/material';
import { PropTypes } from 'prop-types';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import WalletDialog from '../../modals/ConnectWalletDialog';
import { randomIntFromInterval } from '../../../utils/helpers';
import { fetchIpfsMetaData, getHashAndMeta } from '../../../utils/ipfsHelper';

const SignatureCard = ({ need, setCardSelected, cardSelected }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const theme = useTheme();

  const [isSelected, setIsSelected] = useState(false);
  const [openWallets, setOpenWallets] = useState(false);
  const [data, setData] = useState();
  const [images, setImages] = useState({
    icon: '',
    awake: '',
    sleep: '',
  });

  useEffect(() => {
    fetchIpfsMetaData(need.ipfs.needDetailsHash).then((r) => setData(r.data));
  }, []);

  useEffect(() => {
    if (data) {
      setImages({
        icon: getHashAndMeta(data.image),
        awake: getHashAndMeta(data.child.awakeImage),
        sleep: getHashAndMeta(data.child.sleptImage),
      });
    }
  }, [data]);

  return (
    <>
      <Card
        elevation={8}
        sx={{
          opacity: cardSelected === need.id || cardSelected === 0 ? 1 : 0.9,
          p: 0,
          maxHeight: isSelected ? '1400px' : `${randomIntFromInterval(320, 320)}px`,
          '&:hover': {
            border: 'ridge',
            borderColor: () =>
              isSelected ? theme.palette.primary.dark : theme.palette.secondary.dark,
            borderWidth: '0.2em',
          },
          border: 'solid',
          height: 150,
        }}
      >
        {data && (
          <Box
            sx={{
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              background: `url( ${`https://${images.awake.hash}.ipfs.dweb.link/${images.awake.metaData}`})`,
              '&:hover': {
                background: `url(${`https://${images.icon.hash}.ipfs.dweb.link/${images.icon.metaData}`})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              },
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          >
            {(!need.imageUrl || need.imageUrl.includes('wrong')) && (
              <Tooltip title={t('need.tooltip.addIcon')}>
                <IconButton>
                  <AddCircleRoundedIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        )}
      </Card>
      <WalletDialog openWallets={openWallets} setOpenWallets={setOpenWallets} />
    </>
  );
};

export default SignatureCard;

SignatureCard.propTypes = {
  need: PropTypes.object,
  setCardSelected: PropTypes.func,
  cardSelected: PropTypes.number,
};
