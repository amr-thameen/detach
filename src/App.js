import React, { Component, Fragment } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import Nav from './Nav'
import Smiley from './Smiley'
import { fetchMessages } from './store/messagesReducer'
import { fetchContacts } from './store/contactsReducer'
import { fetchUser } from './store/usersReducer'
import { connect } from 'react-redux'
import Account from './Account'
import NewContact from './NewContact'


class App extends Component {
    constructor() {
        super()
    }

    componentDidMount() {
        this.props.fetchMessages()
        this.props.fetchContacts()
        this.props.fetchUser()
    }

    render() {
        return (
            <Router>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <div>
                        <Nav />
                    </div>
                    <br />
                    <Route exact path = "/" render = { () => <Smiley/> }/>
                    <Route path = "/account" render = { () => <Account/> }/>
                    <Route path = '/contacts/create' render = { ({history}) => <NewContact history={history}/>}/>
                </div>
            </Router>
        )
    }
}


const mapDispatchToProps = ({ fetchMessages, fetchContacts, fetchUser })

export default connect(null, mapDispatchToProps)(App)