# Library Management System API

Backend API untuk sistem manajemen perpustakaan yang dibangun dengan NestJS, Prisma ORM, dan MySQL. Sistem ini menyediakan fitur autentikasi, otorisasi berbasis role, dan manajemen peminjaman buku.

## Tech Stack

- **Framework**: NestJS
- **Database**: MySQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Token)
- **Validation**: class-validator & class-transformer
- **Documentation**: Swagger/OpenAPI

## Fitur Utama

- ✅ Autentikasi & Otorisasi berbasis JWT
- ✅ Role-based Access Control (RBAC)
- ✅ Manajemen Buku (CRUD)
- ✅ Manajemen Anggota (CRUD)
- ✅ Sistem Peminjaman & Pengembalian Buku
- ✅ Tracking Stok Buku
- ✅ API Documentation dengan Swagger

## Role & Permission

Sistem memiliki 3 role dengan permission yang berbeda:

| Role        | Permission                                                        |
| ----------- | ----------------------------------------------------------------- |
| **ADMIN**   | Full access - Dapat melakukan semua operasi termasuk CRUD Books   |
| **OFFICER** | Dapat melayani peminjaman/pengembalian buku dan mengelola Members |
| **MEMBER**  | Dapat melihat data Books, Members, dan Transactions (read-only)   |

## Prerequisites

- Node.js (v18 atau lebih tinggi)
- MySQL (v8 atau lebih tinggi)
- npm atau pnpm

## Installation

```bash
# Clone repository
git clone <repository-url>
cd backend-library

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate deploy
```

## Environment Variables

Buat file `.env` di root project dengan konfigurasi berikut:

```env
DATABASE_URL="mysql://user:password@localhost:3306/library_db"
JWT_SECRET="your-secret-key"
PORT=3000
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

Aplikasi akan berjalan di `http://localhost:3000`

API Documentation (Swagger) tersedia di `http://localhost:3000/api`

## Database Schema

### Models

- **Book**: Menyimpan data buku (title, author, year, stock)
- **Member**: Menyimpan data anggota perpustakaan (name, studentId, class, email, phone, memberType)
- **Transaction**: Menyimpan data transaksi peminjaman (bookId, memberId, borrowDate, dueDate, returnDate, status, fine)
- **User**: Menyimpan data user untuk autentikasi (username, password, role, memberId)

### Enums

- **UserRole**: `ADMIN`, `OFFICER`, `MEMBER`
- **TransactionStatus**: `RESERVED`, `BORROWED`, `RETURNED`, `OVERDUE`, `LOST`
- **MemberType**: `MEMBER` (3 buku, 14 hari), `GUEST` (2 buku, 7 hari)

## API Endpoints

### Authentication

| Method | Endpoint         | Description                              | Auth Required | Role |
| ------ | ---------------- | ---------------------------------------- | ------------- | ---- |
| POST   | `/auth/register` | Register user baru dengan Member terkait | ❌            | -    |
| POST   | `/auth/login`    | Login dan dapatkan JWT token             | ❌            | -    |

### Books

| Method | Endpoint     | Description             | Auth Required | Role   |
| ------ | ------------ | ----------------------- | ------------- | ------ |
| GET    | `/books`     | Mendapatkan semua buku  | ❌            | Public |
| GET    | `/books/:id` | Mendapatkan detail buku | ❌            | Public |
| POST   | `/books`     | Membuat buku baru       | ✅            | ADMIN  |
| PUT    | `/books/:id` | Update data buku        | ✅            | ADMIN  |
| DELETE | `/books/:id` | Menghapus buku          | ✅            | ADMIN  |

### Members

| Method | Endpoint       | Description                | Auth Required | Role              |
| ------ | -------------- | -------------------------- | ------------- | ----------------- |
| GET    | `/members`     | Mendapatkan semua anggota  | ✅            | All authenticated |
| GET    | `/members/:id` | Mendapatkan detail anggota | ✅            | All authenticated |
| POST   | `/members`     | Membuat anggota baru       | ✅            | ADMIN, OFFICER    |
| PUT    | `/members/:id` | Update data anggota        | ✅            | ADMIN, OFFICER    |
| DELETE | `/members/:id` | Menghapus anggota          | ✅            | ADMIN, OFFICER    |

### Transactions

| Method | Endpoint               | Description                  | Auth Required | Role              |
| ------ | ---------------------- | ---------------------------- | ------------- | ----------------- |
| GET    | `/transactions`        | Mendapatkan semua transaksi  | ✅            | All authenticated |
| GET    | `/transactions/:id`    | Mendapatkan detail transaksi | ✅            | All authenticated |
| POST   | `/transactions/borrow` | Meminjam buku (offline)      | ✅            | ADMIN, OFFICER    |
| POST   | `/transactions/return` | Mengembalikan buku (offline) | ✅            | ADMIN, OFFICER    |

## Deployment

### Build untuk Production

```bash
# Build aplikasi
npm run build

# Jalankan migration di production
npm run prisma:deploy
```

### Environment Production

Pastikan file `.env.production` sudah dikonfigurasi dengan benar:

```env
DATABASE_URL="mysql://user:password@production-host:3306/library_db"
JWT_SECRET="production-secret-key"
PORT=3000
```

### Menjalankan di Production

```bash
NODE_ENV=production npm run start:prod
```

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Project Structure

```
src/
├── auth/              # Autentikasi & Otorisasi
│   ├── guards/        # JWT & Role guards
│   ├── strategies/    # JWT strategy
│   └── decorators/    # Custom decorators
├── books/             # Module Books
├── members/           # Module Members
├── transactions/      # Module Transactions
├── prisma/            # Prisma service & module
└── main.ts            # Entry point

prisma/
├── schema.prisma      # Database schema
└── migrations/        # Migration files
```

## License

UNLICENSED - Project ini dibuat untuk keperluan portfolio pribadi.

---

**Author**: Majarkan_ (Muhammad Fajar Kurniawan)  
