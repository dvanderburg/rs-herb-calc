import {combineReducers} from 'redux';

import matrixReducer from './matrix';

export default combineReducers({
	matrix: matrixReducer
});
