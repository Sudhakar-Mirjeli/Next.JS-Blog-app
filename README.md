# Next.JS-Blog-app

## Overview

Hi everyone, I'm Sudhakar Mirjeli, having 3+ years of experience in development, I have developed Blog application by using NextJs.
This is a full-stack blog application built with Next.js for the frontend and Node.js, Express.js, and MongoDB for the backend. 
The application allows users to sign up, log in, and manage blog posts through a dashboard.

## Features

- User authentication (signup and login)
- Dashboard for adding and managing blog posts
- Backend API with Node.js, Express.js, and MongoDB

## Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JSON Web Tokens (JWT)

## Prerequisites

- Node.js 
- MongoDB
- Git

**API Endpoints**
**Authentication**

    POST /api/signup: Register a new user
    POST /api/login: Authenticate a user and return a token

**Blog Posts**

    GET /api/posts: Get all blog posts
    POST /api/post: Create a new blog post
    GET /api/posts?author=userId : Get a single blog post by ID


## Getting Started

### Clone the Repository

git clone https://github.com/sudhakar-lm/Next.Js-Blog-App.git
cd Next.Js-Blog-App


**Install Dependencies**
**Backend**
Navigate to the backend folder: cd backend
Install the dependencies: npm install

Create a **.env** file in the backend directory and add your environment variables:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5050

To run app- npm run start-watch

**Frontend**
Navigate to the frontend folder: cd ../frontend
Install the dependencies: npm install

