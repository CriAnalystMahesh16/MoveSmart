# 🏟️ MoveFast: Smart Stadium Crowd Management

**MoveFast** is a cutting-edge, full-stack AI-powered dashboard designed to revolutionize the experience of fans in large sports venues. By combining real-time crowd tracking, predictive analytics, and an intelligent AI assistant, MoveFast ensures seamless movement, safety, and personalized convenience for every visitor.

---

## ⚡ Problem Statement
Managing crowd movement in massive stadiums is a logistical challenge. Congestion at gates, concession stands, and restrooms often leads to:
- **Safety Hazards**: High-density clusters causing risks.
- **Lost Revenue**: Long queues at food courts deterring purchases.
- **Frustrating Experience**: Fans spending more time in line than watching the game.

## 🚀 The Solution
MoveFast provides a real-time "digital twin" of the stadium's crowd dynamics. It empowers both stadium managers and fans through:
- **AI-Powered Assistance**: Context-aware guidance for routing and dining.
- **Predictive Intelligence**: Forecasting crowd levels 30 minutes into the future.
- **Real-Time Alerts**: Dynamic notification system with automated "best route" suggestions.

---

## ✨ Key Features

### 🎨 Premium Sports-Themed UI
A modern dashboard featuring stadium-inspired gradients, interactive cards, and a sleek layout optimized for both desktop and mobile users.

### 🗺️ Smart Crowd Heatmap
Integrated **Google Maps** visualization showing color-coded stadium zones (Zone A, B, C) that update instantly based on crowd density.

### 🔄 Real-Time Firebase Integration
Syncs live data between the Node.js backend and React frontend using **Firestore onSnapshot** listeners for zero-latency updates.

### 🤖 Context-Aware AI Assistant
Powered by **Vertex AI (Gemini 1.5 Pro)**, the assistant is trained on the stadium's specific topology and live crowd data to provide personalized recommendations like *"Gate B is crowded; enter through Gate A instead."*

### 🚨 Dynamic Alerts System
Automatically monitors the venue for bottlenecks and suggests alternative, low-crowd zones to maintain optimal traffic flow.

### 📈 Predictive Analytics
A built-in trend analysis engine that calculates expected crowd levels for the next 15-30 minutes, allowing fans to plan their movements proactively.

---

## 🛠️ Tech Stack

- **Frontend**: `React.js`, `Vite`, `Vanilla CSS`, `Lucide Icons`
- **Backend**: `Node.js`, `Express`
- **Database**: `Firebase Firestore` (Admin & Client SDKs)
- **Maps**: `Google Maps JavaScript API`
- **AI Engine**: `Google Vertex AI` (Gemini Pro)

---

## 🏗️ How to Run

### 1. Prerequisites
- Node.js (v20+)
- Firebase Project
- Google Cloud Project (for Vertex AI)

### 2. Setup Backend
```bash
cd backend
npm install
# Place your 'serviceAccountKey.json' in this folder
npm start
```

### 3. Setup Frontend
```bash
cd frontend
npm install
# Update 'src/firebase.js' with your config
npm run dev
```

---

## 🔮 Future Improvements
- **Advanced ML Predictions**: Utilizing historical datasets for more granular crowd forecasting.
- **Offline Mode**: Local caching of navigation data for low-connectivity stadium environments.
- **Advanced Personalization**: Loyalty program integration and ticket-based seating directions.

---

*Built with passion for the ultimate fan experience.* 🏟️✨
