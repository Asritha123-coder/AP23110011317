# Campus Notification System

## 1. Project Title
**Campus Notification System - Assessment Project (Stage 1 & 2)**

## 2. Overview
The Campus Notification System is a comprehensive web-based platform designed to deliver and manage critical campus updates, including Placements, Results, and Events. 

### Stage 1: System Design & Initialization
The first stage of the project focused on foundational architecture and project scaffolding. This included initializing the React + Vite frontend environment, setting up the `notification_app_be` backend placeholder, defining the system architecture, and creating a standalone `logging_middleware` to handle remote telemetry securely.

### Stage 2: Frontend Implementation
The second stage brought the platform to life by building out a fully responsive Single Page Application (SPA) utilizing Material UI. It intelligently processes incoming data from the remote Evaluation Service API to apply strict priority rankings, live sorting, and robust filtering, ensuring that users never miss critical updates while enjoying a highly polished, interactive UI.

## 3. Objectives
- To build a highly responsive and performant Single Page Application (SPA) for notification management.
- To implement priority-based rendering where critical notifications are displayed first.
- To manage client-side state efficiently for read/unread notification tracking.
- To provide deep search, filtering, and sorting capabilities to enhance user experience.
- To strictly log all user and system interactions using a centralized logging middleware.

## 4. Architecture Design
The architecture follows a secure client-server-proxy model. The frontend (React + Vite) acts as the presentation layer, routing API requests locally to a custom Node.js Express backend. This local backend acts as a secure proxy, attaching the JWT Bearer token natively and forwarding the requests to the remote Evaluation Service API.

- **Frontend Core:** Handles UI rendering, client-side routing (`react-router-dom`), and state management, communicating exclusively with the local proxy backend.
- **Backend Proxy:** A Node.js Express server that securely handles CORS policies and hides the authentication token from the browser.
- **Data Normalization Layer:** Intercepts API responses via Axios to map PascalCase API fields into standard camelCase objects.
- **Persistence Layer:** Utilizes the browser's `localStorage` to persist "Read" statuses locally without overloading the backend.
- **Logging Middleware:** A dedicated service module pushing telemetry (Info, Error) to the remote server via the secure backend proxy.

## 5. Folder Structure
```text
AP23110011317/
├── logging_middleware/
│   └── logger.js                 # Centralized logging service
├── notification_app_be/          # Express.js Proxy Server
│   ├── .env                      # Environment variables (Hidden token)
│   ├── package.json              # Backend dependencies
│   ├── README.md                 # Backend documentation
│   └── server.js                 # Proxy server logic and API routes
├── notification_app_fe/          # React + Vite Frontend
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   ├── pages/                # Route-level components
│   │   ├── services/             # API configuration and fetchers
│   │   ├── utils/                # Helper functions (LocalStorage logic)
│   │   ├── App.jsx               # Main application routing and theme
│   │   └── main.jsx              # React mounting point
│   ├── package.json
│   └── vite.config.js
├── README.md                     # Root project instructions
└── notification_system_design.md # System documentation (This file)
```

## 6. Technologies Used
- **Frontend Framework:** React.js (Bootstrapped with Vite)
- **Backend Framework:** Node.js with Express.js
- **Programming Language:** JavaScript (ES6+)
- **UI Library:** Material UI (MUI) v6
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **State Management:** React Hooks (`useState`, `useEffect`, `useMemo`)
- **Local Storage:** Browser `localStorage` API
- **Environment:** dotenv, cors

## 7. Features Implemented
- **Secure API Fetching:** Retrieves live notification data from the remote server utilizing JWT Bearer authentication.
- **Priority Ranking:** Automatically sorts and trims the most critical unread notifications for the Priority Dashboard.
- **Read/Unread Tracking:** Clicking a notification marks it as read, instantly visually updating the card and decreasing the global "Unread" counter.
- **NEW Badge:** Highly visible red badges highlight unread notifications.
- **Dynamic Type Filtering:** Filter dynamically by `All`, `Placement`, `Result`, or `Event`.
- **Live Text Search:** Instantaneous filtering based on notification message bodies.
- **Multi-dimensional Sorting:** Sort by `Newest First`, `Oldest First`, `Priority First`, or `Unread First`.
- **Mark All as Read:** A bulk-action button to clear all active unread statuses instantly.
- **Notification Counts:** Live metric cards showing Total, Unread, Placement, Result, and Event counts.
- **Responsive UI:** Fully fluid layouts catering to both desktop and mobile viewports.
- **Telemetry:** Comprehensive tracking via custom logging middleware.

