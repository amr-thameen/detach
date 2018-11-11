import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'
import messages from './messagesReducer'
import users from './usersReducer'
import twilio from './messagesReducer'
import contacts from './contactsReducer'

const reducer = combineReducers({
    messages,
    users,
    twilio,
    contacts
})

const store = createStore(
    reducer,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
)

export default store