import { CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function DaoDocs() {
  const [loading, setLoading] = useState(true);

  const getIframe = () => {
    const theIframe = document.getElementById('docs-iframe');
    if (theIframe) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const myInterval = setInterval(getIframe, 2000);
    if (document.getElementById('main-title')) {
      setLoading(false);
      clearTimeout(myInterval);
    }
  }, []);

  return (
    <Grid container sx={{ height: '85vh' }}>
      <CircularProgress sx={{ display: !loading && 'none' }} />
      <iframe
        id="docs-iframe"
        title="docs"
        loading="lazy"
        src="https://docs.saydao.org"
        style={{ width: '100%', display: loading && 'none' }}
      />
    </Grid>
  );
}
