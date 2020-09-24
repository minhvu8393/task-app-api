import React from 'react';
import Header from './Header';
import Login from './Login';
import Tasks from './Task';
import AddTask from './AddTask';
import Logout from './Logout';
import Error from './Error';

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            tasks: [],
            error: null
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleAddTask = this.handleAddTask.bind(this);
        this.handleRemoveTask = this.handleRemoveTask.bind(this);
        this.handleCompletedTask = this.handleCompletedTask.bind(this);
        this.handleError = this.handleError.bind(this);
    }
    componentDidMount() {
        fetch('/server/users')
        .then((response) => response.json())
        .then((result) => {
            console.log(result)
            if (result.user) {
                this.setState(() => {
                    return {
                        user: result.user,
                        tasks: result.user.tasks
                    }
                })
            }
        })
    }
    handleLogin(user) {
        fetch('/server/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: user
        })
        .then(response => {
            if (response.status === 200) {
                response.json()
                .then((result) => {
                    this.setState(() => {
                        return {
                            user: result.user,
                            tasks: result.user.tasks,
                            error: null
                        }
                    })
                })
            } else {
                this.handleError({error: "Wrong Email or Password"})
            }
        })

    }
    handleLogout() {
        fetch('/server/users/logout', {
            method: 'POST',
        })
        .then(response => {
            console.log(response);
            if (response.status === 200) {
                this.setState(() => {
                    return {
                        user : '',
                        tasks: [],
                        error: null
                    }
                })
            }
        })
        .catch((err) => {
            console.log(err.message);
        })
    }
    handleAddTask(task) {
        let taskNotExist = this.state.tasks.every((value) => {
            return value.title !== JSON.parse(task).title
        })
        if (!taskNotExist) {
            return this.handleError({error: 'Task Exist'})
        }
        fetch('/server/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: task
        })
        .then(response => response.json())
        .then(result => {
            if (result.task) {
                fetch('/server/users')
                .then(response => response.json())
                .then(result => {
                    this.setState(() => {
                        return {
                            user: result.user,
                            tasks: result.user.tasks
                        }
                    })
                })
            } else {
                return result.error
            }
        })
    }
    handleRemoveTask(id) {
        fetch(`/server/tasks/${id}`, {
            method: 'DELETE'
        })
        .then((response) => {
            if (response.status === 200) {
                this.setState(() => {
                    fetch('/server/users')
                    .then(response => response.json())
                    .then(result => {
                        this.setState(() => {
                            return {
                                tasks: result.user.tasks
                            }
                        })
                    })
                })
            }
        })
    }
    handleCompletedTask(id, completed) {
        if (!completed) {
            fetch(`/server/tasks/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({completed: true})
            })
            .then(response => response.json())
            .then(result => {
                fetch('/server/users')
                .then(response => response.json())
                .then(result => {
                    this.setState(() => {
                        return {
                            tasks: result.user.tasks
                        }
                    })
                })
            }) 
        } else {
            fetch(`/server/tasks/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({completed: false})
            })
            .then(response => response.json())
            .then(result => {
                fetch('/server/users')
                .then(response => response.json())
                .then(result => {
                    this.setState(() => {
                        return {
                            tasks: result.user.tasks
                        }
                    })
                })
            }) 
        }
    }
    handleError(err) {
        this.setState(() => {
            return {
                error: err.error
            }
        })
    }
    render() {
        return (
            <div>
                <Header />
                <div className="container container-content">
                    {this.state.user ?
                        <div>
                            <Logout handleLogout={this.handleLogout} user={this.state.user.name}/>
                            <AddTask handleError={this.handleError} handleAddTask={this.handleAddTask}/>
                            <Error error={this.state.error}/>
                            <Tasks handleCompletedTask={this.handleCompletedTask} handleRemoveTask={this.handleRemoveTask} tasks={this.state.tasks}/>                          
                        </div> 
                        :
                        <div>
                            <Login handleError={this.handleError} handleLogin={this.handleLogin}/>
                            <Error error={this.state.error}/>
                        </div>
                    }
                </div>
            </div>
        )

    }
}

export default TodoApp;