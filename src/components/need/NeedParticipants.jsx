import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Typography, Grid, Chip, Stack, IconButton } from '@mui/material';
import roles from '../../apis/roles';
import ParticipantModal from '../modals/ParticipantModal';

export default function ChildFamily({ participants }) {
  const { t } = useTranslation();

  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleModal = (value) => {
    if (value === 'SAY') {
      setModalContent(t('needPage.participants.SAYModal'));
      setModal(true);
    } else if (value === 'OTHERS') {
      setModalContent(t('needPage.participants.othersModal'));
      setModal(true);
    }
  };

  return (
    <Grid sx={{ marginBottom: 5 }}>
      <Stack direction="column" spacing={1} alignItems="center">
        {participants &&
          participants.map(
            (member, index) =>
              !member.isDeleted && (
                <Chip
                  key={index}
                  sx={{
                    textAlign: 'left',
                    minHeight: 45,
                  }}
                  label={
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ minWidth: 220 }}
                    >
                      <Typography variant="subtitle2">
                        {`${member.paid.toLocaleString()}`}
                        {t('currency.toman')}
                      </Typography>
                      <Typography variant="subtitle2" style={{ right: 0 }}>
                        {member.id_family ? (
                          `${t(roles.roles[member.user_role])}`
                        ) : (
                          <>
                            <IconButton
                              color="primary"
                              onClick={() => handleModal('OTHERS')}
                            >
                              <InfoOutlinedIcon />
                            </IconButton>
                            <Typography variant="subtitle2" component="span">
                              {t('family.roles.others')}
                            </Typography>
                          </>
                        )}
                        {member.user_role === -2 && (
                          <>
                            <IconButton
                              color="primary"
                              onClick={() => handleModal('SAY')}
                            >
                              <InfoOutlinedIcon />
                            </IconButton>
                            <Typography variant="subtitle2" component="span">
                              {t('family.roles.say')}
                            </Typography>
                          </>
                        )}
                      </Typography>
                    </Grid>
                  }
                  size="medium"
                />
              )
          )}
      </Stack>
      {modal && modalContent && (
        <ParticipantModal
          modal={modal}
          setModal={setModal}
          modalContent={modalContent}
        />
      )}
    </Grid>
  );
}

ChildFamily.propTypes = {
  participants: PropTypes.array.isRequired,
};
