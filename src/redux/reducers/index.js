import { combineReducers } from 'redux';
import counter from './countReducer';
import loader from './loader';
import wrokSpace from './workSpaceReduces'
import login from './loginReduces'

export default combineReducers({
   count: counter,
   loader,
   wrokSpace,
   login,

})
