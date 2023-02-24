import React, { useState } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Input,
} from 'reactstrap'
import PropTypes from 'prop-types'

function AddContributorModal(props) {
  const { className, onClose, open, handleSave } = props
  const [name, setName] = useState('')
  const [error, setError] = useState(false)

  const closeBtn = (
    <Button size="sm" className="close" outline onClick={onClose} type="button">
      &times;
    </Button>
  )

  const handleChange = ({ target }) => {
    setName(target.value)
  }

  const closeModal = () => {
    setName('')
    setError(false)
    onClose()
  }

  const handleSubmit = () => {
    if (name.trim().length === 0) {
      setError(true)
      return
    }
    handleSave(name)
  }

  return (
    <Modal
      isOpen={open}
      toggle={closeModal}
      className={className}
      backdrop={false}
    >
      <ModalHeader toggle={closeModal} close={closeBtn}>
        Add contributor
      </ModalHeader>
      <ModalBody>
        <Form>
          <Input
            value={name}
            invalid={error}
            onChange={handleChange}
            placeholder="Enter full name"
          />
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          Save
        </Button>
        <Button color="secondary" onClick={closeModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

AddContributorModal.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  handleSave: PropTypes.func.isRequired,
}

export default AddContributorModal
