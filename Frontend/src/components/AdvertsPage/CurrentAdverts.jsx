import React from 'react'
import { useEffect } from 'react'
import { Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAd, fetchAllAdverts } from '../../redux/apiCalls/adverts'
import { getUserAdverts } from '../../redux/selectors/advertsSelectors'
import AdCard from './AdCard'

const CurrentAdverts = React.memo(() => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllAdverts())
  }, [dispatch])
  const userAdverts = useSelector((state) => getUserAdverts(state))

  const onDelete = (id) => {
    dispatch(deleteAd(id))
  }

  return (
    <>
      {!userAdverts.length ? (
        <h3>У вас нет объявлений</h3>
      ) : (
        <Row className="text-center">
          {[...userAdverts].reverse().map((ad) => (
            <AdCard key={ad.id} onDelete={onDelete} {...ad} />
          ))}
        </Row>
      )}
    </>
  )
})

export default CurrentAdverts
