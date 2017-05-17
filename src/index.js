import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './redux/reducers/root';

import Calculator from './containers/Calculator/Calculator';

import './reset.css';
import './index.css';

// window.localStorage.removeItem("state"); console.warn("Local storage disabled for application state");

// check localstorage for a stored state
const storedState = window.localStorage.getItem("state");

// if the state was stored, use it as initial state
const initialState = storedState ? JSON.parse(storedState) : undefined;

// create redux store with the initial state that was potentially loaded from localstorage
const store = createStore(rootReducer, initialState);

// save state to localstorage whenever state is changed
store.subscribe(() => {
	window.localStorage.setItem("state", JSON.stringify(store.getState()));
});

ReactDOM.render(
	<Provider store={store}>
		<Calculator />
	</Provider>,
	document.getElementById('root')
);
