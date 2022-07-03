import styles from './ImageGalleryItem.module.css';
import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ images }) => {
  return images.map(({ id, webformatURL, largeImageURL }) => (
    <li className={styles['ImageGalleryItem']} key={id}>
      <img
        className={styles['ImageGalleryItem-image']}
        src={webformatURL}
        data-id={id}
        alt="gallery_image"
      />
    </li>
  ));
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};
export default ImageGalleryItem;
