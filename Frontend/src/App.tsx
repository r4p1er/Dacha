import React, { lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { getAuth, getUser } from './redux/index'
import { Col, Container, Row } from 'react-bootstrap'
import {
  Adverts,
  NewsContainer,
  AdvertsContainer,
  CurrentAdverts,
  DocumentsContainer,
  Header,
  HomeContainer,
  Login,
  NotFound,
  SideBar,
  Vote,
  UserMenuContainer,
  ChatContainer,
  MessagesContainer,
  Loader,
} from './components/index'
import { AppStateType } from './redux/store'

export type AuthPropType = {
  isAuth: boolean
}
export type IsAdminPropType = {
  isAdmin: boolean
}

const Admin = lazy(() => import('./components/pages/AdminPage/AdminContainer'))
const AdminAds = lazy(
  () => import('./components/pages/AdminPage/components/Adverts/Adverts')
)
const AdminDocs = lazy(
  () => import('./components/pages/AdminPage/components/Documents/Documents')
)
const AdminNews = lazy(
  () => import('./components/pages/AdminPage/components/News/News')
)
const AdminAccounts = lazy(
  () => import('./components/pages/AdminPage/components/Accounts/Accounts')
)
const AdminVote = lazy(
  () => import('./components/pages/AdminPage/components/Vote/Vote')
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
        <Header
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
              {isAuthenticated ? <SideBar /> : null}
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
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route exact path="/" element={<HomeContainer />} />
                <Route path="/home" element={<HomeContainer />} />

                <Route
                  path="/signin"
                  element={<Login isAuth={isAuthenticated} />}
                />
                <Route
                  path="/news"
                  element={<NewsContainer isAuth={isAuthenticated} />}
                />

                <Route
                  path="/adverts"
                  element={<AdvertsContainer isAuth={isAuthenticated} />}
                >
                  <Route path="/" element={<Adverts />} />
                  <Route path="/current_adverts" element={<CurrentAdverts />} />
                </Route>

                <Route
                  path="/documents"
                  element={<DocumentsContainer isAuth={isAuthenticated} />}
                />

                <Route
                  path="/vote"
                  element={<Vote isAuth={isAuthenticated} />}
                />

                <Route
                  path="/chat"
                  element={<ChatContainer isAuth={isAuthenticated} />}
                />

                <Route
                  path="/messages"
                  element={<MessagesContainer isAuth={isAuthenticated} />}
                />
                <Route path="/admin" element={isAdmin ? <Admin /> : null}>
                  <Route path="/news" element={<AdminNews />} />
                  <Route path="/adverts" element={<AdminAds />} />
                  <Route path="/documents" element={<AdminDocs />} />
                  <Route path="/vote" element={<AdminVote />} />
                  <Route path="/accounts" element={<AdminAccounts />} />
                </Route>
                <Route path="/not-found" element={<NotFound />} />
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
              {isAuthenticated ? <UserMenuContainer isAdmin={isAdmin} /> : null}
            </Col>
          ) : null}
        </Row>
      </Container>
    </>
  )
}

export default App
