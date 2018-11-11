import axios from 'axios'

const Fetch_Contacts = 'Fetch_Contacts'
const Add_Contact = 'Add_Contact'

const _fetchContacts = (contacts) => ({
    type: Fetch_Contacts,
    contacts
})

const _addContact = (contact) => ({
    type: Add_Contact,
    contact
})


export const fetchContacts = () => {
    return (dispatch) => {
        axios.get('/contacts')
            .then(contacts => dispatch(_fetchContacts(contacts.data)))
            .catch(ex => console.log(ex))
    }
}

export const addContact = (contact) => {
    return (dispatch) => {
        axios.post('/contacts/create', contact)
            .then(contact => dispatch(_addContact(contact)))
    }
}


const contactsReducer = (state = [], action) => {
    switch (action.type) {

        case Fetch_Contacts:
            return action.contacts

        case Add_Contact:
            return [...state, action.contact]

        default:
            return state
    }
}

export default contactsReducer