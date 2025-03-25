import { useState } from "react";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("None");

  // Handle input changes
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  // Add or Update Task
  const handleSave = (e) => {
    e.preventDefault();
    if (task.title.trim() === "") return;
    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = task;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, task]);
    }
    setTask({ title: "", description: "", dueDate: "", status: "Pending" });
  };

  // Delete Task
  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Edit Task
  const handleEdit = (index) => {
    setTask(tasks[index]);
    setEditIndex(index);
  };

  // Filter Tasks
  const filteredTasks = tasks.filter(
    (task) => filter === "All" || task.status === filter
  );

  // Sort Tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "Due Date") return new Date(a.dueDate) - new Date(b.dueDate);
    if (sortBy === "Status") return a.status.localeCompare(b.status);
    return 0;
  });

  return (
    <div className="task-manager">
      <h2>Task Manager</h2>
      <form onSubmit={handleSave}>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Description"
          rows="4"
          className="textarea"
        />
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
        />
        <select name="status" value={task.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit">
          {editIndex !== null ? "Update Task" : "Add Task"}
        </button>
      </form>

      {/* Filter & Sort Controls */}
      <div className="controls">
        <label>Filter: </label>
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <label> Sort by: </label>
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="None">None</option>
          <option value="Due Date">Due Date</option>
          <option value="Status">Status</option>
        </select>
      </div>

      {/* Task List */}
      <ul className="task-list">
        {sortedTasks.map((t, index) => (
          <li key={index} className="task-item">
            <strong>{t.title}</strong> - {t.description} <br />
            Due: {t.dueDate || "Not set"} | Status: {t.status}
            <br />
            <div className="button-container">
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
