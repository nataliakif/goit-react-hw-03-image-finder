import { Component } from 'react';
import Searchbar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends Component {
  state = {
    query: '',
    id: null,
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
    const { query } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />;
        <ImageGallery query={query} />
      </>
    );
  }
}

export default App;
