import { combineReducers } from 'redux';
import { asyncReducer } from './asyncReducer'
// You'll also need to import any other necessary custom reducers.

const rootReducer = combineReducers({
    async: asyncReducer,
    // Include any other reducers required by your application.
});

export default rootReducer;