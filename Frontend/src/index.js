import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'
import store from './redux/store'
import App from './App'
import { setAuthorizationToken } from './utils'
import { cookie } from './redux/apiCalls/auth'
import { setUser } from './redux/reducers/auth'
import './app.scss'

const userData = {
  id: cookie.get('id'),
  login: cookie.get('login'),
  name: cookie.get('name'),
  lastName: cookie.get('lastName'),
  middleName: cookie.get('middleName'),
  place: cookie.get('placeNum'),
  role: cookie.get('role'),
}

const token = cookie.get('token')
if (token) {
  setAuthorizationToken(token)
  store.dispatch(setUser(userData))
} else {
  setAuthorizationToken('')
  store.dispatch(setUser({}))
  cookie.remove('token')
  cookie.remove('id')
  cookie.remove('login')
  cookie.remove('name')
  cookie.remove('lastName')
  cookie.remove('middleName')
  cookie.remove('placeNum')
  cookie.remove('role')
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
