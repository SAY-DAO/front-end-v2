import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import PageContainer from './container/PageContainer';

const Error = () => (
  <PageContainer title="Error" description="this is Error page">
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      textAlign="center"
      justifyContent="center"
    >
      <Container maxWidth="md">
        <Typography>404</Typography>
        <Button
          color="secondary"
          variant="contained"
          component={Link}
          to="/"
          disableElevation
        >
          Back to Home
        </Button>
      </Container>
    </Box>
  </PageContainer>
);

export default Error;
