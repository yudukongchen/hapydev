import { configureStore, compose } from '@reduxjs/toolkit';
import reducers from './reducers';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const isDev = import.meta.env.MODE === 'development' || import.meta.env.MODE === 'test';

export default configureStore({
  reducer: reducers,
  devTools: isDev ? composeEnhancers() : false,
});
