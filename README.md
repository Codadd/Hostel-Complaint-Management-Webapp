# Hostel Complaint Management System

A web-based complaint management system designed to help hostel residents register complaints, monitor their statuses, and provide feedback. The admin can manage complaints and respond to users.

## Table of Content

- [Features](#features)
- [Technologies used](#technolgies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
   -[User Route](#user-route)
   -[Admin Route](#admin-route)
   -[Feedback Route](#feedback-route) 
- [Feedback System](#feedback-system)
- [Usage](#Usage)

## Features 

### User Side
- Role-based Authentication: Users can sign up and log in.
- Complaint Registration: Users can submit complaints with details like issue type, description, and room number.
- Anonymous Complaints: Users have the option to submit complaints anonymously.
- Complaint Status Tracking: Users can view the status and admin response for each registered complaint.
- Feedback System: After a complaint is marked as "resolved," users can provide feedback.

### Admin Side
- Admin Dashboard: Admins can view all complaints, filter by status or category, and manage complaint details.
- Complaint Updates: Admins can update the status and provide responses to complaints, which become visible to users.
- Email Notifications: Sends a notification email to the user when a complaint is registered and when the status is updated.

## Technologies Used

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: Local storage-based session management
- Email: Nodemailer for email notifications

## Project Stucture

- hostel-complaint-management-system/
- ├── client/                  # React frontend
- │   ├── src/
- │   │   ├── Components/      # Contains all React components
- │   │   ├── App.js
- │   │   └── index.js
- │   └── public/
- ├── server/                  # Node.js backend
- │   ├── models/              # Mongoose models (Complaint.js, Feedback.js)
- │   ├── routes/              # API routes (complaints.js, feedback.js)
- │   ├── index.js             # Main server file
- │   └── .env                 # Environment variables
- └── README.md

## Instalation

#### 1) Clone the repository: 

git clone https://github.com/your-username/hostel-complaint-management-system.git

#### 2) Backend Setup:

- ##### Navigate to the server folder

> cd hostel-complaint-management-system/server

- ##### Install dependencies

> npm install

- ##### Start Backend server

> npm start

 #### 3) Frontend Setup:

- ##### Navigate to the client folder

 > cd ../client

- ##### Install dependencies

> npm install

- ##### Start Frontend server

> npm run dev

## Environment Variables

- ##### Set up the following variables in your server/.env file:

- MONGO_URI=<your-mongodb-uri>
- PORT=5000
- EMAIL_USER=<your-email@example.com>
- EMAIL_PASS=<your-email-password>

## API Endpoint

### User Routes

- POST /api/complaints/registercomplaint - Register a complaint.
- GET /api/complaints/mycomplaint - View complaints registered by the logged-in user.

### Admin Routes

- GET /api/complaints/all - Get all complaints with optional filters.
- PUT /api/complaints/update/:id - Update complaint status and response.

### Feedback Routes

- POST /api/feedback/submit - Submit feedback for a resolved complaint.

## Feedback System

Once a complaint is resolved, a feedback form becomes available for the user to provide a rating and comments.

- 1) Frontend: A feedback form is shown, allowing the user to rate and add comments.
- 2) Backend: Submitted feedback is saved in a Feedback collection with fields like complaintId, rating, feedbackText, and userId.
- 3) Admin Review: Admins can review feedback associated with each complaint.

## Usage
- 1) User Registration and Login:
     - Users can sign up and log in to register complaints.
- 2) Complaint Submission:
     - Users fill out the complaint form, selecting the type of issue, description, and room number (optional if anonymous).
- 3) Complaint Management:
     - Admins manage complaints, update statuses, and add responses.
- 4) Feedback:
     - After a complaint is resolved, users can submit feedback, which is saved to the database and viewable by the admin.




 
