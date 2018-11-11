import React, { Fragment,  Component } from 'react'
import { connect } from 'react-redux'
import { addContact } from './store/contactsReducer'

class NewContact extends Component {
    constructor(){
        super()
        this.state = {
            name: '',
            response: '',
            phoneNumber: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(ev){
        this.setState({
            [ ev.target.name ] : ev.target.value
        })
        console.log(this.state)
    }

    handleSubmit(ev){
        ev.preventDefault()
        this.props.addContact(this.state)
        this.props.history.push('/account')
    }

    render(){
        const { handleChange, handleSubmit } = this
        const { name, response, phoneNumber } = this.state
        return (
            <Fragment>
                <form onSubmit = {handleSubmit}>
                    <label>Name</label>
                    <input name = 'name' type='text' value={name} onChange = {handleChange}></input>
                    <label>Response</label>
                    <input name = 'response' type='text' value={response} onChange = {handleChange}></input>
                    <label>Phone Number</label>
                    <input name = 'phoneNumber' type='text' value={phoneNumber} onChange = {handleChange}></input>
                    <button type = 'submit'>+ Add Contact</button>
                </form>
            </Fragment>
        )
    }
}

const mapStateToProps = ({}, { history }) => {
    return {
        history
    }
}

const mapDispatchToProps = ({ addContact })

export default connect(mapStateToProps, mapDispatchToProps)(NewContact)