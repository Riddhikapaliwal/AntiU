import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


function Info({ totalPrice }) {
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', fontStyle: 'italic' }}>
          Network with like-minded peers!
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.secondary' , fontStyle: 'italic'}}>
          Exchange your skill!!
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.secondary', fontStyle: 'italic' }}>
          Make yourself more capable of achieving your goals!!!
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', fontStyle: 'italic' }}>
          Enter into a smarter room!!!!
        </Typography>
      </Box>
    </React.Fragment>
  );
}

Info.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default Info;