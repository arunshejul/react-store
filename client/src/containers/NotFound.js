import React from 'react';
import FourOhFour from '../assets/FourOhFour.png';

const NotFound = () => {
  return (
    <div>
      <img alt="mast logo" style={styles.imageStyle} className="imageStyle" src={FourOhFour} />
    </div>
  );
};

const styles = {
  imageStyle: {
    width: 550,
    height: 101,
    marginTop: 250,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

export default NotFound;
