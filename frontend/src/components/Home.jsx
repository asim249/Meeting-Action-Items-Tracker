import React, { useState, useEffect } from "react";
import API from "../utils/API";

const Home = () => {
  if (!localStorage.getItem("userId")) {
    localStorage.setItem("userId", crypto.randomUUID());
  }

  const userId = localStorage.getItem("userId");

  const [transcript, setTranscript] = useState("");
  const [tasks, setTasks] = useState([]);
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState("All");
  const [editingId, setEditingId] = useState({});
  // const [editingFields, setEditingFields] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch latest tasks & history
  useEffect(() => {
    const fetchHistoryAndTasks = async () => {
      try {
        const res = await fetch(`${API}/api/transcripts?userId=${userId}`);
        if (!res.ok) throw new Error("Failed to fetch history");
        const data = await res.json();
        setHistory(data);

        if (data.length > 0) {
          const latestTranscript = data[0];
          const res2 = await fetch(`${API}/api/transcripts/${latestTranscript._id}?userId=${userId}`);
          if (!res2.ok) {
            setTasks([]);
            return;
          }
          const detailData = await res2.json();
          const formattedTasks = detailData.actionItems.map((item) => ({
            id: item._id,
            task: item.task,
            owner: item.owner,
            dueDate: item.dueDate,
            status: item.status,
          }));
          setTasks(formattedTasks);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchHistoryAndTasks();
  }, []);

  // Generate new transcript / tasks
  const handleGenerate = async () => {
    if (!transcript.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/transcripts/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript, userId }),
      });

      if (!res.ok) {
        alert("Failed to generate action items");
        setLoading(false);
        return;
      }

      const data = await res.json();

      const newTasks = data.actionItems.map((item) => ({
        id: item._id,
        task: item.task,
        owner: item.owner,
        dueDate: item.dueDate,
        status: item.status,
      }));

      setTasks(newTasks);
      setTranscript("");

      // Update history
      setHistory((prev) => [data.actionItems[0]?.transcript || { _id: Date.now(), transcriptText: transcript }, ...prev]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

// Toggle status
const toggleStatus = async (id) => {
  const task = tasks.find((t) => t.id === id);
  const newStatus = task.status === "Open" ? "Completed" : "Open";

  try {
    const res = await fetch(`${API}/api/action-items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }), // userId not needed
    });
    if (!res.ok) throw new Error("Failed to update status");
    const updated = await res.json();
    setTasks(tasks.map((t) => (t.id === id ? updated : t)));
  } catch (err) {
    console.error(err);
  }
};

// Delete task
const deleteTask = async (id) => {
  if (!window.confirm("Are you sure to delete this task?")) return;
  try {
    const res = await fetch(`${API}/api/action-items/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete task");
    setTasks(tasks.filter((t) => t.id !== id));
  } catch (err) {
    console.error(err);
  }
};


  // Add new task
  const addTask = () => {
    const newTask = {
      id: Date.now(),
      task: "New Action Item",
      owner: "Assignee",
      dueDate: new Date().toISOString().split("T")[0],
      status: "Open",
    };
    setTasks([newTask, ...tasks]);
    setEditingId(newTask.id);
  };

  // Update task locally
  const updateTask = async (id, field, value) => {
    const updatedTask = tasks.map((t) => (t.id === id ? { ...t, [field]: value } : t));
    setTasks(updatedTask);

    // Send update to backend if task already exists in DB
    const existingTask = tasks.find((t) => t.id === id && t.id.toString().length === 24); // _id length check
    if (existingTask) {
      try {
        await fetch(`${API}/api/action-items/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ [field]: value, userId }),
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filteredTasks = tasks.filter((t) => (filter === "All" ? true : t.status === filter));

  return (
    <div className="row g-4">
      {/* Left Workspace */}
      <div className="col-lg-8">
        {/* Transcript input */}
        <div className="card p-4 mb-4">
          <h4 className="mb-3 fw-bold">Meeting Action Items Tracker</h4>
          <textarea
            className="form-control mb-2"
            rows="6"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Paste meeting transcript here..."
          ></textarea>
          <button className="btn btn-primary" onClick={handleGenerate} disabled={!transcript.trim() || loading}>
            {loading ? "Generating..." : "Generate Action Items"}
          </button>
        </div>

        {/* Tasks table */}
        <div className="card overflow-hidden">
          <div className="card-header d-flex justify-content-between align-items-center">
            <div className="btn-group btn-group-sm">
              <button className={`btn btn-outline-secondary ${filter === "All" ? "active" : ""}`} onClick={() => setFilter("All")}>All</button>
              <button className={`btn btn-outline-secondary ${filter === "Open" ? "active" : ""}`} onClick={() => setFilter("Open")}>Open</button>
              <button className={`btn btn-outline-secondary ${filter === "Completed" ? "active" : ""}`} onClick={() => setFilter("Completed")}>Completed</button>
            </div>
            <button className="btn btn-dark btn-sm" onClick={addTask}>Add Task</button>
          </div>
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Owner</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((item) => (
                    <tr key={item.id}>
                      <td>
                        {editingId === item.id ? (
                          <input type="text" className="form-control form-control-sm" value={item.task} onChange={(e) => updateTask(item.id, "task", e.target.value)} onBlur={() => setEditingId(null)} autoFocus />
                        ) : (
                          <span className={item.status === "Completed" ? "text-decoration-line-through text-muted" : ""}>{item.task}</span>
                        )}
                      </td>
                      <td>
                        {editingId === item.id ? (
                          <input type="text" className="form-control form-control-sm" value={item.owner} onChange={(e) => updateTask(item.id, "owner", e.target.value)} />
                        ) : (
                          <span className="small text-muted">{item.owner}</span>
                        )}
                      </td>
                      <td>{item.dueDate}</td>
                      <td>
                        <span className={`badge rounded-pill ${item.status === "Completed" ? "bg-success-subtle text-success" : "bg-warning-subtle text-warning-emphasis"}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="text-end">
                        <div className="btn-group btn-group-sm">
                          <button className="btn btn-link text-success p-1" onClick={() => toggleStatus(item.id)}>
                            <i className={`bi ${item.status === "Completed" ? "bi-arrow-counterclockwise" : "bi-check-circle-fill"}`}></i>
                          </button>
                          <button className="btn btn-link text-primary p-1" onClick={() => setEditingId(item.id)}>
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button className="btn btn-link text-danger p-1" onClick={() => deleteTask(item.id)}>
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-3">No tasks found</td>
                  </tr>
                )}
              </tbody>
              
            </table>
          </div>
        </div>
      </div>

      {/* Right Sidebar: History */}
      <div className="col-lg-4">
        <div className="card p-4 h-100">
          <h5 className="fw-bold mb-4">History</h5>
          <div className="list-group list-group-flush">
            {history.map((entry) => (
              <div key={entry._id} className="list-group-item px-0 py-2 border-bottom">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-truncate" style={{ maxWidth: "180px" }}>{entry.transcriptText}...</span>
                  <span className="badge bg-light text-dark">Transcript</span>
                </div>
                <small className="text-muted">{new Date(entry.createdAt).toLocaleString()}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
