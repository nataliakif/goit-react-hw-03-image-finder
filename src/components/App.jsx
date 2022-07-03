import { Component } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { ToastContainer } from 'react-toastify';
import Searchbar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    images: [],
    query: '',
    id: null,
    showModal: false,
  };
  componentDidMount() {
    console.log('ok');
  }

  handleFormSubmit = query => {
    this.setState({ query });
  };
  handleGalleryChange = showButton => {
    this.setState({ showButton });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images, query, page, showModal, showButton } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />;
        <ImageGallery
          images={images}
          query={query}
          onClick={this.handleImageClick}
        />
      </>
    );
  }
}

export default App;
