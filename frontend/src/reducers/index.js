import { combineReducers } from 'redux';

import FilterReducer from './FilterReducer';
import UserReducer from './UserReducer';
import SystemReducer from './SystemReducer';
// import SocketReducer from './SocketReducer';

const rootReducer = combineReducers({
  system: SystemReducer,
  coupons: FilterReducer,
  user: UserReducer,
  // socket: SocketReducer,
});


const mapDispatchToProps = {
  combineReducers
};

export default rootReducer;
