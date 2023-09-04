import React, { useState, useEffect } from 'react';
import {
  Typography,
  LinearProgress,
  Stack,
  Tooltip,
  ClickAwayListener,
  CardActionArea,
} from '@mui/material';
import { PropTypes } from 'prop-types';

import { useSelector } from 'react-redux';

const CustomToolTip = ({ title, popup, icon, which }) => {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState();
  const [signedCount, setSignedCount] = useState();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const needVariables = useSelector((state) => state.needVariables);
  const { userResult } = needVariables;

  const ecosystemMintData = useSelector((state) => state.ecosystemMintData);
  const { mintEcoResult } = ecosystemMintData;

  const paidNeeds = useSelector((state) => state.paidNeeds);
  const { paidNeedsData } = paidNeeds;

  useEffect(() => {
    if (paidNeedsData) {
      const alreadySignedIds = paidNeedsData.readyNeedsList
        .filter((need) => need.signatures.find((s) => s.flaskUserId === userInfo.user.id))
        .map((n) => n.id);
      setSignedCount(
        paidNeedsData.readyNeedsList.filter((need) => alreadySignedIds.includes(need.id)) &&
          paidNeedsData.readyNeedsList.filter((need) => alreadySignedIds.includes(need.id)).length,
      );
    }
  }, [paidNeedsData]);

  useEffect(() => {
    if (mintEcoResult && which === 'mintWaiting') {
      setCount(mintEcoResult.theUser.waiting);
    } else if (mintEcoResult && which === 'mintReady') {
      setCount(mintEcoResult.theUser.ready);
    } else if (mintEcoResult && which === 'mined') {
      setCount(mintEcoResult.theUser.mined);
    } else if (paidNeedsData && userResult && which === 'signWaiting') {
      setCount(
        userResult.theUser.fatherCompletePay +
          userResult.theUser.motherCompletePay +
          userResult.theUser.amooCompletePay +
          userResult.theUser.daeiCompletePay +
          userResult.theUser.khalehCompletePay +
          userResult.theUser.ammeCompletePay -
          paidNeedsData.readyNeedsList.length,
      );
    } else if (userResult && signedCount >= 0 && paidNeedsData && which === 'signReady') {
      setCount(paidNeedsData.readyNeedsList.length - signedCount);
    } else if (userResult && paidNeedsData && which === 'signed') {
      setCount(signedCount);
    }
  }, [mintEcoResult, which, userResult, paidNeedsData]);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div>
        <Tooltip
          PopperProps={{
            disablePortal: true,
          }}
          onClose={handleTooltipClose}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={
            <Typography sx={{ fontSize: 12 }} component="div">
              {popup}
            </Typography>
          }
        >
          <CardActionArea onClick={handleTooltipOpen}>
            {icon}
            <Typography
              variant="h4"
              fontWeight="600"
              sx={{
                lineHeight: '1.2',
                fontSize: 14,
              }}
            >
              {count >= 0 ? (
                count
              ) : (
                <Stack sx={{ m: 'auto', width: '20%', color: 'grey.500' }} spacing={2}>
                  <LinearProgress sx={{ color: (theme) => theme.palette.primary }} />
                </Stack>
              )}
            </Typography>
            <Typography
              color="textSecondary"
              fontWeight="400"
              sx={{
                lineHeight: '1.2',
                fontSize: 10,
                mt: 1,
              }}
            >
              {title}
            </Typography>
          </CardActionArea>
        </Tooltip>
      </div>
    </ClickAwayListener>
  );
};

export default CustomToolTip;

CustomToolTip.propTypes = {
  title: PropTypes.string,
  popup: PropTypes.object,
  which: PropTypes.string,
  icon: PropTypes.node,
};
