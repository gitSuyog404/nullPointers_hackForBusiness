# 🥡 Food Rescue

> **A Sustainable Platform to Share Surplus Food, Save Money & Feed More.**

## 🌍 Project Overview

**Food Rescue** is a cross-platform solution designed to connect restaurants, industries, and food providers with customers seeking affordable meals. Businesses can post leftover food that would otherwise go to waste, and customers can order these meals at a significantly reduced cost.

Customers are offered two fulfillment options:

- 🚶‍♂️ **Self Pickup** – Collect the order themselves from the provider.
- 🚚 **Delivery** – A registered rider will pick up and deliver the order directly.

This initiative not only reduces food waste but also provides affordable meals to users — creating a win-win situation for both providers and consumers.

---

## 🚀 Key Features

- 📦 Restaurants/Companies can post leftover food items with price, time, and availability
- 🛒 Customers can browse and order meals via web or mobile app
- 🔄 Real-time food status tracking (Available, Picked, Delivered)
- 🛵 Riders receive delivery assignments and track orders
- 🔐 Role-based authentication for Admin, Customer, Rider, and Restaurant
- 📍 Map integration for pickup & delivery routes
- 💬 Notification system for order updates

---

## 🧑‍💻 Tech Stack

| Layer            | Technology                  |
| ---------------- | --------------------------- |
| 🎯 Frontend App  | Flutter                     |
| 🌐 Web Frontend  | React.js                    |
| 🛠 Backend        | Java Spring Boot (REST API) |
| ☁️ Database      | MySQL                       |
| 🔐 Auth          | JWT (Token-based)           |
| 🔔 Notifications | WebSockets, FCM (planned)   |

---

## 🧩 Repository Structure

This is a monorepo setup with multiple branches and folders:

```text
food_rescue/
├── backend/        # Java Spring Boot (main: backend branch)
├── frontend-web/   # React.js app (main: frontend branch)
└── frontend-app/   # Flutter app (main: flutter branch)
```

---

## ⚙️ Setup Instructions

### 🔙 Backend (Java Spring Boot)

#### ✅ Prerequisites

- Java 21
- Maven 3.8+
- MySQL installed and running
- IDE: IntelliJ or Eclipse

#### ⚙️ Setup

```bash
# Clone the repo
git clone https://github.com/gitSuyog404/nullPointers_hackForBusiness.git
git checkout backend

# Configure environment
Create `.env` or `application.properties` with:

SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/food_rescue
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=your_password
JWT_SECRET=your_secret_key

▶️ Run Server
mvn clean install
mvn spring-boot:run
Server will run at http://localhost:8080.
```

---

### 🌐 Web Frontend (React.js)

#### ✅ Prerequisites

- Node.js v18+

- npm or yarn

⚙️ Setup

```bash

# Clone the repo
git clone https://github.com/gitSuyog404/nullPointers_hackForBusiness.git
cd frontend


# Install dependencies
npm install

# Urls have been saved in the constants.ts file

BASE_URL=http://localhost:8080/api
▶️ Run App
npm run dev
App will run at http://localhost:5173.
```

---

### 📱 Mobile App (Flutter)

#### ✅ Prerequisites

- Flutter SDK (latest)

- Android Studio or VS Code

- Android Emulator or real device

⚙️ Setup

```bash
git checkout flutter
cd food_rescue

# Get dependencies
flutter pub get

▶️ Run App
flutter run
```

---

## 👥 Team Members

| Name               | Role                       |
| ------------------ | -------------------------- |
| **Grish Shrestha** | Java Spring Boot Developer |
| **Suyog Baniya**   | Front End Developer        |
| **Rohan Shrestha** | Flutter Developer          |
| **Kanchan Sunar**  | Q.A Engineer               |
