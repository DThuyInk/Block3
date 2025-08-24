# Motorbike Management Application

This is a React-based motorbike management application built for FER202 practical examination.

## Features

### 1. Authentication
- Login form with username and password validation
- PropTypes validation for required fields
- Success modal after login
- Error handling for invalid credentials

### 2. Motorbike Management
- Display motorbikes from JSON Server
- Search by model name
- Sort by price (Low to High, High to Low)
- View detailed information for each motorbike
- Responsive design with React Bootstrap

### 3. Shopping Cart
- Add motorbikes to cart
- Automatic stock management
- Update quantities
- Remove items from cart
- Calculate total amounts
- Checkout functionality

### 4. Technical Implementation
- React Hooks (useState, useEffect, useReducer, useContext)
- React Router for navigation
- Context API for global state management
- PropTypes validation
- JSON Server for backend API
- Axios for HTTP requests
- React Bootstrap for UI components

## Available Routes
- `/` - Redirects to motorbikes
- `/motorbikes` - Motorbike list page
- `/view/:id` - Motorbike details page
- `/cart` - Shopping cart page

## Login Credentials
- Username: `admin` | Password: `admin123`
- Username: `john` | Password: `johnpass`
- Username: `guest` | Password: `guestpass`

## Installation and Setup

1. Install dependencies:
```bash
npm install
```

2. Start the application (JSON Server + React):
```bash
npm start
```

This will start:
- JSON Server on http://localhost:3001
- React application on http://localhost:3000

## Project Structure
```
src/
├── components/
│   ├── Login.js
│   ├── MotorbikeList.js
│   ├── MotorbikeDetails.js
│   ├── Cart.js
│   ├── Navigation.js
│   └── NotFound.js
├── contexts/
│   ├── CartContext.js
│   └── MotorbikeContext.js
├── App.js
└── index.js
```

## API Endpoints
- `GET http://localhost:3001/Motorbikes` - Get all motorbikes
- `GET http://localhost:3001/UserAccounts` - Get user accounts
- `PATCH http://localhost:3001/Motorbikes/:id` - Update motorbike stock

## Features Checklist
- ✅ ReactJS Application created
- ✅ JSON Server configured with db.json
- ✅ Login form with validation and PropTypes
- ✅ Success modal and error handling
- ✅ React Router with specified routes
- ✅ Motorbike list with fetch from JSON Server
- ✅ View details page with 404 handling
- ✅ Search by model name
- ✅ Sort by price functionality
- ✅ Add to cart with stock management
- ✅ Cart page with quantity updates
- ✅ Remove from cart with stock restoration
- ✅ React Bootstrap for responsive design
- ✅ PropTypes validation throughout
- ✅ useReducer and useContext for state management
