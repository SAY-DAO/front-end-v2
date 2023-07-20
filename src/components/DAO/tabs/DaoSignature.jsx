import { CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { fetchSignedNeeds } from '../../../redux/actions/main/daoAction';
import SignatureCard from '../signing/SignatureCard';
import CoverCard from '../CoverCard';

export default function DaoSignature() {
  const dispatch = useDispatch();

  const [skeleton, setSkeleton] = useState();

  const userDetails = useSelector((state) => state.userDetails);
  const { theUser } = userDetails;

  const signingNeeds = useSelector((state) => state.signingNeeds);
  const { readyNeeds, children, success: successSignedNeeds } = signingNeeds;

  useEffect(() => {
    if (!successSignedNeeds) {
      dispatch(fetchSignedNeeds());
    }
  }, []);

  return (
    <>
      {!successSignedNeeds ? (
        <CircularProgress sx={{ mt: 1 }} />
      ) : (
        <Grid container>
          <CoverCard skeleton={skeleton} setSkeleton={setSkeleton} />
          <Box sx={{ p: 2, width: '100%', height: 450, overflowY: 'scroll' }}>
            <ImageList variant="masonry" cols={2} gap={8}>
              {readyNeeds &&
                readyNeeds.map((need) => (
                  <ImageListItem key={need.id}>
                    <SignatureCard childrenList={children} userId={theUser.id} need={need} />
                  </ImageListItem>
                ))}
            </ImageList>
          </Box>
        </Grid>
      )}
    </>
  );
}
