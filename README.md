# Medireach Admin Dashboard

A modern admin dashboard built with Vite, React, and Redux Toolkit.

## Tech Stack

- **Framework**: Vite + React
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit + React Redux
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Charts**: Recharts
- **Notifications**: Toastify
- **Code Quality**: ESLint

## Project Structure

```
medireach-admin/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images and static files
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── layouts/        # Layout components
│   ├── pages/          # Page components
│   ├── routes/         # Route definitions
│   ├── services/       # API service functions
│   ├── store/          # Redux store configuration
│   ├── utils/          # Utility functions (axios config, etc.)
│   ├── App.jsx         # Main App component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles (Tailwind imports)
├── .env                # Environment variables
├── .gitignore          # Git ignore rules
├── eslint.config.js    # ESLint configuration
├── package.json        # Project dependencies
├── postcss.config.js   # PostCSS configuration
└── vite.config.js      # Vite configuration
```

## Installation

```bash
# Install dependencies
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://your-api-url.com
VITE_APP_NAME=Medireach Admin
```

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Features

### Redux Store

The Redux store is configured and ready to use. Add your slices in the `src/store/` directory.

### Axios Configuration

Axios is pre-configured with:

- Request/Response interceptors
- Automatic token injection
- Error handling for 401 responses

### Routing

React Router is set up and ready for route definitions in `src/routes/`.

### Tailwind CSS

Fully configured with Tailwind CSS v4 for rapid UI development.

## Getting Started

1. **Add a new Redux slice:**

   ```jsx
   // src/store/exampleSlice.js
   import { createSlice } from "@reduxjs/toolkit";

   const exampleSlice = createSlice({
     name: "example",
     initialState: { value: 0 },
     reducers: {
       increment: (state) => {
         state.value += 1;
       },
     },
   });

   export const { increment } = exampleSlice.actions;
   export default exampleSlice.reducer;
   ```

2. **Add routes:**

   ```jsx
   // src/routes/index.jsx
   import { createBrowserRouter } from "react-router-dom";
   import Home from "../pages/Home";

   export const router = createBrowserRouter([
     { path: "/", element: <Home /> },
   ]);
   ```

3. **Create components:**
   All components should be placed in appropriate folders within `src/`.

## Development

The development server runs on `http://localhost:5173/` by default.

## License

This project is private and proprietary.