## 8. Priority Sorting Logic
The system implements a deterministic priority sorting algorithm on the client side:
1. **Category Weighting:** `Placement = 3`, `Result = 2`, `Event = 1`.
2. **Read Status:** Unread notifications always float above Read notifications within the same priority tier.
3. **Timestamp:** If category and read status are identical, notifications are sorted strictly by `Newest First`.

## 9. Read/Unread Logic
Read statuses are isolated to the client environment to ensure ultra-fast UX. 
- The `readStatus.js` utility interacts securely with `localStorage` utilizing a JSON array of `readIds`.
- The `NotificationCard` component listens for click events, triggering a local state update, pushing the ID to local storage, and firing a callback to the parent to instantly update the global summary counters.

## 10. API Integration
The application uses an Axios instance centrally defined in `src/services/api.js`.
- Configured with a `baseURL` and Authorization Headers.
- Includes a data normalization helper (`normalizeNotifications`) to defensively map PascalCase backend keys (`ID`, `Type`, `Message`, `Timestamp`) into the camelCase keys expected by the React components.
- Safely handles API pagination (`page` and `limit` query parameters).

## 11. Logging Middleware Usage
To evaluate system performance and user tracking, the frontend integrates `logging_middleware/logger.js`.
- It captures system events such as "Page Loaded", "API Error", and "Marked Read".
- It enforces strict payload constraints: `stack = 'frontend'`, `package` enum mappings (`page`, `component`, `api`), and strict message length limits (5-48 characters).
- Pushes payloads cleanly using a separate `fetch` pipeline to prevent blocking main UI threads.

## 12. How to Run the Project
1. Navigate to the frontend directory: `cd notification_app_fe`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Access the application locally at `http://localhost:3000`

---

## 13. Screenshots Section

### 1. Home Page - All Notifications Desktop View
> ![Home Page - All Notifications Desktop View](./screenshots/all_notifications_desktop.png)
> *The main dashboard displaying all campus notifications with visual category tags.*

### 2. Priority Notifications Page Desktop View
> ![Priority Notifications Page Desktop View](./screenshots/priority_notifications_desktop.png)
> *The priority view sorting the most critical, unread placement and result updates.*

### 3. Filter Dropdown Working
> ![Filter Dropdown Working](./screenshots/filter_dropdown.png)
> *The category filter restricting the view to specific notification types.*

### 4. Search Feature Working
> ![Search Feature Working](./screenshots/search_feature.png)
> *Live search results filtering messages in real-time.*

### 5. Mark All as Read Feature
> ![Mark All as Read Feature](./screenshots/mark_all_read.png)
> *The result of executing the bulk 'Mark All Read' action, clearing the NEW badges.*

### 6. Mobile Responsive View
> ![Mobile Responsive View](./screenshots/mobile_view.png)
> *The UI elegantly wrapping on smaller viewport devices.*

### 7. Read/Unread Badges Visible
> ![Read/Unread Badges Visible](./screenshots/badges_visible.png)
> *Unread notifications distinctly highlighted alongside read notifications.*

### 8. Browser Console or Successful API Fetch
> ![Browser Console or Successful API Fetch](./screenshots/api_fetch_success.png)
> *Network tab showing successful 200 OK responses fetching JSON notification payloads.*

### 9. Logger Working Screenshot
> ![Logger Working Screenshot](./screenshots/logger_success.png)
> *Browser console demonstrating successful telemetry payload transmissions.*

### 10. GitHub Repository Structure
> ![GitHub Repository Structure](./screenshots/github_structure.png)
> *The structured directory tree of the finalized assessment project.*

---

## 14. Future Improvements
- **WebSockets / Server-Sent Events (SSE):** Transition from a pull-based REST API to a push-based WebSocket model for true real-time incoming alerts.
- **Centralized Global State:** Migrate local component state filtering logic to Redux or Zustand for an enterprise-level architecture.
- **Backend Persistence:** Synchronize the `localStorage` read/unread state with a user database profile so preferences persist across different browsers and devices.

## 15. Conclusion
The Campus Notification System successfully fulfills all Stage 2 assessment requirements. By coupling an aesthetically pleasing, responsive Material UI frontend with robust client-side algorithms for filtering and priority sorting, it delivers a deeply interactive and reliable user experience. The strict adherence to logging protocols and error handling ensures it remains highly maintainable and production-ready.