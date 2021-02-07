import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdCard from './AdCard'
import Loader from '../Loader/Loader'
import { fetchAllAdverts } from '../../redux/apiCalls/adverts'
import { Row } from 'react-bootstrap'
import { getAdverts } from '../../redux/selectors/advertsSelectors'

const Adverts = React.memo(() => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllAdverts())
  }, [dispatch])
  const adverts = useSelector((state) => getAdverts(state))
  return (
    <>
      {!adverts.length ? (
        <Loader />
      ) : !adverts.length ? (
        <h3>Объявления отсутствуют</h3>
      ) : (
        <Row>
          {[...adverts].reverse().map((ad) => (
            <AdCard key={ad.id} {...ad} />
          ))}
        </Row>
      )}
    </>
  )
})

export default Adverts
