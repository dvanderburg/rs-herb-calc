import React from 'react';
import ReactDOM from 'react-dom';
// import { Router, Route, hashHistory } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './redux/reducers/root';

// import HerbInputForm from './containers/InventoryInputForm/HerbInputForm';
// import MiscItemInputForm from './containers/InventoryInputForm/MiscItemInputForm';
// import PotionTotal from './containers/PotionTotal/PotionTotal';
// import SiteSplash from './components/SiteSplash/SiteSplash';

import CalculatorTester from './containers/CalculatorTester/CalculatorTester';

import './reset.css';
import './index.css';

// window.localStorage.removeItem("state");

// sample data from may 2018 spreasheet, taken on may 9
// window.localStorage.setItem("state", '{"matrix":{"inventory":{"225b66c9-a3bd-4c96-9ca5-3342f0e6aad6":1500,"6ebdef48-fbd8-48e6-8080-2a6158ccf619":883,"2a3a03f8-b290-4e3e-8e6b-1c7f089faa1c":6671,"7043880b-03df-4944-877f-d2a47933b759":1683,"a4f1aaa9-0e7c-46f7-be81-14f03e7cfb77":664,"0456634e-6f8a-44a7-9421-d7e9e1558440":1194,"5ecee9c2-ebaa-435e-a980-0c9600e3510e":840,"f1d6ccc9-f14d-4bad-a535-57ff79810850":517,"127565b9-0d7e-41b9-964e-609572ef30fc":591,"2b509359-9011-4c30-8ed5-741a4b451788":14,"e739cb53-00cd-42c3-acd6-fbd9bf970067":452,"d2ca2b87-b811-4c70-b532-ac26b427249e":0,"fcb6dfa8-d2a5-4228-a1c8-434e646a9810":0,"a0075b26-0434-4764-aac3-92d96f60f2cc":1321,"887280d0-2918-489d-849a-d56fff5c0165":0,"e0326636-995b-4ae9-90e0-48d1be58b5ba":0,"d718cc8c-460e-43ae-af7c-4c81a4ac85e2":0,"96dbd69b-ac8f-4115-b603-5d27154f52b8":1570,"9a1df3b4-0013-4006-9b13-94f26e62c895":230,"8aca6504-1bd6-4bdf-816b-393d11577b9b":419,"071fb92b-4839-4c01-9855-b0946d33188b":1634,"c91860a3-5490-4cb7-8e6f-b4d091c4bdcd":514,"ea912f61-32b7-43b3-a672-f10340fe19c9":429,"14249e59-466e-4138-a0c9-1bd97d306a51":7000,"59b10d27-e9e4-4ebe-a3be-778d6730d693":149,"f3400789-a81b-4d2e-a683-5974569adbc1":37,"6996eba7-f8c5-4422-b020-b374606d317d":0,"4fe4d84d-1d4c-4f48-b22b-90024bad655b":0,"3745f94f-edaa-400f-89f4-b2712957ec8a":15,"53f27782-b438-483b-b77b-6c3917616769":203,"4c3b6c75-f8cb-4595-9d26-0df774f6a4a6":753,"53af9bae-3ac9-448f-a581-0145ea803428":2840,"768af8c4-48c0-4acb-af76-02780a3932ba":8709,"63f558c2-29e1-4d1c-b51a-1d0bedcd4d04":12715,"ab0f839d-0c36-4088-a23c-3cd8de32aa92":1761,"1bf9c833-e943-4239-baf6-3e844e5c464d":1971,"b9d5e834-c2c6-435a-8543-b17d297040f2":1955,"44ba30fc-5c13-4193-af35-dea5188c1c4b":2265},"used":{"225b66c9-a3bd-4c96-9ca5-3342f0e6aad6":50,"2a3a03f8-b290-4e3e-8e6b-1c7f089faa1c":50,"7043880b-03df-4944-877f-d2a47933b759":50,"f1d6ccc9-f14d-4bad-a535-57ff79810850":50,"e739cb53-00cd-42c3-acd6-fbd9bf970067":50,"4c3b6c75-f8cb-4595-9d26-0df774f6a4a6":50,"a4f1aaa9-0e7c-46f7-be81-14f03e7cfb77":50},"requirements":{"2a3a03f8-b290-4e3e-8e6b-1c7f089faa1c":0,"7043880b-03df-4944-877f-d2a47933b759":0,"f1d6ccc9-f14d-4bad-a535-57ff79810850":983,"e739cb53-00cd-42c3-acd6-fbd9bf970067":1048,"4c3b6c75-f8cb-4595-9d26-0df774f6a4a6":747,"a4f1aaa9-0e7c-46f7-be81-14f03e7cfb77":0,"0456634e-6f8a-44a7-9421-d7e9e1558440":0,"5ecee9c2-ebaa-435e-a980-0c9600e3510e":143,"127565b9-0d7e-41b9-964e-609572ef30fc":457,"2b509359-9011-4c30-8ed5-741a4b451788":733,"6ebdef48-fbd8-48e6-8080-2a6158ccf619":0,"a0075b26-0434-4764-aac3-92d96f60f2cc":0,"96dbd69b-ac8f-4115-b603-5d27154f52b8":0,"53af9bae-3ac9-448f-a581-0145ea803428":0,"768af8c4-48c0-4acb-af76-02780a3932ba":0,"8aca6504-1bd6-4bdf-816b-393d11577b9b":0,"071fb92b-4839-4c01-9855-b0946d33188b":0,"63f558c2-29e1-4d1c-b51a-1d0bedcd4d04":0,"ab0f839d-0c36-4088-a23c-3cd8de32aa92":0,"1bf9c833-e943-4239-baf6-3e844e5c464d":0,"b9d5e834-c2c6-435a-8543-b17d297040f2":0,"44ba30fc-5c13-4193-af35-dea5188c1c4b":0},"getRequirements":{"2a3a03f8-b290-4e3e-8e6b-1c7f089faa1c":-40}}}');

// check localstorage for a stored state
const storedState = window.localStorage.getItem("state")

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
		<CalculatorTester />
	</Provider>,
	document.getElementById('root')
);

/*
ReactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/" component={SiteSplash} />
			<Route path="/herbs" component={HerbInputForm} />
			<Route path="/items" component={MiscItemInputForm} />
			<Route path="/potions" component={PotionTotal} />
		</Router>
	</Provider>,
	document.getElementById('root')
);
*/
