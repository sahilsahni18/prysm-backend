# Prysm Backend – Mini CRM Backend API

This repository contains a **production-grade backend API** built using **NestJS**, **Prisma**, and **PostgreSQL**.  
It implements authentication, role-based access control, and core CRM features including **Users**, **Customers**, and **Tasks**.

This project was developed as part of a **Backend Internship Assignment** and follows real-world backend engineering practices.

---

## 🚀 Tech Stack

- **Node.js**
- **NestJS**
- **TypeScript**
- **PostgreSQL**
- **Prisma ORM**
- **JWT Authentication**
- **class-validator**
- **Postman** (manual API testing)

---

## 🧩 Project Modules & Phases

### Phase 1 – Authentication
- User registration
- User login
- Password hashing
- JWT token generation
- Role support (`ADMIN`, `EMPLOYEE`)

---

### Phase 2 – Users (ADMIN Only)
- View all users
- View user by ID
- Update user role
- Enforced role-based access using Guards & Decorators

---

### Phase 3 – Customers
- Create, Read, Update, Delete customers
- Pagination support
- ADMIN → full access
- EMPLOYEE → read-only access
- Email & phone uniqueness enforced

---

### Phase 4 – Tasks
- Create and assign tasks (ADMIN)
- View tasks
  - ADMIN → all tasks
  - EMPLOYEE → only assigned tasks
- Update task status
  - EMPLOYEE → only own tasks
  - ADMIN → any task

---

## 🧱 Database Schema (Overview)

### User
- id
- name
- email (unique)
- password
- role (ADMIN / EMPLOYEE)
- createdAt
- updatedAt

### Customer
- id
- name
- email (unique)
- phone (unique)
- company (optional)
- createdAt
- updatedAt

### Task
- id
- title
- description
- status (PENDING / IN_PROGRESS / DONE)
- assignedTo (User)
- customer (Customer)
- createdAt
- updatedAt

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone <your-repo-url>
cd prysm-backend/backend
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Environment Variables

Create a `.env` file in `backend/`:

```env
DATABASE_URL=postgresql://postgres:<password>@localhost:5432/prysmdb
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=3600
NODE_ENV=development
```

### 4️⃣ Run Prisma Migrations
```bash
npx prisma migrate dev
```

### 5️⃣ Start Development Server
```bash
npm run start:dev
```

Server runs at:
```
http://localhost:3000
```

---

## 🔐 Authentication Flow

### Register User
**POST** `/auth/register`

```json
{
  "name": "Admin User",
  "email": "admin@test.com",
  "password": "password123",
  "role": "ADMIN"
}
```

### Login
**POST** `/auth/login`

```json
{
  "email": "admin@test.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "accessToken": "JWT_TOKEN"
}
```

**Use token in headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

---

## 👥 Users API (ADMIN Only)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get user by ID |
| PATCH | `/users/:id` | Update user role |

---

## 🏢 Customers API

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/customers` | ADMIN |
| GET | `/customers` | ADMIN, EMPLOYEE |
| GET | `/customers/:id` | ADMIN, EMPLOYEE |
| PATCH | `/customers/:id` | ADMIN |
| DELETE | `/customers/:id` | ADMIN |

**Pagination Example:**
```
GET /customers?page=1&limit=10
```

---

## 📝 Tasks API

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/tasks` | ADMIN |
| GET | `/tasks` | ADMIN, EMPLOYEE |
| PATCH | `/tasks/:id` | ADMIN, EMPLOYEE (own task only) |

### Create Task (ADMIN)
```json
{
  "title": "Follow up with customer",
  "description": "Call and confirm requirements",
  "assignedToId": 2,
  "customerId": 1
}
```

### Update Task Status
```json
{
  "status": "IN_PROGRESS"
}
```

---

## 🧪 Manual Testing (Postman)

All APIs were manually tested using **Postman**.

### Tested Scenarios
- ✅ Registration & login
- ✅ JWT authentication
- ✅ Role-based access control
- ✅ Admin vs Employee permissions
- ✅ Pagination
- ✅ Ownership validation (tasks)

### Negative Cases
- ✅ 401 Unauthorized
- ✅ 403 Forbidden
- ✅ 404 Not Found
- ✅ Duplicate entries

Postman collections can be recreated using the above API definitions.

---

## 🛡️ Security & Design Decisions

- **JWT Authentication** using Passport strategy
- **Role-based Authorization** using Guards & Decorators
- **DTO-based Validation** using `class-validator`
- **Prisma** for type-safe database access
- **Clean Separation of Concerns:**
  - Controller
  - Service
  - DTO
- **Scalable Folder Structure** following NestJS best practices

---

## 📦 Scripts

```bash
npm run start:dev   # Start development server
npm run build       # Build project
npm test            # Run tests
```

---

## ✅ Final Checklist

- ✅ Authentication implemented
- ✅ RBAC enforced
- ✅ All CRUD operations working
- ✅ Pagination implemented
- ✅ Manual testing completed
- ✅ Prisma migrations included
- ✅ .env excluded from repo
- ✅ Single comprehensive README

---

## 📄 License

This project is part of a Backend Internship.

---

**Happy Coding! 🚀**
