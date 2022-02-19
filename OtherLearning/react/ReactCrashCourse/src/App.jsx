import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function getTasks() {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }

    getTasks();
  }, []);

  async function fetchTasks() {
    const res = await fetch("http://localhost:8000/tasks"); //change for static ip
    const data = await res.json();

    return data;
  }

  async function fetchTask(id) {
    const res = await fetch(`http://localhost:8000/tasks/${id}`);
    const data = await res.json();

    return data;
  }

  async function addTask(task) {
    const res = await fetch("http://localhost:8000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(task)
    });

    const data = await res.json();

    setTasks([...tasks, data]);
  }

  async function deleteTask(id) {
    await fetch(`http://localhost:8000/tasks/${id}`, {
      method: "DELETE"
    });

    setTasks(tasks.filter((task) => task.id !== id));
  }

  async function toggleReminder(id) {
    const taskToToggle = await fetchTask(id);
    const updateTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:8000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(updateTask)
    });

    const data = await res.json();
    console.log(data);

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  }

  return (
    //can use empty <>
    <div className="App">
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      ></Header>
      {showAddTask && <AddTask onAdd={addTask}></AddTask>}
      {tasks.length > 0 ? (
        <Tasks
          tasks={tasks}
          onDelete={deleteTask}
          onToggle={toggleReminder}
        ></Tasks>
      ) : (
        "No Tasks"
      )}
      {/* was going to use routes but the way he did it no longer seems to work */}
      <Footer></Footer>
    </div>
  );
}

export default App;
