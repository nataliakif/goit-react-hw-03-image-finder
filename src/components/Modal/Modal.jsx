import { Component } from 'react';
import styles from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleClose);
  }

  handleClose = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleCloseClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={styles['Overlay']} onClick={this.handleCloseClick}>
        <div className={styles['Modal']}>{this.props.children}</div>
        <img src={this.props.src} alt={this.props.alt} />
      </div>
    );
  }
}
export default Modal;
