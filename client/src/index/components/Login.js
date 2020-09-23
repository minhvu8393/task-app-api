import React from 'react';

const Login = function (props) {
    return (
        <div className='login' >
            <form onSubmit={(e) => {
            e.preventDefault();
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
                <button className="login__button" onClick={() => {
                    window.location.href = '/signup'
                }}>Sign Up</button>
            </form>
        </div>
    )
}

export default Login