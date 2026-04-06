# BlinkBuy 🛒✨

BlinkBuy is a modern, feature-rich web application for buying and selling second-hand products. Built with a focus on seamless user experience, it features an intuitive UI, real-time user-to-user messaging, an AI-powered smart assistant, advanced search, and secure user authentication.

## 🚀 Features

* **User Authentication:** Secure Sign Up, Login, OTP Verification, and Password Reset flows.
* **Buy & Sell Platform:** Users can easily browse categories or upload their own products to sell.
* **Real-Time Customer-Seller Chat:** Seamless, live user-to-user messaging powered by **Socket.io**, allowing buyers and sellers to easily connect, negotiate, and discuss product details.
* **Connectify AI Bot (Generative AI):** An integrated smart chatbot powered by **Google's Generative AI (Gemini API)** to assist users with their queries in real-time.
* **Advanced Search:** Live search functionality with an auto-updating dropdown for products and brands.
* **Wishlist Management:** Add or remove favorite products with a single click (requires authentication).
* **Product Management:** Users have a dedicated "My Products" dashboard to edit or delete their listings.
* **Interactive UI:** Smooth animations powered by GSAP, modern carousels using Swiper, and responsive layouts styled with Tailwind CSS.

## 🛠️ Tech Stack

**Frontend:**
* **React.js** - UI Library
* **Redux Toolkit** - State Management (Auth, User Data, Wishlist)
* **React Router Dom** - Navigation and Routing
* **Tailwind CSS** - Utility-first styling
* **Material-UI (MUI)** - Pre-built accessible UI components (Dialogs, Typography)
* **Socket.io-client** - Real-time bidirectional event-based communication
* **GSAP** - Complex logo and UI animations
* **Swiper** - Touch-enabled slider for category browsing
* **Axios** - Promise-based HTTP client for API requests
* **React Hot Toast** - Elegant popup notifications

**External APIs & Services:**
* **Google Generative AI (Gemini API)** - Powers the Connectify AI Chatbot

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed on your local machine:
* [Node.js](https://nodejs.org/) (v16.x or higher recommended)
* npm or yarn package manager
