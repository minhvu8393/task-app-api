import React from 'react';

const AddTask = function(props) {
    return (
        <div className="addTask">
            <form onSubmit={(e) => {
                e.preventDefault();
                if (!e.target.title.value) {
                    return props.handleError({error: 'Please Input Title'})
                }
                props.handleError({error: null});
                let task = {
                    title: e.target.title.value,
                    description: e.target.description.value
                }
                e.target.title.value = '';
                e.target.description.value = '';
                props.handleAddTask(JSON.stringify(task));
            }}>
                <div>
                    <label>
                        <p className="addTask__label">Title</p>
                        <input className="addTask__input" name="title"></input>
                    </label>
                </div>
                <div>
                    <label>
                        <p>Description</p>
                        <input className="addTask__input" name="description"></input>
                    </label>
                </div>
                <div>
                    <button className="addTask__button">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddTask;