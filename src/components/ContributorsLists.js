import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, ListGroup, ListGroupItem, Spinner } from 'reactstrap'
import { generateUUID } from '../apis/apiUtils'
import {
  loadContributors,
  addContributorAction,
  deleteContributorAction,
} from '../slices/contributors.slice'
import AddContributorModal from './AddContributorModal'
import DeleteModal from './DeleteModal'

const ContributorsLists = () => {
  const [showContributorModal, setShowContributorModal] = useState(false)
  const [deleteID, setDeleteID] = useState(null)
  const dispatch = useDispatch()
  const { data, loading } = useSelector((state) => state.contributors)

  const toggleModal = () => setShowContributorModal(!showContributorModal)

  const handleSaveContributor = (name) => {
    // Dispatch action to save
    const payload = {
      id: generateUUID(),
      name,
      createdAt: new Date().toString(),
    }
    dispatch(addContributorAction(payload))
    toggleModal()
  }

  const handleDelete = (id) => {
    // dispatch delete action
    dispatch(deleteContributorAction(id))
    setDeleteID(null)
  }

  useEffect(() => {
    dispatch(loadContributors())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading)
    return (
      <Spinner
        color="primary"
        className="mt-5"
        style={{
          height: '3rem',
          width: '3rem',
        }}
      >
        Loading...
      </Spinner>
    )

  return (
    <div className="contributor-lists">
      <div className="section">
        {!loading && data.length === 0 ? (
          <span className="h6">No contributors found !</span>
        ) : (
          ''
        )}
        <div className="mt-1">
          <Button onClick={toggleModal} size="sm" color="success">
            Add Contributor
          </Button>
        </div>
        <ListGroup className="mt-4 p-3">
          {data.map((contributor) => (
            <ListGroupItem
              key={contributor.id}
              color="success"
              className="mt-2"
            >
              <div className="d-flex justify-content-between">
                <span className="fw-bold">{contributor.name}</span>
                <Button
                  onClick={() => setDeleteID(contributor.id)}
                  color="danger"
                  size="sm"
                >
                  X
                </Button>
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
        <AddContributorModal
          handleSave={handleSaveContributor}
          onClose={toggleModal}
          open={showContributorModal}
        />
        <DeleteModal
          onClose={() => setDeleteID(null)}
          open={!!deleteID}
          deleteID={deleteID}
          handleSubmit={handleDelete}
        >
          Are you sure you want to delete contributor?
        </DeleteModal>
      </div>
    </div>
  )
}

export default ContributorsLists
