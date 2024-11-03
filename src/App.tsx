import { useState } from 'react'
import './App.css'

function App() {

  const [tasks, setTasks] = useState([
    "Dar banho no Fry",
    "Comprar a ração do cachorro",
    "Comprar a coleira antipulgas"
  ]);

  const [input, setInput] = useState("");

  const [edit, setEdit] = useState({
    enabled: false,
    task: ""
  });

  function handleSave() {
    if (!input) {
      alert("You must insert a plan to save!");
      return;
    }

    if (edit.enabled) {
      handleSaveEdit();
      return;
    }
    
    setTasks( tasks => [...tasks, input])
    setInput("");
  }

  function handleEdit(item: string) {
    setInput(item)
    setEdit({
      enabled: true,
      task: item
    })

    let focus = document.querySelector(".task-input")
    focus.parentNode.style.boxShadow = "0 0 10px 5px purple, 0 0 20px 10px white";
  }

  function handleSaveEdit() {
    const findIndexTask = tasks.findIndex(task => task  === edit.task)
    const allTasks = [...tasks];
    allTasks[findIndexTask] = input;
    setTasks(allTasks);

    setInput("");

    setEdit({
      enabled: false,
      task: ""
    })

    let focus = document.querySelector(".task-input")
    focus.parentNode.style.boxShadow = "";
    
  }

  function handleDelete(item: string) {
    let removed = tasks.filter( task => task !== item)
    if(confirm("Deseja mesmo excluir essa tarefa?")) {
      setTasks(removed)
    }
    return;
  }

  return (
    <main>
      <h1 className="main-title"> Task List </h1>
      <div className="container">
        <div className="command-container">
          <input className="task-input"
          placeholder="Insert your next plan here..."
          value={input}
          onChange={ e => setInput(e.target.value)}
          />
          <button className="save-task-btn" onClick={handleSave}> {!edit.enabled? "Save" : "Update"} </button>
        </div>
        <div className="tasks-board">
        {tasks.map( (item, index) => (
          <div key={index} className="task">
            <button className="edit-btn button" onClick={ () => handleEdit(item)}> Edit </button>
            <button className="delete-btn button" onClick={ () => handleDelete(item)}> Delete </button>
            <span className="task-description"> {item} </span>
          </div>
        ))}
        </div>
      </div>
    </main>
  )
}

export default App
