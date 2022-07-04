import { Component } from 'react';
import Searchbar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';

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
    const { images, query } = this.state;
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
