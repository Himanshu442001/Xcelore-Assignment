MERN Stack Project README
Project Overview
This project is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides functionalities for user management, authentication, role-based access control (RBAC), CRUD operations on users, pagination, search functionality, error handling, and a responsive user interface using Material-UI.

Features

**User Authentication**
User registration with role assignment (admin, user).
Secure login/logout using JWT (JSON Web Tokens) for authentication.

User Management:

CRUD operations for managing users (Create, Read, Update, Delete).
Admins have access to all user management functionalities.
Role-Based Access Control (RBAC):

Different roles (admin, user) have distinct permissions.
RBAC ensures appropriate access levels across the application.
Pagination and Search:

Paginated user list to handle large datasets efficiently.
Search functionality allows users to find specific users by name or email.
Error Handling:

Proper error handling and display of user-friendly error messages.
Validation of user input to maintain data integrity.
Responsive Design:

Utilizes Material-UI components for a responsive and modern user interface.
Optimized for various screen sizes and devices.
Technologies Used
Frontend:

React.js
Redux for state management
Material-UI for UI components and styling
Axios for HTTP requests
Backend:

Node.js with Express.js
MongoDB with Mongoose for data modeling and interaction
JWT for secure authentication
bcrypt.js for password hashing
