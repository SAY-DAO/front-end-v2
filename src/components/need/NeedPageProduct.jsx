import React, { useState } from 'react';
import {
  Grid,
  Typography,
  CardContent,
  CardMedia,
  Skeleton,
  Card,
  Box,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import IconButton from '@mui/material/IconButton';

export default function NeedPageProduct({ oneNeed, handleDelete }) {
  const { t } = useTranslation();

  const [imageSkeleton, setImageSkeleton] = useState(true);

  return (
    <>
      <Grid>
        <Card
          sx={{
            display: 'flex',
            marginLeft: 2,
            marginRight: 2,
            padding: 1,
          }}
          elevation={handleDelete && 3}
        >
          <CardMedia
            component="img"
            sx={
              imageSkeleton
                ? {
                    display: 'none',
                  }
                : {
                    maxHeight: handleDelete ? 50 : 100,
                    maxWidth: handleDelete ? 50 : 100,
                  }
            }
            image={oneNeed.img}
            alt="Need image"
            onLoad={() => setImageSkeleton(false)}
          />
          <Skeleton
            sx={
              imageSkeleton
                ? {
                    width: 100,
                    height: 100,
                    margin: 1,
                  }
                : {
                    display: 'none',
                  }
            }
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
            }}
          >
            <CardContent
              sx={{
                paddingBottom: '10px !important',
                paddingTop: '10px !important',
                paddingLeft: 0,
                paddingRight: 0,
              }}
            >
              <Grid
                container
                direction={handleDelete ? 'row' : 'column'}
                justifyContent={handleDelete && 'space-between'}
                alignItems={handleDelete && 'center'}
                spacing={handleDelete ? 0 : 4}
              >
                <Grid item xs={5}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      whiteSpace: handleDelete && 'nowrap',
                      width: handleDelete && '80px',
                      overflow: handleDelete && 'hidden',
                      textOverflow: handleDelete && 'ellipsis',
                      fontSize: handleDelete && '10px',
                    }}
                  >
                    {oneNeed.title}
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={4}
                  sx={{
                    display: 'flex',
                    justifyContent: 'right',
                    alignItems: 'start',
                  }}
                >
                  <img
                    src="/images/icons/Money.svg"
                    alt="money icon"
                    style={{
                      maxWidth: 14,
                      maxHeight: 14,
                      marginLeft: 4,
                      marginRight: 4,
                    }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{ fontSize: handleDelete && '10px' }}
                  >
                    {oneNeed.cost.toLocaleString() + t('currency.toman')}
                  </Typography>
                </Grid>
                {handleDelete && (
                  <Grid item xs sx={{ flexGrow: handleDelete && 0 }}>
                    <IconButton
                      color="primary"
                      sx={{ padding: 0 }}
                      onClick={handleDelete && (() => handleDelete(oneNeed.id))}
                    >
                      <DeleteForeverOutlinedIcon color="warning" />{' '}
                    </IconButton>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Box>
        </Card>
      </Grid>
    </>
  );
}

NeedPageProduct.propTypes = {
  oneNeed: PropTypes.object,
  handleDelete: PropTypes.func,
};
