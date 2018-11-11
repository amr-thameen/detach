import axios from 'axios'

const Fetch_User = 'Fetch_User'

const _fetchUser = (users) => ({
    type: Fetch_User,
    users
})

export const fetchUser = () => {
    return (dispatch) => {
        axios.get('/users')
        .then(users => dispatch(_fetchUser(users.data)))
        .catch(ex => console.log(ex))
    }
} 

const usersReducer = (state = [], action) => {
    switch(action.type){
        case Fetch_User:
            return action.users
    default:
        return state
    }
} 


export default usersReducer