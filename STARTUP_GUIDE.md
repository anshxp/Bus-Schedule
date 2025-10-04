# Bus Schedule Application - Startup Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn package manager

---

## Backend Setup

### 1. Navigate to Backend Directory
```bash
cd /home/anshxhhh/Desktop/Bus-Schedule/backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
The `.env` file is already configured with:
```
DATABASE_URI=mongodb+srv://anshpal230929:madhavji01@bus-schedule-acro.0n4xgyj.mongodb.net/?retryWrites=true&w=majority&appName=Bus-Schedule-Acro
JWT_SECRET="aiml"
```

### 4. Start Backend Server
```bash
npm start
```

The backend will run on: **http://localhost:3000**

You should see:
```
DataBase Connected
Server is running on http://localhost:3000
```

---

## Frontend Setup

### 1. Open New Terminal and Navigate to Frontend Directory
```bash
cd /home/anshxhhh/Desktop/Bus-Schedule/frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Frontend Development Server
```bash
npm run dev
```

The frontend will run on: **http://localhost:5173**

You should see:
```
VITE v7.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

## Testing the Application

### 1. Access the Application
Open your browser and go to: **http://localhost:5173**

### 2. Test Public Features
- ✅ View all buses
- ✅ Search for buses by number or stop name
- ✅ View individual bus routes
- ✅ View recent buses

### 3. Test Admin Features

#### Login as Admin
1. Click on "Admin" in navigation
2. Login with your admin credentials (you'll need to register first if no admin exists)

#### Register New Admin (if needed)
Use a tool like Postman or curl:
```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin Name",
    "email": "admin@acropolis.edu",
    "password": "yourpassword"
  }'
```

#### After Login, Test:
- ✅ Add new bus with stops
- ✅ Edit existing bus
- ✅ Delete bus (with confirmation)
- ✅ View all buses (including inactive ones)

---

## Common Issues and Solutions

### Issue 1: Backend won't start
**Error**: `Cannot find module`
**Solution**: Run `npm install` in backend directory

### Issue 2: Frontend won't start
**Error**: Dependencies missing
**Solution**: Run `npm install` in frontend directory

### Issue 3: Database connection failed
**Error**: `MongoServerError`
**Solution**: 
- Check if MongoDB Atlas is accessible
- Verify DATABASE_URI in `.env` file
- Check if your IP is whitelisted in MongoDB Atlas

### Issue 4: CORS errors
**Solution**: 
- Backend is configured for `http://localhost:5173`
- Make sure frontend runs on port 5173
- Check that credentials are set to 'include' in fetch requests

### Issue 5: Authorization errors
**Solution**:
- Clear browser localStorage
- Login again to get a fresh token
- Check if JWT_SECRET matches in backend `.env`

---

## API Endpoints Reference

### Public Endpoints
- `GET /buses` - Get all buses
- `GET /buses/:busNo` - Get specific bus
- `GET /search?q=query` - Search buses

### Auth Endpoints
- `POST /register` - Register new admin
- `POST /login` - Login admin
- `POST /logout` - Logout admin

### Admin Endpoints (Require Authentication)
- `GET /admin/verify` - Verify admin token
- `POST /admin/addbus` - Add new bus
- `POST /admin/:busNo/editbus` - Edit bus
- `DELETE /admin/:busNo` - Delete bus
- `POST /admin/:busNo/stops/add` - Add stop to bus
- `POST /admin/:busNo/stops/:stopName` - Edit stop
- `DELETE /admin/:busNo/stops/:stopName` - Delete stop
- `PATCH /admin/:busNo/active` - Toggle bus active status

---

## Port Configuration

### Backend: 3000
Defined in: `backend/index.js`

### Frontend: 5173 (default Vite)
Defined in: `frontend/vite.config.js`

---

## Development Tips

1. **Keep both terminals open** - one for backend, one for frontend
2. **Check browser console** for frontend errors
3. **Check terminal output** for backend errors
4. **Use browser DevTools Network tab** to monitor API calls
5. **Clear localStorage** if authentication seems stuck

---

## What Was Fixed

All functional bugs have been fixed while maintaining the exact same UI/UX design:
- ✅ Database model initialization
- ✅ Authentication and authorization
- ✅ API endpoint consistency
- ✅ Bus creation with stops
- ✅ Search functionality
- ✅ Delete functionality
- ✅ Token handling
- ✅ Error handling

See `FIXES_APPLIED.md` for detailed list of all changes.

---

## Support

If you encounter any issues:
1. Check the console logs (both browser and terminal)
2. Verify all dependencies are installed
3. Ensure backend is running before starting frontend
4. Clear browser cache and localStorage if needed

Happy coding! 🚀
