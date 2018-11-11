import axios from 'axios'

const Fetch_Messages = 'Fetch_Messages'

const _fetchMessages = (messages) => ({
    type: Fetch_Messages,
    messages
})

export const fetchMessages = () => {
    return (dispatch) => {
        axios.get('/messages')
        .then((messages) => messages.data.filter(message => message.direction !== 'outbound-api'))
        .then((_messages) => _messages.filter(msg => msg.direction !== 'outbound-reply'))
        .then((filteredMessages) => dispatch(_fetchMessages(filteredMessages)))
        .catch(ex => console.log(ex))
    }
}

const messagesReducer = (state = [], action) => {
    switch(action.type){
        case Fetch_Messages:
            return action.messages
    default:
        return state
    }
}

export default messagesReducer
