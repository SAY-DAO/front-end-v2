import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../redux/actions/commentAction';
import CommentTextArea from '../DAO/comment/CommentTextArea';

export default function CommentModal({ open, setOpen, message, setMessage }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const readySigningOneNeed = useSelector((state) => state.readySigningOneNeed);
  const { oneReadyNeed } = readySigningOneNeed;

  const handleClose = () => {
    setOpen(false);
  };

  const submitComment = () => {
    setOpen(false);
    dispatch(
      createComment(
        oneReadyNeed.flaskId,
        oneReadyNeed.id,
        oneReadyNeed.members.find((m) => m.id_user === userInfo.user.id).flaskFamilyRole,
        message,
      ),
    );
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <IconButton sx={{ position: 'absolute' }} onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ mt: 2 }}>
          <DialogContentText id="alert-dialog-description" sx={{ textAlign: 'center', mb: 3 }}>
            {t('comment.title')}
          </DialogContentText>
          <CommentTextArea message={message} setMessage={setMessage} />
        </DialogContent>
        <DialogActions>
          <Button disabled={!message} onClick={submitComment} autoFocus>
            {t('button.submit')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

CommentModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  message: PropTypes.string,
  setMessage: PropTypes.func,
};
