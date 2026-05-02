# Notification System Design - Stage 1

## Objective
Display top 10 important unread notifications.

## API Used
GET /evaluation-service/notifications

## Priority Logic
- Placement = Highest
- Result = Medium
- Event = Lowest

## Sorting Method
1. Priority first
2. Latest timestamp next

## Technologies Used
- React (Vite)
- Axios
- JavaScript

## Output
Displayed top 10 notifications in browser.

## Logging Middleware
Reusable logger created separately.