import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class Account extends Component {
    constructor() {
        super()
    }

    render() {
        const { contacts, users } = this.props
        const user = users[0]
        console.log(contacts)
        return (
            <Fragment>
                <h3><strong>Account</strong></h3>
                <br />
                <h5>Default Response</h5>
                <p>{user? user.response : ''}</p>
                <hr/>
                <h5>My Contacts</h5>
                {contacts.map(contact => {
                    return(
                        <div>
                        <h6>{contact.name}</h6>
                        {/* <p>Edit</p> */}
                        </div>
                    )
                })}
                <Link to='/contacts/create'><p>+ Add A New Contact</p></Link>
                <div>
                <Link to = "/"><button className="btn btn-light" >Back</button></Link>
                <button className="btn btn-outline-dark">Logout</button>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ contacts, users }) => {
    return {
        contacts,
        users
    }
}

const mapDispatchToProps = ({})


export default connect(mapStateToProps, mapDispatchToProps)(Account)