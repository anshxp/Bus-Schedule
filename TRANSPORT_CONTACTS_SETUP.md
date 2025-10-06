# Transport Contacts Database Setup

## Overview
The transport contacts feature now uses MongoDB to store contact information instead of localStorage.

## Database Structure

### Contact Schema
```javascript
{
  number: String (required),
  label: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Public Endpoints
- **GET** `/api/contacts` - Get all contacts

### Admin Endpoints (require authentication)
- **POST** `/api/contacts` - Add new contact
- **PUT** `/api/contacts/:id` - Update contact
- **DELETE** `/api/contacts/:id` - Delete contact

## Setup Instructions

### 1. Seed Initial Contacts
Run this command to add the initial transport department numbers:

```bash
cd backend
npm run seed:contacts
```

This will add:
- 9893082246 (Transport Office 1)
- 6262135550 (Transport Office 2)

### 2. Start the Backend Server
```bash
cd backend
npm start
```

### 3. Start the Frontend
```bash
cd frontend
npm run dev
```

## Features

### For All Users
- View all transport department contacts
- Click phone icon to call directly

### For Admins
- Add new contacts
- Edit existing contacts
- Delete contacts
- All changes persist in MongoDB

## Authentication
Admin operations require:
- Valid admin token in localStorage
- Token sent in Authorization header: `Bearer <token>`

## Error Handling
- Returns proper HTTP status codes
- Validates input data
- Handles database errors gracefully
