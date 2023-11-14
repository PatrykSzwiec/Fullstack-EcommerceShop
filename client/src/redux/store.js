import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import usersReducer from './usersRedux';
import productReducer from './productsRedux';

const rootReducer = combineReducers({
  user: usersReducer,
  products: productReducer,
});

const store = createStore(
  rootReducer,
  compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
	)
);

export default store;