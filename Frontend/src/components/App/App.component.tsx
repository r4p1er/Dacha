import React, { lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { getAuth, getUser } from '../../redux/index'
import { AppStateType } from '../../redux/store'
import { Col, Container, Row } from 'react-bootstrap'

import * as components from '../index'
import * as pages from '../../pages/index'

export type AuthPropType = {
  isAuth: boolean
}
export type IsAdminPropType = {
  isAdmin: boolean
}

const Admin = lazy(() => import('../../pages/Admin/Admin.page'))
const AdminAds = lazy(
  () => import('../Admin/Adverts/Adverts.component')
)
const AdminDocs = lazy(
  () => import('../Admin/Documents/Documents.component')
)
const AdminNews = lazy(
  () => import('../Admin/News/News.component')
)
const AdminAccounts = lazy(
  () => import('../Admin/Accounts/Accounts.component')
)
const AdminVote = lazy(
  () => import('../Admin/Vote/Vote.component')
)

const App: React.FC = () => {
  const user = useSelector((state: AppStateType) => getUser(state))
  const isAuthenticated: boolean = useSelector((state: AppStateType) => getAuth(state))
  const role = user.role
  const isAdmin = role === 'admin' || role === 'moder' ? true : false
  
  const showOnNotFound = (location: string) => {
    return !(location === '/not-found')
  }
  return (
    <>
      {showOnNotFound(useLocation().pathname) ? (
        <components.Header
          user={user}
          isAuthenticated={isAuthenticated}
          isAdmin={isAdmin}
        />
      ) : null}
      <Container fluid className="main-container">
        <Row>
          {showOnNotFound(useLocation().pathname) ? (
            <Col
              className="side-bar-container d-none d-xl-flex order-xl-1"
              xl={2}
              lg={6}
              md={6}
              sm={12}
              xs={12}
            >
              {isAuthenticated ? <components.SideBar /> : null}
            </Col>
          ) : null}

          <Col
            className="center-container order-xl-2"
            xl={8}
            lg={12}
            md={12}
            sm={12}
            xs={12}
          >
            <Suspense fallback={<components.Loader />}>
              <Routes>
                <Route exact path="/" element={<pages.HomePage />} />
                <Route path="/home" element={<pages.HomePage />} />

                <Route
                  path="/signin"
                  element={<pages.LoginPage isAuth={isAuthenticated} />}
                />
                <Route
                  path="/news"
                  element={<pages.NewsPage isAuth={isAuthenticated} />}
                />

                <Route
                  path="/adverts"
                  element={<pages.AdvertsPage isAuth={isAuthenticated} />}
                >
                  <Route path="/" element={<components.Adverts />} />
                  <Route path="/current_adverts" element={<components.UserAdverts />} />
                </Route>

                <Route
                  path="/documents"
                  element={<pages.DocumentsPage isAuth={isAuthenticated} />}
                />

                <Route
                  path="/vote"
                  element={<pages.VotePage isAuth={isAuthenticated} />}
                />

                <Route
                  path="/chat"
                  element={<pages.ChatPage isAuth={isAuthenticated} />}
                />

                <Route
                  path="/messages"
                  element={<pages.MessagesPage isAuth={isAuthenticated} />}
                />
                <Route path="/admin" element={isAdmin ? <Admin /> : null}>
                  <Route path="/news" element={<AdminNews />} />
                  <Route path="/adverts" element={<AdminAds />} />
                  <Route path="/documents" element={<AdminDocs />} />
                  <Route path="/vote" element={<AdminVote />} />
                  <Route path="/accounts" element={<AdminAccounts />} />
                </Route>
                <Route path="/not-found" element={<pages.NotFoundPage />} />
                <Route path="/*" element={<Navigate to="/not-found" />} />
              </Routes>
            </Suspense>
          </Col>
          {showOnNotFound(useLocation().pathname) ? (
            <Col
              className="user-menu-container d-none d-xl-flex order-xl-3"
              xl={2}
              lg={6}
              md={6}
              sm={12}
              xs={12}
            >
              {isAuthenticated ? <components.UserMenu isAdmin={isAdmin} /> : null}
            </Col>
          ) : null}
        </Row>
      </Container>
    </>
  )
}

export default App
