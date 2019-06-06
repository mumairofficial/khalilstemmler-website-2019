
import React from 'react'
import Rodal from 'rodal'
import PropTypes from 'prop-types'
import "../styles/Modal.sass"

class Modal extends React.Component {

  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  render() {
    const { isOpen, children, onClose, className } = this.props;
    return (
      <div className="modal-container">
        <Rodal 
          className={className}
          width={this.props.width}
          height={this.props.height}
          visible={isOpen} 
          onClose={onClose}>
          { children }
        </Rodal>
      </div>
    )
  }
}

export default Modal;


Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.any
}