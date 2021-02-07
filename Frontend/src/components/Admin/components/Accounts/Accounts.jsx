import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteAcc,
  fetchAllAccounts,
} from '../../../../redux/apiCalls/accounts'
import { getAccounts } from '../../../../redux/selectors/accountsSelectors'
import Loader from '../../../Loader/Loader'
import AccountItem from './AccountItem'
import CreateAccount from './CreateAccounts'

const Accounts = React.memo(() => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllAccounts())
  }, [dispatch])
  const accounts = useSelector((state) => getAccounts(state))
  const onDelete = (id) => dispatch(deleteAcc(id))
  return (
    <>
      <CreateAccount />
      <Table
        className="admin-table"
        size="sm"
        bordered
        responsive
        striped
        hover
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Участок</th>
            <th>Роль</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!accounts.length ? (
            <Loader />
          ) : !accounts.length ? (
            <tr>
              <td>Аккаунты отсутствуют</td>
            </tr>
          ) : (
            [...accounts]
              .reverse()
              .map((account, index) => (
                <AccountItem
                  key={account.id}
                  onDelete={onDelete}
                  index={index}
                  {...account}
                />
              ))
          )}
        </tbody>
      </Table>
    </>
  )
})

export default Accounts
