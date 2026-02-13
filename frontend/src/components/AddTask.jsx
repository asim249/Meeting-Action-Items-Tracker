import React, { useState, useEffect } from "react";
import API from "../utils/API";

function AddTask({ userId }) {
  const [transcripts, setTranscripts] = useState([]);
  const [selectedTranscriptId, setSelectedTranscriptId] = useState("");
  const [task, setTask] = useState("");
  const [owner, setOwner] = useState("");
  const [dueDate, setDueDate] = useState("");


  // Fetch last 5 transcripts on mount
  useEffect(() => {
    const fetchTranscripts = async () => {
      try {
        const res = await fetch(`${API}/api/transcripts?userId=${userId}`);
        const data = await res.json();
        setTranscripts(data);
        console.log("Fetched transcripts:", data);
        if (data.length > 0) setSelectedTranscriptId(data[0]._id); // default latest
      } catch (error) {
        console.error("Failed to fetch transcripts:", error);
      }
    };
    fetchTranscripts();
  }, [userId]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task || !selectedTranscriptId) {
      alert("Task and transcript selection are required");
      return;
    }

    try {
      const res = await fetch(`${API}/api/action-items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task,
          owner,
          dueDate,
          transcriptId: selectedTranscriptId,
          userId,
        }),
      });

      const data = await res.json();
      console.log("Task added:", data);
      alert("Task added successfully!");
      location.reload(); // Refresh to show new task
      // Reset form
      setTask("");
      setOwner("");
      setDueDate("");
    } catch (error) {
      console.error("Failed to add task:", error);
      alert("Failed to add task");
    }
  };

  return (
    <div>
      <button
        className="btn btn-dark btn-sm"
        data-bs-toggle="modal"
        data-bs-target="#createProfile"
      >
        Add Task
      </button>

      {/* Modal Add new task */}
      <div className="modal fade" id="createProfile" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Create New Task</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form id="addTaskForm" onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-12">
                    <label>Transcript</label>
                    <select
                      className="form-control"
                      value={selectedTranscriptId}
                      onChange={(e) => setSelectedTranscriptId(e.target.value)}
                    >
                      {transcripts.map((t) => (
                        <option key={t._id} value={t._id}>
                          {t.transcriptText.substring(0, 50)}...
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-12">
                    <label>Task</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter task"
                      value={task}
                      onChange={(e) => setTask(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-12">
                    <label>Owner</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter owner"
                      value={owner}
                      onChange={(e) => setOwner(e.target.value)}
                    />
                  </div>

                  <div className="col-md-12">
                    <label>Due Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary col-md-12">
                    Add Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* / Modal Add new task */}
    </div>
  );
}

export default AddTask;
