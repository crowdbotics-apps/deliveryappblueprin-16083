import { combinedReducers } from "./mainReducer";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { mainSaga } from "./mainSaga";
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}


const sagaMiddleware = createSagaMiddleware();


const persistedReducer = persistReducer(persistConfig, combinedReducers)
/**
 * this app uses React Native Debugger, but it works without it
 */

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [sagaMiddleware /** more middlewares if any goes here */];

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

sagaMiddleware.run(mainSaga);
let persistor = persistStore(store)

export { store , persistor};