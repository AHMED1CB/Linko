# Linko

**Linko** is a real-time chat application built with **React.js**, **Node.js**, and **MongoDB**.  
It enables users to send and receive messages instantly, supports user authentication, and stores chat history persistently.

---

## Table of Contents

1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Architecture](#architecture)  
4. [Getting Started](#getting-started)  
   - [Prerequisites](#prerequisites)  
   - [Installation](#installation)  
   - [Running](#running)  
5. [Environment Variables](#environment-variables)  
6. [Usage](#usage)  
7. [Project Structure](#project-structure)  
8. [Contributing](#contributing)  
9. [License](#license)  

---

## Features

- Real-time messaging between users  
- User registration and login (authentication)  
- Persistent storage of messages  
- Online/offline status indicator  
- Basic UI for chat interface (rooms or direct messages)  

---

## Tech Stack

- **Frontend**: React.js, (optionally Redux or Context)  
- **Backend**: Node.js (Express)  
- **Database**: MongoDB  
- **WebSocket / real-time**: Socket.io (or similar)  
- **Others**: bcrypt (for password hashing), JWT (for authentication), etc.

---

## Architecture

The application follows a **client–server** architecture:

- The **client** connects to the server via HTTP for REST APIs (signup, login, fetching history) and via WebSocket for real-time messaging.  
- The **server** handles authentication, message persistence in the DB, and broadcasts real-time events to clients.  
- MongoDB stores users, chat rooms (or conversations), and message documents.

---

## Getting Started

## Prerequisites
- Node.js v14 or later  
- npm or yarn  
- MongoDB (local or Atlas)  

## Installation
```bash
git clone https://github.com/AHMED1CB/Linko.git
cd Linko
```
# Backend
```bash
cd server
npm install
```
```bash
# Frontend
cd ../client
npm install
```
---
# Start backend
```bash
cd server
npm run dev
```
# Start frontend
```bash
cd ../client
npm start
```
