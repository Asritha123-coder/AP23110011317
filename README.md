# Campus Notification System (Full Stack)

This repository contains the complete codebase for the Campus Notification System assessment, separated into a React frontend and a Node.js Express backend proxy.

## Project Structure
- `notification_app_fe/`: The React + Vite frontend application.
- `notification_app_be/`: The Node.js + Express backend proxy server.
- `logging_middleware/`: The custom logger service integrated into the frontend.
- `notification_system_design.md`: The complete system architecture and documentation.

## How to Run the Project

### 1. Start the Backend Proxy Server
The backend is strictly required to handle CORS and securely inject the Bearer Token into requests before they hit the external evaluation service.

1. Open a terminal and navigate to the backend:
   ```bash
   cd notification_app_be
   ```
2. Ensure you have your `.env` file set up with the required `ACCESS_TOKEN`.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
*(The server will start on `http://localhost:5000`)*

### 2. Start the Frontend React App
1. Open a **new** terminal and navigate to the frontend:
   ```bash
   cd notification_app_fe
   ```
2. Install dependencies (if you haven't already):
   ```bash
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```
*(The app will start on `http://localhost:3000`)*

## Documentation
Please refer to [notification_system_design.md](./notification_system_design.md) for an in-depth breakdown of the architecture, features, sorting logic, and screenshots of the completed project.
