import React from 'react'
import reactDom from 'react-dom'
import Loadable from 'react-loadable'
import { HashRouter, Route, BrowserHistory, Redirect, Switch } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-intl-redux'
import './app.css'
import LoadingPage from './components/LoadingPage/LoadingPage'

import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

const Loading = () => <LoadingPage />
const Login = Loadable({
  loader: () => import('./containers/Login/Login'),
  loading: Loading,
  delay: 0,
})


const Parent = () => (
  <div>
    {/* <Route path="*" component={SystemMenu} /> */}
  </div>
)
reactDom.render(
  <AppContainer>
    <ConfigProvider locale={zhCN}>
      {/* //<Provider> */}
      <HashRouter basename="" history={BrowserHistory}>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route exact path="/login" component={Login} />
          <Route path="/" component={Parent} />
        </Switch>
      </HashRouter>
      {/* //</Provider> */}
    </ConfigProvider>
  </AppContainer>
  , document.getElementById('content'),
)
