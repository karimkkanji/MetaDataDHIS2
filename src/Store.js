import {applyMiddleware, createStore} from 'redux';
//import promise from "redux-promise-middleware";
import thunk from "redux-thunk"
import reducer from "./reducers";
//import { createLogger } from "redux-logger";

const middleware = applyMiddleware( thunk); // add promise(),thunk, createLogger()
export default createStore(reducer, middleware);