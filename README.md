# ☕ Brew & Bean Café — Full Stack Application

A luxury, artisan coffee brand website built with **React (Vite + Tailwind CSS)** and a high-performance **Python (FastAPI + MongoDB)** backend.

---

## 📁 Project Architecture

```text
brew-and-bean/
│
├── frontend/                  # React.js Single Page Application
│   ├── public/                # Static assets & favicons
│   ├── src/
│   │   ├── assets/            # Local images & brand assets
│   │   ├── components/        # UI components (Hero, Menu, Gallery, Contact, etc.)
│   │   ├── data/              # cafeConfig.js (centralised business data) & fallback menu
│   │   ├── hooks/             # Custom hooks (e.g. useInView)
│   │   ├── services/          # API integration layer (api.js, menuService.js, contactService.js)
│   │   ├── App.jsx            # Main root component
│   │   ├── index.css          # Tailwind CSS styles & custom keyframes
│   │   └── main.jsx           # React DOM mount point
│   ├── index.html             # HTML entry template
│   ├── package.json           # Frontend dependencies
│   ├── vercel.json            # Vercel SPA routing & cache configuration
│   ├── .env.example           # Frontend environment template
│   └── vite.config.js         # Vite configuration
│
├── backend/                   # Python FastAPI Backend
│   ├── app/
│   │   ├── core/              # Config (pydantic-settings) & Database (Motor)
│   │   ├── models/            # Pydantic data schemas (Menu, Contact)
│   │   ├── routes/            # API endpoints (/api/health, /api/menu, /api/contact)
│   │   ├── services/          # Business logic & Mongo queries
│   │   └── utils/             # Document serializers & helpers
│   ├── tests/                 # Async API test suite (pytest)
│   ├── Dockerfile             # Container definition for containerised hosting
│   ├── Procfile               # Process file for Heroku / Railway / Render
│   ├── .env.example           # Backend environment template
│   ├── .gitignore             # Python-specific gitignore
│   ├── requirements.txt       # Python package dependencies
│   └── main.py                # FastAPI app entrypoint & CORS setup
│
├── README.md                  # Complete project & deployment documentation
└── .gitignore                 # Root gitignore
```

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js** (v18+) & **npm**
- **Python** (v3.10+)
- **MongoDB** (Local instance running at `mongodb://localhost:27017` or MongoDB Atlas)

---

### 1. Running the Frontend

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Copy the environment template (if not already done)
cp .env.example .env

# 3. Install dependencies
npm install

# 4. Start the Vite development server
npm run dev
```

The frontend will run at:
👉 **http://localhost:5173**

---

### 2. Running the Backend

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Copy the environment template (if not already done)
cp .env.example .env

# 3. (Optional but recommended) Create and activate a virtual environment
python -m venv .venv

# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
# source .venv/bin/activate

# 4. Install dependencies
pip install -r requirements.txt

# 5. Start the FastAPI server
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

The backend API will run at:
👉 **http://localhost:8000**

Interactive API Documentation (Swagger UI):
👉 **http://localhost:8000/docs**

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/health` | Health check & database connection status |
| **GET** | `/api/menu` | Retrieve all café menu items |
| **GET** | `/api/menu?category=Coffee` | Filter menu items by category |
| **POST** | `/api/menu` | Add a new beverage / food item |
| **POST** | `/api/contact` | Submit customer table enquiry (saved to MongoDB) |

> ℹ️ **Notice on Customer Enquiries:** Submissions from the contact form are stored in the MongoDB `contacts` collection. **No automated email notification service is currently configured.** The café owner does *not* receive automatic email alerts upon form submission; records must be viewed in the database or via a future administrative dashboard. To add email dispatch, integrate a transactional email provider (such as Resend, SendGrid, or AWS SES) into `backend/app/routes/contact.py`.

---

## 🚢 Deployment Guide

The frontend and backend are decoupled and should be hosted separately for optimal scalability, reliability, and security.

---

### 1. Database Hosting: MongoDB Atlas (Free Tier M0)

Before deploying the backend, set up a managed cloud MongoDB database:

