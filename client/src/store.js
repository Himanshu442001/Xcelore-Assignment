// client/src/store.js
import { configureStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer'; // Example reducer, create your own

// Combine reducers if you have multiple reducers
const rootReducer = combineReducers({
    user: userReducer, //  reducer
    // Add more reducers as needed
});

// Create Redux store
const store = configureStore(rootReducer, applyMiddleware(thunk));

export default store;


