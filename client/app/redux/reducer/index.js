import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import workspaceReducer from './workspace';

const reducer = combineReducers({
  workspaceReducer,
  routing: routerReducer,
});

export default reducer;