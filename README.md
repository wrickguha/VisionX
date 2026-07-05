# VisionX — Shop Lead & Demo Tracker Dashboard

VisionX is a modern, premium full-stack application designed to track and manage business/shop leads, demo environments, and follow-up outreach. The project is split into a robust **Laravel 12 API backend** and a beautiful, interactive **React 19 + TypeScript + Vite + Tailwind CSS v4 frontend**.

---

## 📂 Project Structure

```
VisionX/
├── backend/           # Laravel 12 API Server (PHP 8.2+)
└── frontend/          # React 19 SPA (TypeScript, Vite, Tailwind CSS v4)
```

---

## 🛠️ Technology Stack

### Backend
* **Core Framework:** Laravel 12.x
* **Language:** PHP 8.2+
* **Database:** SQLite (default, zero-config) or MySQL
* **Architecture:** Decoupled Service Layer, Repository Pattern, custom Form Request Validation, and uniform API Resources

### Frontend
* **Core Library:** React 19 (TypeScript)
* **Build Tool:** Vite
* **Styling:** Tailwind CSS v4
* **State & Forms:** React Router DOM, React Hook Form
* **Visualization & Icons:** Recharts, Lucide React
* **Animations:** Framer Motion
* **HTTP Client:** Axios (configured to query `http://127.0.0.1:8000/api`)

---

## ⚙️ Prerequisites

Before getting started, make sure you have the following installed on your machine:
1. **PHP 8.2+** (configured with SQLite extension)
2. **Composer 2.0+**
3. **Node.js** (v18.x or newer) & **NPM**
4. **Git**

---

## 🚀 Setup & Run Instructions

To run VisionX locally, you will need to start both the Laravel backend server and the React frontend client. Follow these step-by-step instructions:

### 1. Backend Setup

Open a terminal window and navigate to the `backend/` directory:

```bash
cd backend
```

#### A. Install Dependencies
Install PHP dependencies via Composer:
```bash
composer install
```

#### B. Configure Environment
Copy the sample environment file and generate the application key:
```bash
cp .env.example .env
php artisan key:generate
```

#### C. Initialize SQLite Database & Seed Data
By default, Laravel 12 uses **SQLite** which requires no local database server setup. Running the following command will automatically create the SQLite database file (`database/database.sqlite`), create the schema, and populate it with realistic mock data (**30 shop leads**, **30 demo details**, and **80 follow-up logs**):

```bash
php artisan migrate:fresh --seed
```

#### D. Start the API Server
Launch the local Laravel artisan development server:
```bash
php artisan serve
```
* The API backend will start running at **`http://127.0.0.1:8000`**.

---

### 2. Frontend Setup

Open a **new** terminal window and navigate to the `frontend/` directory:

```bash
cd frontend
```

#### A. Install Dependencies
Install the package dependencies using npm:
```bash
npm install
```

#### B. Start the Development Server
Launch the Vite server:
```bash
npm run dev
```
* The application will compile and start running locally.
* Open your browser and navigate to the URL printed in the terminal (usually **`http://localhost:5173`**).

---

## 📝 Key Features

1. **Analytics Dashboard:** Visual representation of key metrics like conversion rate, camera distribution, monthly lead growth, active/expired demos, and lists of pending or overdue follow-up tasks.
2. **Shop Leads Management:** Complete CRUD interface to create, read, update, and archive leads with advanced filtering (by search term, status, or business type) and sorting.
3. **Demo Config & Probing:** View and update technical details for demo setups, including DVR availability, RTSP streams, engine URLs, and real-time connectivity status.
4. **Follow-up Reminders:** Schedule, log, and mark follow-ups as completed or pending, keeping outreach and communication logs organized.

---

## 🔗 Main API Endpoints

All backend routes are prefixed with `/api` and return structured, consistent JSON payloads.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/dashboard` | Fetches aggregated analytics summary, distribution counts, and upcoming follow-ups |
| `GET` | `/api/shop-leads` | Lists shop leads with optional query parameters (`search`, `status`, `business_type`, `sort`, `order`) |
| `POST` | `/api/shop-leads` | Creates a new shop lead |
| `GET` | `/api/shop-leads/{id}` | Fetches details of a specific shop lead |
| `PUT` | `/api/shop-leads/{id}` | Updates a shop lead |
| `DELETE` | `/api/shop-leads/{id}` | Deletes a shop lead |
| `GET` | `/api/shop-leads/{id}/demo` | Fetches the CCTV/DVR demo details for a lead |
| `PUT` | `/api/shop-leads/{id}/demo` | Saves/updates demo configuration details |
| `GET` | `/api/shop-leads/{id}/followups` | Lists follow-up outreach logs for a shop lead |
| `POST` | `/api/shop-leads/{id}/followups` | Adds a new follow-up reminder note for a shop lead |
| `PUT` | `/api/followups/{id}` | Updates status or details of a specific follow-up item |
| `DELETE` | `/api/followups/{id}` | Removes a follow-up item |
