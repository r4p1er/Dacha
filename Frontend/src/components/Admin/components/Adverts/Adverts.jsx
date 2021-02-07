import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllAdverts, deleteAd } from '../../../../redux/apiCalls/adverts'
import { getAdverts } from '../../../../redux/selectors/advertsSelectors'
import Loader from '../../../Loader/Loader'
import AdvertItem from './AdvertItem'

const Adverts = React.memo(() => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllAdverts())
  }, [dispatch])
  const adverts = useSelector((state) => getAdverts(state))
  const onDelete = (id) => dispatch(deleteAd(id))
  return (
    <>
      {!adverts.length ? (
        <Loader />
      ) : !adverts.length ? (
        <h3 className="text-center">Объявления отсутствуют</h3>
      ) : (
        <Table
          className="admin-table"
          size="sm"
          responsive
          striped
          bordered
          hover
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Участок</th>
              <th>Заголовок</th>
              <th>Объявление</th>
              <th>Контакты</th>
              <th>Дата</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {adverts.map((ad, index) => (
              <AdvertItem
                key={ad.id}
                index={index}
                onDelete={onDelete}
                {...ad}
              />
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
})

export default Adverts
