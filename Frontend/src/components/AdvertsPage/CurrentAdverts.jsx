import React from 'react'
import { useEffect } from 'react'
import { Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAd, fetchCurrentAdverts } from '../../redux/apiCalls/adverts'
import FullPageLoader from '../Loader/Loader'
import AdCard from './AdCard'

const CurrentAdverts = React.memo(() => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCurrentAdverts())
  }, [dispatch])
  const advertsState = useSelector((state) => state.adverts)
  const loading = advertsState.isLoading

  const onDelete = (id) => {
    dispatch(deleteAd(id))
  }

  return (
    <>
      {!advertsState.adverts.length ? (
        <h3>У вас нет объявлений</h3>
      ) : loading ? (
        <FullPageLoader />
      ) : (
        <Row className="text-center">
          {[...advertsState.adverts].reverse().map((ad) => (
            <AdCard key={ad.id} onDelete={onDelete} {...ad} />
          ))}
        </Row>
      )}
    </>
  )
})

export default CurrentAdverts
