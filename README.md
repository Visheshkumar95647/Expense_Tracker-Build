# Expense-Track

Expense-Track is a web application for managing and visualizing personal expenses. It allows users to securely log in, add and view expenses, and analyze their spending using various charts and filters.

## Features

1. **User Authentication & Authorization**:
   - Users can create an account, log in, and receive a JWT token.
   - The token is stored in localStorage and is used for user authentication and authorization.

2. **Expense Management**:
   - Users can add new expenses with details like amount, category, date, and description.
   - Users can view, edit, and delete their expenses.
   - Expenses can be sorted by categories and amount range.

3. **Visualization**:
   - **Pie Chart**: Visualizes the total spending by category over a specific date range.
   - **Bar Chart**: Shows monthly expenses for a selected year.

4. **Pagination**:
   - Implemented pagination to efficiently manage and display large numbers of expenses.

5. **Dark/Light Mode**:
   - Allows users to toggle between dark and light modes using the `useContext` hook for state management.

## Technologies Used

- **Frontend**: React.js, Recharts (for visualizations), CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT (JSON Web Tokens) for secure authentication
- **Data Storage**: MongoDB
- **Libraries**: 
   - **BCrypt.js** for password hashing
   - **Recharts** for visualizing data (pie chart and bar graph)
   - **React Context API** for managing dark/light mode state

## Project Structure


/Server
  /models               # Contains the database schema models
  /routes               # API routes
  /middleware           # JWT authentication middleware
  .env                  # Environment variables
  index.js             # Main entry point for the server

/Client
  /src
    /components         # React components
      /Nav               # Navigation bar component
      /Dashboard         # Dashboard component (main view)
      /Graphics          # Components for visualizations (PieChart, BarGraph)
      /Expenses          # Manage expense-related actions (add, edit, delete)
      /Footer            # Footer component
      /Login             # Login form component
      /SignIn            # Sign-up form component
    /assets              # Images, icons, etc.
    /styles              # CSS styles for the components
    /context             # For Managing the useContext Hook    
    App.js               # Main entry point for React
    index.js             # Renders App.js into the DOM



## Setup & Installation

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)

### Install Dependencies
```bash
npm install