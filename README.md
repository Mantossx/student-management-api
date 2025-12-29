# Web Service Task - RESTful API

This project is a simple Web Service implementation for managing Student data using **Node.js** and **Express**. It was created to fulfill a Web Service course assignment.

## 🚀 Key Features
* **RESTful API:** Supports CRUD operations (Create, Read, Update, Delete).
* **Authentication & Authorization:** Login system with Role-Based Access Control (RBAC).
    * **Admin:** Full Access (Can Add, Edit, and Delete Data).
    * **Student:** Read-Only (Can only view data).
* **Modern Frontend:** Web interface built with HTML, Bootstrap 5, and CSS animations.
* **Security:** Role validation on every protected API endpoint.

## 🛠️ Tech Stack
* **Backend:** Node.js, Express.js
* **Frontend:** HTML5, Bootstrap 5, Vanilla JS
* **Tools:** Postman (for API testing)

## 📦 How to Run

1.  **Clone this repository:**
    ```bash
    git clone [https://github.com/Mantossx/student-management-api.git](https://github.com/Mantossx/student-management-api.git)
    ```
2.  **Navigate to the project folder:**
    ```bash
    cd student-management-api
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Start the server:**
    ```bash
    node server.js
    ```
5.  **Open in Browser:**
    Go to `http://localhost:3000`

## 🔑 Demo Accounts (For Login)

Use the following accounts to test the Role-Based Access Control features:

| Role      | Username | Password | Access Rights |
|-----------|----------|----------|---------------|
| **Admin** | `admin`  | `123`    | Create, Read, Update, Delete |
| **Student** | `mhs`    | `123`    | Read Only |

## 📡 API Endpoints (Postman)

* `POST /api/login` - User Login
* `GET /api/mahasiswa` - Get All Data
* `POST /api/mahasiswa` - Add Data (Header `user-role: admin`)
* `PUT /api/mahasiswa/:id` - Update Data (Header `user-role: admin`)
* `DELETE /api/mahasiswa/:id` - Delete Data (Header `user-role: admin`)

---
**Created by:** DGL🦖