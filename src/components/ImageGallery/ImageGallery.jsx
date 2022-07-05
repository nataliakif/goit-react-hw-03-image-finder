import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, onClick }) => {
  const itemClick = e => {
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    const id = Number(e.target.dataset.id);
    onClick(id);
  };
  return (
    <>
      <ul className={styles['ImageGallery']} onClick={itemClick}>
        <ImageGalleryItem images={images} />
      </ul>
    </>
  );
};
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object.isRequired),
};
export default ImageGallery;
