import React, { useState } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from 'reactstrap'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

function AddExpenseModal(props) {
  const { className, onClose, open, handleSave } = props
  const { data: contributors } = useSelector((state) => state.contributors)
  const [payload, setPayload] = useState({
    title: '',
    contributorName: '',
    cid: '',
    amount: '',
  })
  const [error, setError] = useState(false)

  const closeBtn = (
    <Button size="sm" className="close" outline onClick={onClose} type="button">
      &times;
    </Button>
  )

  const handleChange = ({ target }) => {
    const { name, value } = target
    setPayload({
      ...payload,
      [name]: value,
    })
  }

  const handleSelectContributor = ({ target }) => {
    const { value } = target
    const { name } = contributors.find((c) => c.id === value)
    setPayload({
      ...payload,
      contributorName: name,
      cid: value,
    })
  }

  const closeModal = () => {
    setPayload({
      title: '',
      contributorName: '',
      cid: '',
      amount: '',
    })
    setError(false)
    onClose()
  }

  const isPayloadValid = () => {
    let error = {}
    let isValid = true
    if (!payload?.title?.trim()) {
      error.title = 'Title required'
      isValid = false
    }
    if (!payload?.cid) {
      error.cid = 'Please select contributor'
      isValid = false
    }
    if (!payload?.amount) {
      error.amount = 'Please enter valid amount'
      isValid = false
    }
    setError(error)
    return isValid
  }

  const handleSubmit = () => {
    if (!isPayloadValid()) {
      return
    }
    handleSave(payload)
  }

  return (
    <Modal
      isOpen={open}
      toggle={closeModal}
      className={className}
      backdrop={false}
    >
      <ModalHeader toggle={closeModal} close={closeBtn}>
        Add Expense Details
      </ModalHeader>
      <ModalBody>
        <Input
          value={payload?.title || ''}
          invalid={!!error?.title}
          onChange={handleChange}
          placeholder="Enter expense title"
          name={'title'}
        />
        <Input
          id="selectContributor"
          name="cid"
          type="select"
          className="mt-3"
          invalid={!!error?.cid}
          value={payload?.cid}
          onChange={handleSelectContributor}
        >
          <option value="">Select contributor</option>
          {contributors.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Input>
        <Input
          value={payload?.amount}
          onChange={handleChange}
          invalid={!!error?.amount}
          className="mt-3"
          type="number"
          placeholder="Enter expense amount ₹"
          name={'amount'}
        />
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

AddExpenseModal.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  handleSave: PropTypes.func.isRequired,
}

export default AddExpenseModal
