import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

const phoneNumber = '+18557550509'


class Smiley extends Component {
    constructor() {
        super()
        this.state = {
            time: '',
            showMessages: 'false',
            detached: false,
        }
        this.toggle = this.toggle.bind(this)
        this.detach = this.detach.bind(this)
    }

    toggle() {
        this.setState({
            showMessages: !this.state.showMessages
        })
    }

    detach() {
        this.setState({
            detached: !this.state.detached
        })
    }
    



    render() {
        const faceStyle = {
            position: 'relative',
            display: 'inline - block',
            width: '100px',
            height: '100px',
            border: '3px solid black',
            borderRadius: '100px',
            backgroundColor: `${this.state.detached? `yellow` : `white`}`
        }
        
        const eyesStyle = {
            position: 'absolute',
            top: '20px',
            left: '65%',
            width: '10px',
            height: '8px',
            marginLeft: '-20px',
            borderLeft: '3px solid black',
            borderRight: '3px solid black',
        }
        
        const mouthStyle = {
            position: 'absolute',
            top: '40px',
            left: '20%',
            width: '50px',
            height: '25px',
            marginLeft: '- 7px',
            borderBottom: `${this.state.detached? `3px solid black` : `0px solid black`}`,
            borderTop: '3px solid black',
            borderLeft: '3px solid black',
            borderRight: '3px solid black',
            borderRadius: `${this.state.detached? `0px 0px 100px 100px` : `100px 100px 0px 0px`}`,
            backgroundColor: `${this.state.detached? `white` : `null`}`
        }

        const { showMessages, detached } = this.state
        const { messages, users, contacts } = this.props
        const user = users[0]
        const { toggle } = this
        return (
            <Fragment>
                <div style={faceStyle}>
                    <div style={eyesStyle}></div>
                    <div style={mouthStyle}></div>
                </div>
                <br />
                <h3><strong>
                    {detached ?
                        `${user ? user.name.slice(0, 3) : ''}, you are currently detached!`
                        :
                        `${user ? user.name.slice(0, 3) : ''}, you've been attached for ${user ? user.lastDetach : ''}`
                    }
                </strong></h3>
                <br />
                <button className="btn btn-outline-dark" onClick={() => this.detach()}>{detached ? 'Attach' : 'Detach'}</button>
                <br />
                <br />
                <div style={{ display: 'flex' }}>
                    <p onClick={() => toggle()}><strong>
                        {showMessages ? '⇣ Show Messages Log' : '⇡ Hide Messages Log'}
                    </strong></p>
                    <Link to="/account"><p style={{ marginLeft: '20px' }}><strong>My Account</strong></p></Link>
                </div>
                {!showMessages ?
                    <table>
                        <tr>
                            <th>Contact</th>
                            <th>Message</th>
                            <th>Date</th>
                        </tr>
                        {messages.map(message => {
                            return (
                                <tr key={message.uri}>
                                    <td>{message.from}</td>
                                    <td>{message.body}</td>
                                    <td>{message.dateSent}</td>
                                </tr>
                            )
                        })}
                    </table>
                    :
                    ''
                }
            </Fragment>
        )
    }
}


const mapStateToProps = ({ messages, users, contacts }) => {
    return { messages, users, contacts }
}

export default connect(mapStateToProps)(Smiley)