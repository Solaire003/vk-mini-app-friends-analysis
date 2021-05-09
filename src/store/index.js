import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'

const logger = createLogger();
const appReducer = combineReducers(rootReducer)
const middleware = compose(applyMiddleware(logger),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
const store = createStore(appReducer, middleware)

export default store