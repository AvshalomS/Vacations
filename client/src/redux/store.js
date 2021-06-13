import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import ReduxThunk from 'redux-thunk';

const composeA = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeA(applyMiddleware(ReduxThunk)));

export default store;
