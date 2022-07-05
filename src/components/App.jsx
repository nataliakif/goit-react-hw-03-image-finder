import { Component } from 'react';
import Searchbar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import API from '../services/api';
import { Circles } from 'react-loader-spinner';
import styles from './ImageGallery/ImageGallery.module.css';
import Button from './Button/Button';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    status: 'idle',
    id: null,
    totalHits: null,
    showModal: false,
  };
  componentDidMount() {
    console.log('ok');
  }
  componentDidUpdate(prevProps, prevState) {
    window.scrollBy({
      top: document.body.clientHeight,
      behavior: 'smooth',
    });
    if (prevState.query !== this.state.query) {
      this.setState({ status: 'loading', images: [], page: 1 }, this.getImages);
    }
    if (this.state.page !== prevState.page && this.state.page !== 1) {
      this.setState({ status: 'loading' }, this.getImages);
    }
  }
  getImages = () => {
    API.fetchImages(this.state.query, this.state.page)
      .then(response => {
        if (response.totalHits === 0) {
          return Promise.reject(
            new Error(`Nothing was found by query ${this.state.query}`)
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

  handleLoadMore = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 });
  };
  handleFormSubmit = query => {
    this.setState({ query });
  };
  onGalleryClick = id => {
    this.setState({ id, showModal: true });
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  modalData = () => {
    const image = this.state.images.find(image => image.id === this.state.id);
    return image;
  };

  render() {
    const { images, error, status, totalHits, showModal } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />;
        {status === 'loading' && (
          <div className={styles['Spinner']}>
            <Circles color="#3f51b5" height={80} width={80} />
          </div>
        )}
        {status === 'rejected' && (
          <p className={styles['ImageGallery__rejected']}>{error.message}</p>
        )}
        {status === 'resolved' && totalHits > 12 && (
          <>
            <ImageGallery images={images} onClick={this.onGalleryClick} />
            <Button onClick={this.handleLoadMore} />
          </>
        )}
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

export default App;
