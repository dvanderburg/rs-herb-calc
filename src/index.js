import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
		<BrowserRouter>
			<Switch>
				<Route path="/herbs" render={() => <Calculator section={Calculator.SECTION_HERBS} />} />
				<Route path="/secondaries" render={() => <Calculator section={Calculator.SECTION_SECONDARIES} />} />
				<Route path="/output" render={() => <Calculator section={Calculator.SECTION_OUTPUT} />} />
				<Route path="/requirements" render={() => <Calculator section={Calculator.SECTION_REQUIREMENTS} />} />
				<Route path="/" component={Calculator} />
			</Switch>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
