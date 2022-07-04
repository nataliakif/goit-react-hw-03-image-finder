import PropTypes from 'prop-types';
import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import styles from './SearchBar.module.css';

class Searchbar extends Component {
  state = {
    query: '',
  };
  handleQueryChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
      Notify.failure('Type your search query');
      return;
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };
  render() {
    return (
      <header className={styles['Searchbar']}>
        <form className={styles['SearchForm']} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles['SearchForm-button']}>
            <label className={styles['SearchForm-button-label']}>Search</label>
          </button>

          <input
            className={styles['SearchForm-input']}
            type="text"
            name="query"
            value={this.state.query}
            onChange={this.handleQueryChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
