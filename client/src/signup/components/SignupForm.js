import React, { useState } from 'react';

const SignupForm = function(props) {
    return (
        <div className="signup">
            <form onSubmit={(e) => {
                e.preventDefault();
                if (!e.target.name.value) {
                    return props.handleError({error: 'Please Input Name'})
                }
                if (!e.target.email.value) {
                    return props.handleError({error: 'Please Input Email'})
                }
                if (!e.target.password.value) {
                    return props.handleError(({error: 'Please Input Password'}))
                }
                let user = {
                    name: e.target.name.value,
                    email: e.target.email.value,
                    password: e.target.password.value
                };
                user = JSON.stringify(user);
                props.handleError({error: null});
                props.handleSignup(user);
            }}>
                <label>
                    <p>Name</p>
                    <input className="signup__input" name="name"></input>
                </label>
                <label>
                    <p>Email</p>
                    <input className="signup__input" name="email"></input>
                </label>
                <label>
                    <p>Password</p>
                    <input className="signup__input" name="password" type="password"></input>
                </label>
                <div>
                    <button className="signup__button">Submit</button>
                </div>

            </form>
        </div>
    )
}

export default SignupForm;