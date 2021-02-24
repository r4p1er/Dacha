import React, { lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, Redirect, Route, Switch } from 'react-router-dom'
import { getAuth, getUser } from '../../redux/index'
import { AppStateType } from '../../redux/store'
import { Col, Container, Row } from 'react-bootstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import * as components from '../index'
import * as pages from '../../pages/index'
import { Location } from 'history'

const Admin = lazy(() => import('../../pages/Admin/Admin.page'))
const AdminAds = lazy(() => import('../Admin/Adverts/Adverts.component'))
const AdminDocs = lazy(() => import('../Admin/Documents/Documents.component'))
const AdminNews = lazy(() => import('../Admin/News/News.component'))
const AdminAccounts = lazy(() => import('../Admin/Accounts/Accounts.component'))
const AdminVote = lazy(() => import('../Admin/Vote/Vote.component'))

export type AuthPropType = {
  isAuth: boolean
}
export type IsAdminPropType = {
  isAdmin: boolean
}

const App: React.FC = () => {
  const user = useSelector((state: AppStateType) => getUser(state))
  const isAuthenticated: boolean = useSelector((state: AppStateType) =>
    getAuth(state)
  )
  const location: Location = useLocation()

  const role = user.role
  const isAdmin = role === 'admin' || role === 'moder' ? true : false

  const showOnNotFound = (location: string) => {
    return !(location === '/not-found')
  }
  return (
    <>
      {showOnNotFound(location.pathname) ? (
        <components.Header
          user={user}
          isAuthenticated={isAuthenticated}
          isAdmin={isAdmin}
        />
      ) : null}
      <Container fluid className="main-container">
        <Row>
          {showOnNotFound(location.pathname) ? (
            <Col
              className="side-bar-container d-none d-xl-flex order-xl-1"
              xl={2}
            >
              {isAuthenticated ? <components.SideBar /> : null}
            </Col>
          ) : null}

          <Col
            className="center-container order-xl-2 px-3 mx-auto"
            xl={8}
            lg={12}
            md={12}
            sm={12}
            xs={12}
          >
            <Route
              render={({ location }) => (
                <Suspense fallback={<components.Loader />}>
                  <TransitionGroup>
                    <CSSTransition
                      key={location.key}
                      timeout={950}
                      classNames="fade"
                    >
                      <Switch location={location}>
                        <Route
                          exact
                          path="/"
                          render={() => <pages.HomePage />}
                        />
                        <Route path="/home" render={() => <pages.HomePage />} />

                        <Route
                          path="/signin"
                          render={() => (
                            <pages.LoginPage isAuth={isAuthenticated} />
                          )}
                        />
                        <Route
                          path="/news"
                          render={() => (
                            <pages.NewsPage isAuth={isAuthenticated} />
                          )}
                        />

                        <Route
                          path="/adverts"
                          render={() => (
                            <pages.AdvertsPage isAuth={isAuthenticated}>
                              <Switch>
                                <Route
                                  exact
                                  path="/adverts"
                                  render={() => <components.Adverts />}
                                />
                                <Route
                                  path="/adverts/current_adverts"
                                  render={() => <components.UserAdverts />}
                                />
                              </Switch>
                            </pages.AdvertsPage>
                          )}
                        />
                        <Route
                          path="/documents"
                          render={() => (
                            <pages.DocumentsPage isAuth={isAuthenticated} />
                          )}
                        />
                        <Route
                          path="/vote"
                          render={() => (
                            <pages.VotePage isAuth={isAuthenticated} />
                          )}
                        />
                        <Route
                          path="/chat"
                          render={() => (
                            <pages.ChatPage isAuth={isAuthenticated} />
                          )}
                        />
                        <Route
                          path="/messages"
                          render={() => (
                            <pages.MessagesPage isAuth={isAuthenticated} />
                          )}
                        />
                        <Route
                          path="/admin"
                          render={() => (
                            <Admin>
                              <Switch>
                                <Route
                                  path="/admin/news"
                                  render={() => <AdminNews />}
                                />
                                <Route
                                  path="/admin/adverts"
                                  render={() => <AdminAds />}
                                />
                                <Route
                                  path="/admin/documents"
                                  render={() => <AdminDocs />}
                                />
                                <Route
                                  path="/admin/vote"
                                  render={() => <AdminVote />}
                                />
                                <Route
                                  path="/admin/accounts"
                                  render={() => <AdminAccounts />}
                                />
                              </Switch>
                            </Admin>
                          )}
                        />
                        <Route
                          path="/not-found"
                          render={() => <pages.NotFoundPage />}
                        />
                        <Route
                          path="/*"
                          render={() => <Redirect to="/not-found" />}
                        />
                      </Switch>
                    </CSSTransition>
                  </TransitionGroup>
                </Suspense>
              )}
            />
          </Col>
          {showOnNotFound(location.pathname) ? (
            <Col
              className="user-menu-container d-none d-xl-flex order-xl-3"
              xl={2}
            >
              {isAuthenticated ? (
                <components.UserMenu isAdmin={isAdmin} />
              ) : null}
            </Col>
          ) : null}
        </Row>
      </Container>
    </>
  )
}

export default App
