# 🤝 Contributing to MERN Note-Taking App

Thank you for your interest in contributing! This guide will walk you through setting up the project locally on your system using **PowerShell** and best practices to contribute effectively.

---

## 🚀 Quick Start (PowerShell Setup Guide)

Follow these steps to set up the web app locally using PowerShell on Windows.

### 1. **Fork and Clone the Repository**

First, fork the repository on GitHub. Then open **PowerShell** and run:

```powershell
# Clone your fork
git clone https://github.com/Arnabpaul0101/CopyPal.git
cd CopyPal


2. Install Backend Dependencies
cd server
npm install

3. Configure Backend Environment Variables

Create a .env file inside the backend folder:
Open .env using any code editor and add:

MONGO_URI=your_mongodb_connection_string
PORT=5000

4. Run the Backend Server
npm run dev

5. Install Frontend Dependencies
Open a new PowerShell window or tab and run:

cd client
npm install

6. Run the Frontend Server
npm run dev

CopyPal/
├── server/       → Node.js + Express + MongoDB
├── client/      → React.js + Bootstrap


