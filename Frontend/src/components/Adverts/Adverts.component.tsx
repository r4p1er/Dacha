import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAllAccounts,
  fetchAllAdverts,
  getAdverts,
} from '../../redux/index'
import { Loader } from '../index'
import AdCard from './Advert-card/Advert-card.component'
import { AppStateType } from '../../redux/store'

const Adverts: React.FC = React.memo(() => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllAdverts())
  }, [dispatch])
  useEffect(() => {
    dispatch(fetchAllAccounts())
  }, [dispatch])
  const adverts = useSelector((state: AppStateType) => getAdverts(state))
  return (
    <>
      {!adverts.length ? (
        <Loader />
      ) : !adverts.length ? (
        <h3>Объявления отсутствуют</h3>
      ) : (
        <div className="adverts-container">
          {[...adverts].reverse().map((ad) => (
            <AdCard key={ad.id} {...ad} />
          ))}
        </div>
      )}
    </>
  )
})

export default Adverts
