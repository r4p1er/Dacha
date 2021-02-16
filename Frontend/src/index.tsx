import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'
import store from './redux/store'
import { cookie, logout, setUser } from './redux/index'
import { setAuthorizationToken } from './common/utils/utils'
import App from './components/App/App.component'
import './common/styles/style.scss'

if (cookie.get('token')) {
  const userData = {
    id: cookie.get('id'),
    login: cookie.get('login'),
    name: cookie.get('name'),
    lastName: cookie.get('lastName'),
    middleName: cookie.get('middleName'),
    place: cookie.get('placeNum'),
    role: cookie.get('role'),
  }
  setAuthorizationToken(cookie.get('token'))
  store.dispatch(setUser(userData))
} else {
  setAuthorizationToken(false)
  logout()
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
