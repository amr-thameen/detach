import axios from 'axios'

const Send_Message = 'Send_Message'

const _sendMessage = () => {
    type: Send_Message,
        message
}

export const sendMessage = () => {
    return (dispatch) => {
        axios.post('/sms')
        .then(() => dispatch(_sendMessage()))
        .catch(ex => console.log(ex))
    }
}

const twilioReducer = (state = [], action) => {
    switch(action.type){
        case Send_Message:
            return [...newState, action.user]
    default:
        return state
    }
} 

export default twilioReducer