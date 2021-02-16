import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row } from 'react-bootstrap'
import { deleteAd, fetchAllAdverts, getUserAdverts } from '../../redux/index'
import AdCard from './Advert-card/Advert-card.component'
import { AppStateType } from '../../redux/store'

const CurrentAdverts: React.FC = React.memo(() => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllAdverts())
  }, [dispatch])
  const userAdverts = useSelector((state: AppStateType) => getUserAdverts(state))

  const onDelete = (id: number) => {
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
