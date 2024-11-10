# Hostel Complaint Management System

A web-based complaint management system designed to help hostel residents register complaints, monitor their statuses, and provide feedback. The admin can manage complaints and respond to users.

## Table of Content

- [Features](#features)
- [Technologies used](#technolgies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
   -[User Route](#user-route)
   -[Admin Route](#admin-route)
   -[Feedback Route](#feedback-route) 
- [Feedback System](#feedback-system)
- [Usage](#Usage)
- [License](#license)

## Features 

### User Side
> Role-based Authentication: Users can sign up and log in.
> Complaint Registration: Users can submit complaints with details like issue type, description, and room number.
> Anonymous Complaints: Users have the option to submit complaints anonymously.
> Complaint Status Tracking: Users can view the status and admin response for each registered complaint.
> Feedback System: After a complaint is marked as "resolved," users can provide feedback.

### Admin Side
> Admin Dashboard: Admins can view all complaints, filter by status or category, and manage complaint details.
> Complaint Updates: Admins can update the status and provide responses to complaints, which become visible to users.
> Email Notifications: Sends a notification email to the user when a complaint is registered and when the status is updated.

## Technologies Used

> Frontend: React.js
> Backend: Node.js, Express.js
> Database: MongoDB
> Authentication: Local storage-based session management
> Email: Nodemailer for email notifications

## Project Stucture

hostel-complaint-management-system/
├── client/                  # React frontend
│   ├── src/
│   │   ├── Components/      # Contains all React components
│   │   ├── App.js
│   │   └── index.js
│   └── public/
├── server/                  # Node.js backend
│   ├── models/              # Mongoose models (Complaint.js, Feedback.js)
│   ├── routes/              # API routes (complaints.js, feedback.js)
│   ├── index.js             # Main server file
│   └── .env                 # Environment variables
└── README.md

## Instalation

#### 1) Clone the repository: 

git clone https://github.com/your-username/hostel-complaint-management-system.git

#### 2) Backend Setup:

> ##### Navigate to the server folder

cd hostel-complaint-management-system/server

> ##### Install dependencies

npm install

> ##### Start Backend server

npm start

#### 3) Frontend Setup:

> ##### Navigate to the client folder

cd ../client

> ##### Install dependencies

npm install

> ##### Start Frontend server

npm run dev

## Environment Variables

##### Set up the following variables in your server/.env file:

MONGO_URI=<your-mongodb-uri>
PORT=5000
EMAIL_USER=<your-email@example.com>
EMAIL_PASS=<your-email-password>




 
