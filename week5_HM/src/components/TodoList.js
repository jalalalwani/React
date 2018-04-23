import React, { Component } from 'react'
import input from './buttons'
import InsertTasks from './insertTasks'
import {inject, observer} from 'mobx-react'

@inject("data")
@observer
export default class TodoList extends Component{
    componentDidMount = () => {
        this.props.data.getApiTasks()
    }
    render() {
        console.log(this.props.data)
        const { deletingTask, checkingBox, addingNewTask} = this.props.data
        const myTasks = this.props.data.tasksData.map((task, index) => {
            if (task.done === true) {
                return (
                    <li key={task._id}
                        className="unDoneTask"
                        style={{ "textDecoration": "line-through" }}>
                        <input type="checkbox"
                            onChange={() => checkingBox(task._id)}
                            defaultChecked />
                {index+1}- {task.description} on {task.deadline}
                        <input type="button" value="Remove"
                            onClick={() => deletingTask(task._id)} />
                    </li>
                )
            } else {
                return (
                    <li key={task._id} >
                        <input type="checkbox"
                            onChange={() => checkingBox(task._id)} />
                        {index+1}- {task.description} on {task.deadline}
                        <input type="button"value="Remove"
                            onClick={() => deletingTask(task._id)} />
                    </li>
                )
            }
        })
        return (
            <ul>
                <InsertTasks addingNewTask={addingNewTask}/>
                <h2>Todo list</h2>
               {myTasks}             
            </ul>
        )
    }
}
