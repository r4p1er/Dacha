import React from 'react'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Col, Container, Row } from 'react-bootstrap'
import background from './additions/background.png'
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
  AdminContainer,
  AdminNews,
  AdminAds,
  AdminDocs,
  AdminVote,
  AdminAccounts,
  ChatContainer,
  MessagesContainer,
} from './components/index'

function App() {
  const authState = useSelector((state) => state.auth)
  const role = authState.user.role
  const isAuthenticated = authState.isAuthenticated

  const NotFoundRedirect = () => <Navigate to="/not-found" />

  const showOnNotFound = (location) => {
    return !(location === '/not-found')
  }
  const PrivateRoute = () => {
    return <Outlet />
  }
  return (
    <div
      style={{
        backgroundImage: 'url(' + background + ')',
        minHeight: '100vh',
      }}
    >
      {showOnNotFound(useLocation().pathname) ? (
        <Header authInfo={authState} />
      ) : null}
      <Container fluid className="main-container">
        <Row>
          {showOnNotFound(useLocation().pathname) ? (
            <Col
              className="side-bar-container d-none d-xl-flex order-xl-1"
              col="true"
              xl={2}
              lg={6}
              md={6}
              sm={12}
              xs={12}
            >
              {isAuthenticated ? <SideBar /> : null}
            </Col>
          ) : null}

          <Routes>
            <Col
              className="center-container order-xl-2"
              col="true"
              xl={8}
              lg={12}
              md={12}
              sm={12}
              xs={12}
            >
              <Route path="/" element={<PrivateRoute />}>
                <Route exact path="/" element={<HomeContainer />} />

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

                <Route
                  path="/admin"
                  element={
                    role === 'admin' || role === 'moder' ? (
                      <AdminContainer />
                    ) : null
                  }
                >
                  <Route path="/news" element={<AdminNews />} />
                  <Route path="/adverts" element={<AdminAds />} />
                  <Route path="/documents" element={<AdminDocs />} />
                  <Route path="/vote" element={<AdminVote />} />
                  <Route path="/accounts" element={<AdminAccounts />} />
                </Route>
              </Route>
            </Col>
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/*" element={<NotFoundRedirect />} />
          </Routes>
          {showOnNotFound(useLocation().pathname) ? (
            <Col
              className="user-menu-container d-none d-xl-flex order-xl-3"
              col="true"
              xl={2}
              lg={6}
              md={6}
              sm={12}
              xs={12}
            >
              {isAuthenticated ? (
                <UserMenuContainer authInfo={authState} />
              ) : null}
            </Col>
          ) : null}
        </Row>
      </Container>
    </div>
  )
}

export default App
