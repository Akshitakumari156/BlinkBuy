# 😉 BlinkBuy - Modern MERN Marketplace

BlinkBuy is a high-performance, full-stack marketplace platform that enables users to buy and sell products seamlessly. The platform combines real-time communication, AI-powered shopping assistance, and a modern responsive user experience built with the MERN stack.

![Vercel Deployment](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge&logo=vercel)
![Render Deployment](https://img.shields.io/badge/Backend-Render-blue?style=for-the-badge&logo=render)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green?style=for-the-badge&logo=mongodb)
![React](https://img.shields.io/badge/Frontend-ReactJS-61DAFB?style=for-the-badge&logo=react)
![NodeJS](https://img.shields.io/badge/Backend-NodeJS-339933?style=for-the-badge&logo=node.js)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)

---

## 🚀 Overview

BlinkBuy is a modern online marketplace where users can:

- Browse and search products.
- Upload and manage products for sale.
- Communicate with buyers and sellers in real time.
- Save products to a wishlist.
- Get assistance from an AI-powered shopping bot.
- Enjoy a fully responsive experience across devices.

---
## 🚀 Key Features

* **🤖 AI Buy Bot:** Integrated **Google Gemini AI** assistant to help users with product queries and site navigation in real-time.
* **💬 Real-Time Chat:** Secure messaging system using **Socket.io** allowing instant negotiation between buyers and sellers.
* **🛒 Product Management:** Full CRUD functionality for products, including price setting and category management.
* **❤️ Wishlist System:** Save favorite products to a personalized wishlist for future purchases.
* **🔐 Secure Authentication:** Robust JWT-based login/signup with Redux state management for secure sessions.
* **📱 Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop using Tailwind CSS.
* **☁️ Cloud Storage:** High-speed image hosting and management via Cloudinary.

---

**Frontend:**
* **React.js (Vite):** Core UI framework.
* **Redux Toolkit:** Global state management for user data and wishlist.
* **Tailwind CSS:** Modern utility-first styling.
* **Material UI:** Elegant components and confirmation dialogs.

**Backend:**
* **Node.js & Express.js:** Fast and scalable server-side architecture.
* **MongoDB & Mongoose:** Efficient NoSQL database management.
* **Socket.io:** Real-time bidirectional event-based communication.
* **JWT & Bcrypt:** Secure token-based authentication and password hashing.

**API & Services:**
* **Google Gemini API:** Powering the intelligent "Buy Bot" assistant.
* **Cloudinary:** Cloud-based image and video management.
* **Vercel:** Frontend CI/CD deployment.
* **Render:** Backend hosting with Linux environment optimization.

---

## 📂 Project Structure

```text
BlinkBuy/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   │   └── utils/
│   │
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── config/
│   └── server.js
│
├── README.md
└── package.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Akshitakumari156/BlinkBuy.git
cd BlinkBuy
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory:

```env
PORT=4000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

GEMINI_API_KEY=your_gemini_api_key
```

Start backend server:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file inside the frontend directory:

```env
VITE_BACKEND_URL=http://localhost:4000/api/v1

VITE_SOCKET_BACKEND_URL=http://localhost:4000
```

Start frontend:

```bash
npm run dev
```

---

## 🔄 Application Workflow

1. User creates an account.
2. User logs in securely using JWT authentication.
3. Sellers upload products with images.
4. Buyers browse and search products.
5. Buyers can save products to wishlist.
6. Buyers and sellers communicate via real-time chat.
7. AI Buy Bot assists users with shopping-related queries.
8. Product images are stored securely on Cloudinary.

---

## 🌐 Deployment

### Frontend

Hosted on Vercel

```text
(https://blink-buy-rho.vercel.app/)
```

### Backend

Hosted on Render

```text
(https://blinkbuy-backend.onrender.com)
```

---

## 🔮 Future Improvements

- Product recommendations using AI.
- Payment gateway integration.
- Order tracking system.
- Seller analytics dashboard.
- Product reviews and ratings.
- Notifications system.
- Dark mode support.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👩‍💻 Developer

**Akshita Kumari**

GitHub: https://github.com/Akshitakumari156

---

### ⭐ If you like this project, don't forget to star the repository!
