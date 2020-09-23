import React from 'react';

const Tasks = (props) => {
    return (
        <div>
            {props.tasks.map((task) => {
                return  <Task
                            key = {task.title}
                            id = {task._id}
                            title = {task.title}
                            description = {task.description}
                            completed = {task.completed}
                            createdAt = {new Date(task.createdAt)}
                            handleRemoveTask = {props.handleRemoveTask}
                            handleCompletedTask = {props.handleCompletedTask}
                        />
            })}
        </div>
    )
}

const Task = (props) => {
    return (
        <div className='task'>
            <div className="task__content">
                <h3 className={props.completed ? 'task__title task__title__done' : 'task__title'}>{props.title}</h3>
                <p>{props.description? <>{props.description}</> : <>No description</>}</p>
                <p>{props.createdAt.getDate()} - {props.createdAt.getMonth() + 1} - {props.createdAt.getFullYear()}</p>
            </div>
            <div className="task__buttons">
                <button className="task__button" onClick={() => {
                    props.handleRemoveTask(props.id)
                }}>Remove</button>
                <button className="task__button" onClick={() => {
                    props.handleCompletedTask(props.id, props.completed)
                }}>{props.completed ? <>UnDone</> : <>Done</>}</button>
            </div>

        </div>
    )
}

export default Tasks