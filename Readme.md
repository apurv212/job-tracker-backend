# Student Job Tracker - Backend

## Overview
The Student Job Tracker backend is a RESTful API built with **Node.js**, **Express.js**, and **MongoDB Atlas** (using **Mongoose**). 

## Features
- **Add Job Application:** Create a new application while preventing duplicates by email (case-insensitive) or phone.
- **List Applications:** Retrieve a list of all job applications.
- **Update Application:** Modify application details (e.g., change status).
- **Delete Application:** Remove an application.
- **Status Frequency Counter:** Return aggregated counts of applications by status (Applied, Interview, Offer, Rejected).

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (using Mongoose ODM)
- **Deployment:** Suitable for deployment on platforms such as Render or Railway

## Prerequisites
- [Node.js](https://nodejs.org/) v14 or later
- NPM (or Yarn)
- MongoDB Atlas account with an active cluster and network access configured

## Setup & Installation
1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd job-tracker-backend
