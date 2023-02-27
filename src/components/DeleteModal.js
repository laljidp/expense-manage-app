import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import PropTypes from 'prop-types'

function DeleteModal(props) {
  const { onClose, handleSubmit, open, deleteID } = props

  const closeBtn = (
    <Button size="sm" className="close" outline onClick={onClose} type="button">
      &times;
    </Button>
  )
  return (
    <Modal isOpen={open} toggle={onClose} backdrop={false}>
      <ModalHeader toggle={onClose} close={closeBtn}>
        Delete contributor
      </ModalHeader>
      <ModalBody>{props.children}</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => handleSubmit(deleteID)}>
          Submit
        </Button>
        <Button color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

DeleteModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default DeleteModal
