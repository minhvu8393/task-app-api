import React, { useState } from 'react';

const SignupForm = function(props) {
    return (
        <div>
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
                    Name:
                    <input name="name"></input>
                </label>
                <label>
                    Email:
                    <input name="email"></input>
                </label>
                <label>
                    Password:
                    <input name="password" type="password"></input>
                </label>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default SignupForm;