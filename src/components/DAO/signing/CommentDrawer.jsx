import * as React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { Global } from '@emotion/react';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import CommentCard from '../comment/CommentCard';
import { createComment } from '../../../redux/actions/commentAction';
import CommentTextArea from '../comment/CommentTextArea';

const drawerBleeding = 56;

const Root = styled('div')(() => ({
  height: '100%',
}));

const Puller = styled(Box)(() => ({
  width: 30,
  height: 6,
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

export default function CommentDrawer({ open, setOpen, comment, setComment }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const readySigningOneNeed = useSelector((state) => state.readySigningOneNeed);
  const { oneReadyNeed } = readySigningOneNeed;

  const commentResult = useSelector((state) => state.commentResult);
  const { loading: loadingCommentResult, success: successCommentResult } = commentResult;

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
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

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'overflow',
          },
        }}
      />
      <SwipeableDrawer
        // swipeAreaWidth={500}
        ModalProps={{
          keepMounted: true,
        }}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            right: 0,
            left: 0,
            overflow: 'scroll',
          }}
        >
          <Puller />
        </Box>
        {/* <Grid container>
          <KeyboardDoubleArrowUpOutlinedIcon sx={{ m: 'auto' }} />
        </Grid> */}
        <Typography sx={{ p: 3, color: 'text.secondary', textAlign: 'center' }}>
          {t('comment.signed.history')}
        </Typography>

        {oneReadyNeed &&
          oneReadyNeed.comments.map((c) => (
            <div key={c.id}>
              <CommentCard comment={c} />
            </div>
          ))}
        {oneReadyNeed &&
          !oneReadyNeed.isResolved &&
          oneReadyNeed.comments[oneReadyNeed.comments.length - 1].flaskUserId !==
            userInfo.user.id && (
            <form style={{ textAlign: 'center', marginTop: 30, padding: 10 }}>
              <CommentTextArea comment={comment} setComment={setComment} />
              <LoadingButton
                variant="outlined"
                sx={{ mt: 2, mb: 2 }}
                loading={loadingCommentResult}
                disabled={!comment && successCommentResult}
                onClick={submitComment}
                autoFocus
              >
                {t('button.submit')}
              </LoadingButton>
            </form>
          )}
        {oneReadyNeed &&
          !oneReadyNeed.isResolved &&
          oneReadyNeed.comments[oneReadyNeed.comments.length - 1].flaskUserId ===
            userInfo.user.id && (
            <Typography sx={{ p: 2, textAlign: 'center' }}>
              {t('comment.waitingResponse')}
            </Typography>
          )}
      </SwipeableDrawer>
    </Root>
  );
}

CommentDrawer.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  setComment: PropTypes.func,
  comment: PropTypes.string,
};
