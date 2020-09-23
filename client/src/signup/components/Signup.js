import React from 'react';
import Header from './Header';
import SignupForm from './SignupForm';
import Error from './Error';
 
class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false,
            error: null
        }
        this.handleSignup = this.handleSignup.bind(this);
        this.handleError = this.handleError.bind(this);
    }
    componentDidMount() {
        fetch('/server/users')
        .then(response => {
            if (response.status === 200) {
                response.json()
                .then(() => {
                    this.setState(() => {
                        return {
                            loggedIn: true
                        }
                    })
                })
            } else {
                response.json()
                .then((error) => {
                    return error
                })
            }
        })
        .catch((err) => {
            console.log(err.message)
        })

    }
    handleSignup(user) {
        fetch('/server/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: user
        })
        .then((response) => {
            if (response.status === 201) {
                this.handleError({error: null})
                response.json()
                .then(() => {
                    this.setState(() => {
                        return {
                            loggedIn: true
                        }
                    })
                })
                .catch((err) => {
                    
                })
            } else {
                response.json()
                .then((err) => {
                    this.handleError({error: err.error})
                })
            }
        })
        .catch((err) => {
            this.handleError({error: err.message})
        })
    }
    handleError(errorForm) {
        this.setState(() => {
            return {
                error: errorForm.error
            }
        })
    }
    render() {
        return (
            <div>
                {this.state.loggedIn ? 
                    window.location.href = "/" :
                    <div>
                        <Header />
                        <SignupForm handleError={this.handleError} handleSignup={this.handleSignup} />
                        <Error error={this.state.error}/>
                    </div>
                }
            </div>
        )
    }
}

export default Signup