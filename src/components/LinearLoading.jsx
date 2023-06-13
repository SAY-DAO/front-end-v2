import React from 'react';
import { makeStyles } from '@mui/styles';
import LinearProgress from '@mui/material/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '40%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function LinearIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress color="primary" />
    </div>
  );
}
