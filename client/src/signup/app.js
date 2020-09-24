import React from 'react';
import ReactDOM from 'react-dom';
import Signup from './components/Signup';
import './styles/styles.scss'
import 'normalize.css/normalize.css';

const appRoot = document.getElementById('app');
const SignupTodo = function() {
    return (
        <Signup />
    )
}

ReactDOM.render(<SignupTodo />, appRoot);