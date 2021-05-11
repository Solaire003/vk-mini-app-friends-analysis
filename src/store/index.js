import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";

const logger = createLogger();
const appReducer = combineReducers(rootReducer);

const store = createStore(appReducer, applyMiddleware(logger));

export default store;
