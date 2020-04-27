import React from 'react'
import reactDom from 'react-dom'
import Loadable from 'react-loadable'
import { HashRouter, Route, BrowserHistory, Redirect, Switch } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import { PersistGate } from 'redux-persist/lib/integration/react'
import zhCN from 'antd/es/locale/zh_CN'

import './app.css'
import { store, persistore } from './configureStore'
import LoadingPage from './components/LoadingPage/LoadingPage'
import RealTime from './TestRealTimeGreenWave'

const Loading = () => <LoadingPage />
const Login = Loadable({
  loader: () => import('./containers/Login/Login'),
  loading: Loading,
  delay: 0,
})
const Entrance = Loadable({
  loader: () => import('./containers/Entrance/Entrance'),
  loading: Loading,
  delay: 0,
})
const Inter = Loadable({
  loader: () => import('./containers/Evaluate/Inter/Inter'),
  loading: Loading,
  delay: 0,
})
const SignalHome = Loadable({
  loader: () => import('./containers/PolicyDecision/SignalHome/SignalHome'),
  loading: Loading,
  delay: 0,
})
const Optimize = Loadable({
  loader: () => import('./containers/PolicyDecision/optimize/optimize'),
  loading: Loading,
  delay: 0,
})
const Monitoring = Loadable({
  loader: () => import('./containers/PolicyDecision/Monitoring/Monitoring'),
  loading: Loading,
  delay: 0,
})
const Timing = Loadable({
  loader: () => import('./containers/PolicyDecision/Timing/Timing'),
  loading: Loading,
  delay: 0,
})
const Timanagement = Loadable({
  loader: () => import('./containers/PolicyDecision/Timanagement/Timing'),
  loading: Loading,
  delay: 0,
})
const SecretTask = Loadable({
  loader: () => import('./containers/PolicyDecision/SecretTask/SecretTask'),
  loading: Loading,
  delay: 0,
})
const AreaOptimize = Loadable({
  loader: () => import('./containers/PolicyDecision/AreaOptimize/AreaOptimize'),
  loading: Loading,
  delay: 0,
})
const InterDetails = Loadable({
  loader: () => import('./containers/PolicyDecision/InterDetails/InterDetails'),
  loading: Loading,
  delay: 0,
})
const InterManagement = Loadable({
  loader: () => import('./containers/PolicyDecision/InterManagement/InterManagement'),
  loading: Loading,
  delay: 0,
})
const RegiolManagement = Loadable({
  loader: () => import('./containers/PolicyDecision/RegiolManagement/RegiolManagement'),
  loading: Loading,
  delay: 0,
})
const RegiolManagementChild = Loadable({
  loader: () => import('./containers/PolicyDecision/RegiolManagementChild/RegiolManagementChild'),
  loading: Loading,
  delay: 0,
})
const Trafficsystem = Loadable({
  loader: () => import('./containers/SystemManage/TrafficSystem'),
  loading: Loading,
  delay: 0,
})
const Usergroup = Loadable({
  loader: () => import('./containers/SystemManage/Usergroup'),
  loading: Loading,
  delay: 0,
})
const Journal = Loadable({
  loader: () => import('./containers/SystemManage/Journal'),
  loading: Loading,
  delay: 0,
})
const TrafficMenu = Loadable({
  loader: () => import('./containers/SystemManage/TrafficMenu'),
  loading: Loading,
  delay: 0,
})
const Jurisdiction = Loadable({
  loader: () => import('./containers/SystemManage/Jurisdiction'),
  loading: Loading,
  delay: 0,
})

const Parent = () => (
  <React.Fragment>
    {/* <Route path="*" component={SystemMenu} /> */}
    <Route path="/realtime" component={RealTime} />
    <Route path="/entrance" component={Entrance} />
    <Route path="/inter" component={Inter} />
    <Route path="/signalhome" component={SignalHome} />
    <Route path="/optimize" component={Optimize} />
    <Route path="/monitoring" component={Monitoring} />
    <Route path="/timanagement" component={Timanagement} />
    <Route path="/secretTask" component={SecretTask} />
    <Route path="/areaOptimize" component={AreaOptimize} />
    <Route path="/interdetails/:id" component={InterDetails} />
    <Route path="/InterManagement" component={InterManagement} />
    <Route path="/RegiolManagement" component={RegiolManagement} />
    <Route path="/RegiolManagementChild" component={RegiolManagementChild} />
    <Route exact path="/usergroup" component={Usergroup} />
    <Route exact path="/journal" component={Journal} />
    <Route exact path="/trafficsystem" component={Trafficsystem} />
    <Route exact path="/trafficMenu" component={TrafficMenu} />
    <Route exact path="/jurisdiction" component={Jurisdiction} />
  </React.Fragment>
)
reactDom.render(
  <AppContainer>
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <PersistGate loading="null" persistor={persistore}>
          <HashRouter basename="" history={BrowserHistory}>
            <Switch>
              <Redirect exact from="/" to="/login" />
              <Route exact path="/login" component={Login} />
              <Route path="/" component={Parent} />
            </Switch>
          </HashRouter>
        </PersistGate>
      </Provider>
    </ConfigProvider>
  </AppContainer>
  , document.getElementById('content'),
)
