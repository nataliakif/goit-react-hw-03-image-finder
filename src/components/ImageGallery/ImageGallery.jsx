import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';
import API from '../../services/api';
import { Circles } from 'react-loader-spinner';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';

class ImageGallery extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    status: 'idle',
    totalHits: null,
    showModal: false,
  };

  getImages = () => {
    API.fetchImages(this.props.query, this.state.page)
      .then(response => {
        if (response.totalHits === 0) {
          return Promise.reject(
            new Error(`Nothing was found by query ${this.props.query}`)
          );
        } else {
          this.setState({
            images: [...this.state.images, ...response.hits],
            status: 'resolved',
            totalHits: response.totalHits,
            showModal: false,
          });
        }
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };
  componentDidUpdate(prevProps, prevState) {
    window.scrollBy({
      top: document.body.clientHeight,
      behavior: 'smooth',
    });
    if (prevProps.query !== this.props.query) {
      this.setState({ status: 'loading', images: [], page: 1 }, this.getImages);
    }
    if (this.state.page !== prevState.page && this.state.page !== 1) {
      this.setState({ status: 'loading' }, this.getImages);
    }
  }

  handleLoadMore = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 });
  };

  onGalleryClick = e => {
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    this.setState({ showModal: true, id: Number(e.target.dataset.id) });
  };
  modalData = () => {
    const image = this.state.images.find(image => image.id === this.state.id);
    return image;
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images, error, status, totalHits, showModal } = this.state;

    if (status === 'loading') {
      return (
        <div className={styles['Spinner']}>
          <Circles color="#3f51b5" height={80} width={80} />
        </div>
      );
    }
    if (status === 'rejected') {
      return (
        <p className={styles['ImageGallery__rejected']}>{error.message}</p>
      );
    }
    if (status === 'resolved') {
      return (
        <>
          <ul className={styles['ImageGallery']} onClick={this.onGalleryClick}>
            <ImageGalleryItem images={images} />
          </ul>
          {totalHits > 12 && <Button onClick={this.handleLoadMore} />}
          {showModal && (
            <Modal
              onClose={this.toggleModal}
              src={this.modalData().largeImageURL}
              alt={this.modalData().tags}
            />
          )}
        </>
      );
    }
  }
}
ImageGallery.propTypes = { query: PropTypes.string.isRequired };
export default ImageGallery;
