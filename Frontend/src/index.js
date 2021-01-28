import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { CookiesProvider, Cookies } from 'react-cookie'
import store from './redux/store'
import App from './App'
import { setAuthorizationToken } from './utils'
import { setUser } from './redux/auth'
import jwt from 'jsonwebtoken'

const cookie = new Cookies()

const UserCookie = cookie.get('token')
if (UserCookie) {
  console.log(jwt.decode(UserCookie));
  setAuthorizationToken(UserCookie)
  store.dispatch(setUser(jwt.decode(UserCookie)))
} else {
  setAuthorizationToken('')
  store.dispatch(setUser({}))
}

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </CookiesProvider>,
  document.getElementById('root')
)
