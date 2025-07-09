# Hotel Reserve

A full-stack hotel reservation web application built with React (frontend) and Node.js/Express (backend), using MongoDB for data storage. Payments are integrated with Razorpay.

---

## Live Demo

[Hotel Reserve App https://hotel-reserve-eta.vercel.app

---

<<<<<<< HEAD
## Unique Features & Highlights
- **End-to-End Booking Flow:** Users can search, filter, and book rooms with real-time availability.
- **Razorpay Payment Integration:** Secure, real-world payment gateway for instant booking confirmation.
- **Admin Dashboard:** Manage rooms, bookings, and users from a dedicated admin panel.
- **Responsive & Modern UI:** Built with React, Bootstrap, and Ant Design for a seamless experience on all devices.
- **Role-Based Access:** Admin and user roles with different privileges.
- **Cloud Deployment:** Frontend on Vercel, backend on Render, and database on MongoDB Atlas for high availability.
- **Email Notifications:** (Optional) Send booking confirmations to users via email.
- **Client/Server Separation:** Clean separation of frontend and backend for scalability and maintainability.

---

=======
>>>>>>> 335c6b56ff13bb9937b0a7677a4e1dc92db65096
## Features
- User registration and login
- Room listing and search
- Room booking with date selection
- Payment integration (Razorpay)
- Admin panel for managing rooms and bookings
- Responsive UI

---

## Tech Stack
- **Frontend:** React, Bootstrap, Ant Design
- **Backend:** Node.js, Express
- **Database:** MongoDB (via Mongoose)
- **Payments:** Razorpay
- **Deployment:** Vercel (frontend), Render (backend)

---

## Getting Started (Local Development)

### Prerequisites
- Node.js and npm
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repository
```sh
git clone <your-repo-url>
cd Hotel_Reserve
```

### 2. Backend Setup
- Install dependencies:
  ```sh
  npm install
  ```
- Create a `.env` file in the root with your MongoDB URI and any other secrets:
  ```env
  MONGO_URL=your_mongodb_connection_string
  ```
- Start the backend:
  ```sh
  node server.js
  # or
  npm run dev
  ```

### 3. Frontend Setup
- Go to the client folder:
  ```sh
  cd client
  npm install
  ```
- Create a `.env` file in `client/`:
  ```env
  REACT_APP_API_URL=http://localhost:5000
  REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
  ```
- Start the frontend:
  ```sh
  npm start
  ```

---

## Deployment
- **Frontend:** Deploy the `client` folder to Vercel. Set environment variables in Vercel dashboard.
- **Backend:** Deploy the root project to Render. Set environment variables in Render dashboard.
- Update CORS in `server.js` to allow your Vercel frontend URL.

---

## Testing
- Visit the live app: [https://hotel-reserve-87okyw6fd-santhan-s-projects.vercel.app](https://hotel-reserve-87okyw6fd-santhan-s-projects.vercel.app)
- Register a new user, log in, and try booking a room.

---

## License
This project is for educational/demo purposes.
