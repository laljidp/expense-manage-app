import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, ListGroup, ListGroupItem } from 'reactstrap'
import { generateUUID } from '../apis/apiUtils'
import {
  loadContributors,
  addContributorAction,
} from '../slices/contributors.slice'
import AddContributorModal from './AddContributorModal'

const ContributorsLists = () => {
  const [showContributorModal, setShowContributorModal] = useState(false)
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

  useEffect(() => {
    dispatch(loadContributors())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) return 'Loading...'

  return (
    <div className="contributor-lists">
      <div className="section">
        {data.length === 0 && (
          <span className="h6">No contributors found !</span>
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
                <span>{contributor.name}</span>
                <Button color="danger" size="sm">
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
      </div>
    </div>
  )
}

export default ContributorsLists
