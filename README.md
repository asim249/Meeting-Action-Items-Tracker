# 📋 Meeting Action Items Tracker (AI-Powered)

An intelligent productivity application that leverages **Google Gemini AI** to transform meeting discussions into organized, actionable tasks. Never let a crucial decision slip through the cracks again.

---

## 🎯 Project Purpose
Meetings are often filled with high-level decisions and delegated tasks that get lost in the noise. This application analyzes transcripts to **automatically extract responsibilities**, ensuring every participant knows their next steps.

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | **React.js** |
| **Backend** | **Node.js & Express.js** |
| **Database** | **MongoDB** |
| **AI Engine** | **Google Gemini AI** |

---

## ✨ Key Features

* **AI Task Generation:** Automatically convert messy transcripts into structured action items.
* **Transcript Archiving:** Securely store and reference past meeting discussions.
* **Task Management:** Full **CRUD** capabilities (Create, Read, Update, Delete) for extracted tasks.
* **Health Monitoring:** Built-in status checks for the Server, Database, and AI API.
* **Linked View:** Access transcripts and their specific related tasks in a unified view.

---

## 🧠 AI Integration & Workflow

The system utilizes the **Google Gemini API** to perform deep text analysis.

1.  **Input:** User uploads or pastes a meeting transcript.
2.  **Analysis:** The AI identifies intent, mentions of specific names, and "to-do" keywords.
3.  **Extraction:** Structured tasks are generated and mapped to the database.
4.  **Management:** Tasks are presented to the user for validation or manual editing.

---

## ⚙️ How It Works



1.  User submits a meeting transcript through the **React** interface.
2.  The **Node.js** backend routes the data to **Google Gemini AI**.
3.  AI returns a structured list of responsibilities.
4.  Tasks are saved in **MongoDB** and linked to the unique Transcript ID.
5.  Users manage their workflow via the dashboard.

---

## 📊 System Status Monitoring
The dashboard includes a real-time health check for:
* ✅ **Backend Server** (Express.js Availability)
* ✅ **Database Connection** (MongoDB Atlas/Local)
* ✅ **AI Service** (Gemini API Connectivity)

---

## 💡 Use Cases
* **Team Meetings:** Syncing internal project updates.
* **Client Meetings:** Capturing specific requirement changes.
* **Academic Groups:** Delegating research tasks for projects.
* **Daily Stand-ups:** Tracking blockers and daily goals.

---

## 🚀 Future Enhancements
* [ ] **Task Priority Detection:** Auto-labeling urgent tasks.
* [ ] **Deadlines & Reminders:** Integration with calendars.
* [ ] **Team Collaboration:** Multi-user workspaces.
* [ ] **Export Options:** Download summaries as PDF or Markdown.
* [ ] **Auth System:** Secure user login and roles.

---

## ✅ Conclusion
The **Meeting Action Items Tracker** bridges the gap between conversation and execution. By automating the "note-taking" phase, teams can focus on what matters: **getting work done.**