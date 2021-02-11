import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row } from 'react-bootstrap'
import { fetchAllAdverts, getAdverts } from '../../../redux/index'
import { Loader } from '../../index'
import AdCard from './AdCard'
import { AppStateType } from '../../../redux/store'

const Adverts: React.FC = React.memo(() => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllAdverts())
  }, [dispatch])
  const adverts = useSelector((state: AppStateType) => getAdverts(state))
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
