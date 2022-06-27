import { combineReducers } from 'redux';
import carReducer from './carReducer';
import personReducer from './personReducer';

const rootReducer = combineReducers({
    personReducer, carReducer
});
 
export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;