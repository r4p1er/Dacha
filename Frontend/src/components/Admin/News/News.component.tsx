import React, { useEffect, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { delNews, fetchAllNews, getNews } from '../../../redux/index'
import { AppStateType } from '../../../redux/store'
import { Loader } from '../../index'
import CreateNews from './news-form/CreateNews-form.component'
import NewsItem from './news-item/News-item.component'

const News: React.FC = React.memo(() => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllNews())
  }, [dispatch])
  const news = useSelector((state: AppStateType) => getNews(state))

  const onDelete = (id: number) => dispatch(delNews(id))

  const [showNewsCreate, setShowNewsCreate] = useState(false)
  const handleCloseNewsCreate = () => setShowNewsCreate(false)
  const handleShowNewsCreate = () => setShowNewsCreate(true)

  return (
    <>
      <Button className="mb-4" onClick={handleShowNewsCreate}>
        Добавить новость
      </Button>
      {!news.length ? (
        <h3>Новости отсутствуют</h3>
      ) : !news.length ? (
        <Loader />
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
              <th>Заголовок</th>
              <th>Новость</th>
              <th>Дата</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {[...news].reverse().map((aNews, index) => (
              <NewsItem
                key={aNews.id}
                onDelete={onDelete}
                index={index}
                {...aNews}
              />
            ))}
          </tbody>
        </Table>
      )}
      <Modal size="xl" show={showNewsCreate} onHide={handleCloseNewsCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Создание новости</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateNews handleCloseNewsCreate={handleCloseNewsCreate} />
        </Modal.Body>
      </Modal>
    </>
  )
})

export default News
