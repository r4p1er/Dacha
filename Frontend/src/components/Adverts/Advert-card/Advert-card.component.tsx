import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import sprite from '../../../common/images/sprite.svg'
import { dateFormater } from '../../../common/utils/utils'
import { ConfirmDeleteModal } from '../../index'
import { getAccounts } from '../../../redux/selectors/accountsSelectors'
import CreateAdvert from '../Adverts-form/CreateAdvert-form.component'
import { AccountType } from '../../../common/types/types'
import { AppStateType } from '../../../redux/store'

type AdCardPropType = {
  onDelete?: (id: number) => void
  id: number
  title: string
  body: string
  contact: string
  place?: number
  date: number | string
  accountId: number
}

const AdCard: React.FC<AdCardPropType> = React.memo(
  ({ title, body, contact, place, id, onDelete, date, accountId }) => {
    const [showAdsCreate, setShowAdsCreate] = useState(false)
    const handleCloseAdsCreate = () => setShowAdsCreate(false)
    const handleShowAdsCreate = () => setShowAdsCreate(true)

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const handleClose = () => setShowDeleteModal(false)
    const handleShow = () => setShowDeleteModal(true)
    const acc: AccountType[] = useSelector((state: AppStateType) =>
      getAccounts(state)
    )

    const advertAcc = acc.filter((account: AccountType) => {
      return account.id === accountId
    })

    return (
      <>
        <div className="post-card">
          <div className="post-card-head">
            <div className="post-card-info">
              <span className="post-title">{title}</span>
              <div className="post-user">
                <span className="post-user-lastName">{advertAcc[0]?.lastName}</span>
                <span className="post-user-name">{advertAcc[0]?.name}</span>
                <span className="post-user-place ml-2">участок №{place}</span>
              </div>
            </div>
            {!onDelete ? null : (
              <div className="post-controls">
                <svg
                  className="mx-2 cursor-pointer"
                  width="25px"
                  height="25px"
                  onClick={() => {
                    handleShowAdsCreate()
                  }}
                >
                  <title>Редактировать</title>
                  <use href={sprite + '#edit'} />
                </svg>
                <svg
                  className="mx-2 cursor-pointer"
                  width="25px"
                  height="25px"
                  onClick={() => {
                    handleShow()
                  }}
                >
                  <use href={sprite + '#delete'} />
                </svg>
              </div>
            )}
          </div>
          <div className="post-card-body">
            <p className="post-body">{body}</p>
          </div>
          <div className="post-contact-info">
            <span className="post-contact">Контакты: {contact}</span>
            <span className="post-date">{dateFormater(date)}</span>
          </div>
        </div>
        <Modal size="xl" show={showAdsCreate} onHide={handleCloseAdsCreate}>
          <Modal.Header closeButton>
            <Modal.Title>Редактирование объявления</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateAdvert
              id={id}
              title={title}
              body={body}
              contact={contact}
              accountId={accountId}
              handleCloseAdsCreate={handleCloseAdsCreate}
            />
          </Modal.Body>
        </Modal>
        {!onDelete ? null : (
          <ConfirmDeleteModal
            title="Удалить объявление"
            show={showDeleteModal}
            onHide={handleClose}
            onDelete={onDelete}
            id={id}
          />
        )}
      </>
    )
  }
)
export default AdCard
