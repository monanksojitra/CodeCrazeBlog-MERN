# MERN Stack Blogger Site

Welcome to the MERN Stack Blogger Site! This project is a simple blogging platform built using MongoDB, Express.js, React, and Node.js (MERN). The application allows users to create, read, update, and delete blog posts, making it a perfect project to understand the MERN stack.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (sign up, log in, log out)
- Create, read, update, and delete blog posts
- Comment on posts
- Responsive design for mobile and desktop
- Simple and intuitive user interface

## Technologies Used

- **Frontend:**
  - React
  - Axios (for API calls)
  - Tailwind css Styled Components

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (with Mongoose)
  - JWT (for authentication)

## Installation

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm or yarn
- MongoDB (or use a cloud database like MongoDB Atlas)

### Clone the Repository

```bash
git clone https://github.com/yourusername/mern-blogger-site.git
cd mern-blogger-site
```

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add your MongoDB URI:

   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:

   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the React app:

   ```bash
   npm start
   ```

Your app should now be running on `http://localhost:3000`!

## Usage

- **User Registration:** Navigate to the sign-up page and create an account.
- **Login:** Use your credentials to log in.
- **Create a Post:** Once logged in, you can create a new blog post from your dashboard.
- **Read Posts:** View all posts on the main page.
- **Edit/Delete Posts:** You can edit or delete your own posts.

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Log in a user

### Blog Posts

- `GET /api/posts` - Get all blog posts
- `GET /api/posts/:id` - Get a specific blog post
- `POST /api/posts` - Create a new blog post
- `PUT /api/posts/:id` - Update a blog post
- `DELETE /api/posts/:id` - Delete a blog post

### Comments

- `POST /api/posts/:id/comments` - Add a comment to a blog post

## Contributing

Contributions are welcome! If you have suggestions for improvements or features, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

Feel free to reach out with any questions or feedback. Happy coding!