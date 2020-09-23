import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './components/TodoApp';
import 'normalize.css/normalize.css';
import './styles/styles.scss'

const appRoot = document.getElementById('app');

class TaskApp extends React.Component {
    render() {
        return (
            <div>
                <TodoApp />
            </div>
        )
    }
}

ReactDOM.render(<TaskApp />, appRoot);