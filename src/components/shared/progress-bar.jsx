import React, { PropTypes } from 'react';
import LinearProgress from 'material-ui/LinearProgress';

const style = {
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 10
};

const ProgressBar = ({ isLoading }) => {
  if (!isLoading) return <noscript />;

  return (
    <div style={style}>
      <LinearProgress />
    </div>
  );
};

ProgressBar.prototype.propTypes = {
  isLoading: PropTypes.bool
};

export default ProgressBar;
