# FarmConnect

**FarmConnect** is a modern, full-stack agricultural marketplace platform that empowers farmers and buyers through seamless digital connections. It enables farmers to register, manage profiles, list products, and connect with buyers, all with secure authentication and robust data management.

---

## Features

- **Secure Authentication:** Clerk-based signup and login (email/password, social logins)
- **Farmer Management:** Register, view, edit, and delete farmer profiles
- **Product Marketplace:** List, browse, and purchase agricultural products
- **Farming Types:** Manage and categorize farming types
- **Audit Logging:** Automatic tracking of key actions (insert, update, delete)
- **Responsive UI:** Modern, mobile-friendly interface with Shadcn UI and Tailwind CSS

---

## Tech Stack

- **Frontend:** Next.js 14+, TypeScript, Shadcn UI, Tailwind CSS, React Hook Form, Zod, Clerk
- **Backend:** Flask, SQLAlchemy, Flask-CORS
- **Database:** MySQL
- **Authentication:** Clerk

---

## Project Structure

```
farmconnect/
├── frontend/      # Next.js app (UI, API calls)
├── backend/       # Flask API (REST endpoints)
├── database/      # SQL scripts, migrations
└── README.md
```

---

## Database Schema

**Main Tables:**
- `register`: Farmer details
- `farming`: Farming types
- `addagroproducts`: Product listings
- `trig`: Audit logs

> **Note:** No `user` table is needed; Clerk handles user authentication.

**ERD Overview:**
```
register (rid PK) -- farming (fid PK)
register (farmername) --< addagroproducts (username)
```

---

## Setup & Installation

### Prerequisites

- Node.js 18+
- Python 3.8+
- MySQL 8+
- Clerk account (for authentication keys)

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# Configure .env for DB connection
python app.py
```

### Frontend Setup

```bash
cd frontend
npm install
# Configure .env.local with Clerk and API URL
npm run dev
```

### Database

- Import the provided SQL schema into your MySQL database.
- Ensure triggers for audit logging are enabled.

---

## Usage

- Open [http://localhost:3000](http://localhost:3000) in your browser.
- Register or log in using Clerk.
- Explore the dashboard, register farmers, add products, and browse the marketplace.

---

## API Overview

**Sample Endpoints:**

- `GET /api/farmers` – List all farmers
- `POST /api/farmers` – Register a new farmer
- `GET /api/products` – List products
- `POST /api/products` – Add a product
- `GET /api/farming-types` – List farming types
- `GET /api/records` – View audit logs

---

## Testing

- Backend: Use [pytest](https://docs.pytest.org/) or Flask's test client.
- Frontend: Use [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/).
- Run test scripts with `npm test` (frontend) or `pytest` (backend).

---

## Contributing

Contributions are welcome! Please:
- Fork the repo and create a feature branch
- Follow the code style and commit conventions
- Submit a pull request with a clear description

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

**FarmConnect – a modern agri marketplace empowering farmers and buyers through seamless digital connections.**
