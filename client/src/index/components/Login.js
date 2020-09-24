import React from 'react';

const Login = function (props) {
    return (
        <div className='login' >
            <form onSubmit={(e) => {
            e.preventDefault();
            if (!e.target.email.value) {
                return props.handleError({error: "Please Input Email"})
            }
            if (!e.target.password.value) {
                return props.handleError({error: "Please Input Password"})
            }
            let value = {
                email: e.target.email.value,
                password: e.target.password.value,
            }
            props.handleLogin(JSON.stringify(value));
        }}>
                <div>
                    <label>
                        <p>Email</p>
                        <input className="login__input" name="email"></input>
                    </label>
                </div>
                <div>
                    <label>
                        <p>Password</p>
                        <input className="login__input" type="password" name="password"></input>
                    </label>
                </div>
                <button className="login__button">Submit</button>
            </form>
            <button className="login__button" onClick={() => {
                    window.location.href = '/signup'
                }}>Sign Up</button>
        </div>
    )
}

export default Login