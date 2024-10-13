import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Tooltip, Avatar, CardMedia, Typography } from '@mui/material';
import {  useSelector } from 'react-redux';
// import { fetchNeedReceipts } from '../../redux/actions/reportAction';
import { prepareUrl } from '../../../utils/helpers';

export default function ReceiptImage({ receipt }) {
  // const dispatch = useDispatch();

  const [finalImageFile, setFinalImageFile] = useState();

  const receiptAdd = useSelector((state) => state.receiptAdd);
  const { success: successAdd } = receiptAdd;

  const receiptDelete = useSelector((state) => state.receiptDelete);
  const { success: successDelete, loading: loadingDelete } = receiptDelete;

  // after adding
  useEffect(() => {
    if ((successAdd && finalImageFile) || successDelete) {
      // dispatch(fetchNeedReceipts(receipt.id));
      setFinalImageFile();
    }
  }, [successAdd, successDelete]);

  return (
    <>
      <Tooltip
        arrow
        title={
          <>
            <Typography variant="subtitle1">{receipt.code && receipt.code}</Typography>
            <Typography variant="subtitle1">{receipt.title && receipt.title}</Typography>
            <Typography variant="subtitle1">
              {receipt.description && receipt.description}
            </Typography>
            <CardMedia component="img" image={prepareUrl(receipt.attachment)} alt="large" />
          </>
        }
        placement="top"
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <>
            {!loadingDelete && (
              <Avatar
                alt="receipt"
                sx={{ width: 20, height: 20, border: '1px solid gray' }}
                src={prepareUrl(receipt.attachment)}
              />
            )}
          </>
        </Box>
      </Tooltip>
    </>
  );
}

ReceiptImage.propTypes = {
  receipt: PropTypes.shape({
    id: PropTypes.number,
    attachment: PropTypes.string,
    description: PropTypes.string,
    title: PropTypes.string,
    isPublic: PropTypes.bool,
    code: PropTypes.string,
    ownerId: PropTypes.number,
    needStatus: PropTypes.number,
    deleted: PropTypes.string,
  }),
};
