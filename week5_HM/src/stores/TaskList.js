import { observable, action, runInAction } from 'mobx'

const url = 'https://hyf-react-api.herokuapp.com/todos'

class TodoList {


    @observable
    tasksData = []

    @action
    getApiTasks = async () => {
        const res = await fetch(`${url}`)
        const tasks = await res.json()
        //console.log(tasks)
        runInAction(() => {
            this.tasksData = tasks
            console.log(this.tasksData)
        })
    }    

    
    @action    
    deletingTask =async (id) => {
        await fetch(`${url}/${id}`, {
          method : "DELETE",
        })
        this.getApiTasks()
    }
    @action
    checkingBox = async(id) => {
        const task = this.tasksData.find(task => {
           return task._id === id
        })
        await fetch(`${url}/${id}`, {
            method: "PATCH",
            headers: {
            "content-type": "application/json"    
            },
            body: JSON.stringify({
                "done":!task.done
            })
        })
        this.getApiTasks()
    }
    @action
    addingNewTask = async(text, date) => { 
        await fetch(`${url}/create`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "description": text,
                "deadline":date,
            })
        })
        this.getApiTasks()
    }
}

export default new TodoList()