1. Sign up / Log in to [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Create a new cluster on the **M0 Free Tier** (shared, 512 MB).
3. **Database Access:** Create a database user with `readWriteAnyDatabase` privileges. Save the username and strong password.
4. **Network Access:** Under *Network Access*, add `0.0.0.0/0` (Allow Access from Anywhere) to permit requests from cloud host providers (like Render or Railway).
5. **Connection String:** Click *Connect* → *Drivers* → Copy the standard connection string format:
   ```text
   mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<username>` and `<password>` with your database user credentials. Note this URI for your backend configuration.

---

### 2. Backend Deployment (Render.com Recommended)

Render provides seamless Python hosting with zero-downtime deploys and SSL out of the box.

1. Create a free account on [Render.com](https://render.com).
2. Click **New +** → **Web Service**.
3. Connect your Git repository (`brew-and-bean`).
4. Configure the service settings:
   - **Name:** `brew-and-bean-api`
   - **Region:** Closest to your users (e.g., Singapore, Frankfurt, Oregon)
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. **Environment Variables:** In the *Environment* tab, add:
   - `MONGODB_URL`: Your MongoDB Atlas connection string (from step 1).
   - `DATABASE_NAME`: `brew_and_bean`
   - `CORS_ORIGINS`: `https://your-frontend-app.vercel.app` (or `*` during initial testing).
   - `PORT`: `10000` (Render automatically injects `$PORT`).
6. Click **Deploy Web Service**.
7. Once deployed, note your public API URL (e.g. `https://brew-and-bean-api.onrender.com`).
8. Test the live health endpoint in your browser:
   👉 `https://brew-and-bean-api.onrender.com/api/health`

#### Alternative Backend Hosting Options:
- **Railway:** Push repo → Railway detects `backend/Procfile` or `backend/Dockerfile` automatically. Set environment variables in Railway dashboard.
- **Docker:** Build and run the pre-configured `backend/Dockerfile`:
  ```bash
  cd backend
  docker build -t brew-and-bean-api .
  docker run -p 8000:8000 --env-file .env brew-and-bean-api
  ```

---

### 3. Frontend Deployment (Vercel)

Vercel is optimized for Vite React applications with automatic global CDN edge caching.

1. Create an account on [Vercel](https://vercel.com).
2. Click **Add New...** → **Project** and import your Git repository.
3. Configure the project:
   - **Framework Preset:** `Vite`
   - **Root Directory:** Click *Edit* and select `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. **Environment Variables:**
   - Add name: `VITE_API_URL`
   - Value: `https://brew-and-bean-api.onrender.com/api` (Point to your live backend from step 2).
5. Click **Deploy**.
6. The `frontend/vercel.json` file ensures that all client-side routes redirect cleanly to `index.html` without 404 errors.

---

### 4. Post-Deployment Backend CORS Locking

Once your Vercel deployment provides your custom production domain (e.g., `https://brew-and-bean.vercel.app`):
1. Go to your Render backend service dashboard → **Environment**.
2. Update `CORS_ORIGINS` to strictly match your production domain:
   ```text
   CORS_ORIGINS=https://brew-and-bean.vercel.app
   ```
3. Trigger a redeploy on Render. This prevents unauthorized web origins from querying your API.

---

## 📋 Pre-Launch Customization Checklist

Before presenting this application to a real café client or launching publicly, replace all demo placeholders:

- [ ] **Business Contact & Location:** Update `frontend/src/data/cafeConfig.js`
  - [ ] Replace `phone` and `phoneDisplay` with real phone numbers
  - [ ] Replace `email` with official email
  - [ ] Replace `whatsappNumber` with real café WhatsApp business number
  - [ ] Replace `address` with physical café address
  - [ ] Update `mapsUrl` with actual Google Maps embed / location link
  - [ ] Update `hours` with real operating hours
  - [ ] Update social links (`instagram`, `facebook`, `twitter`)
  - [ ] Update `stats` (Origins, Happy Guests, Years of Craft)
- [ ] **Reviews & Testimonials:** Replace placeholder quotes in `frontend/src/components/Testimonials.jsx` with authentic customer feedback.
- [ ] **Photography:** Replace Unsplash placeholder images in `frontend/src/components/` and `frontend/src/data/menuData.js` with high-resolution photography of the actual café space, beans, and food items.
- [ ] **Branding:** Replace `frontend/public/favicon.svg` with the client's official vector logo or mark.
- [ ] **Menu Items & Pricing:** Review and adjust prices and offerings in MongoDB or `frontend/src/data/menuData.js`.
- [ ] **Form Submissions:** The contact enquiry form sends submissions to MongoDB collection `contacts`. If email notifications are desired, attach SendGrid, Resend, or AWS SES to `backend/app/routes/contact.py`.

---

## 🧪 Testing

### Backend Unit & Integration Tests (pytest)
```bash
cd backend
pytest
```

### Frontend Production Build Verification
```bash
cd frontend
npm run build
```

---

## 🔒 Security Best Practices

- `.env` files are excluded from Git across root, frontend, and backend `.gitignore`.
- Never commit MongoDB connection strings, credentials, or production URLs directly into code.
- Always use environment variables (`VITE_API_URL` for frontend, `MONGODB_URL` and `CORS_ORIGINS` for backend).
- In production, set `CORS_ORIGINS` to only your live Vercel domain, never `*`.

---

## 🎨 Design Philosophy
- **Aesthetic:** Dark luxury coffeehouse with warm cream background (`#F5F0E8`), rich charcoal panels (`#1a1a1a`), and champagne gold accents (`#C9A96E`).
- **Typography:** Cormorant Garamond (editorial serif headings) + Inter (clean sans-serif body).
- **Resilience:** Frontend includes automatic fallback data so the website remains 100% functional even if the backend is offline.
