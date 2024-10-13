import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { createComment } from '../../redux/actions/commentAction';
import CommentTextArea from '../DAO/comment/CommentTextArea';

export default function CommentModal({ open, setOpen, comment, setComment }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const commentResult = useSelector((state) => state.commentResult);
  const { created, loading: loadingCommentResult } = commentResult;

  const readySigningOneNeed = useSelector((state) => state.readySigningOneNeed);
  const { oneReadyNeed } = readySigningOneNeed;

  const handleClose = () => {
    setOpen(false);
  };

  const submitComment = () => {
    dispatch(
      createComment(
        oneReadyNeed.flaskId,
        oneReadyNeed.id,
        oneReadyNeed.members.find((m) => m.id_user === userInfo.user.id).flaskFamilyRole,
        comment,
      ),
    );
  };

  useEffect(() => {
    if (created) {
      setOpen(false);
      setComment('');
    }
  }, [created]);

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
          <CommentTextArea comment={comment} setComment={setComment} />
        </DialogContent>
        <DialogActions sx={{ m: 'auto' }}>
          <LoadingButton
            loading={loadingCommentResult}
            variant="outlined"
            disabled={!comment}
            onClick={submitComment}
            autoFocus
          >
            {t('button.submit')}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

CommentModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  comment: PropTypes.string,
  setComment: PropTypes.func,
};
