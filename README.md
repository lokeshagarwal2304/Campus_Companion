# 🎓 Campus Companion – Your Ultimate College Sidekick

**Campus Companion** is a full-stack web platform built to make your college life easier, smarter, and way more fun! 🚀  
From managing study notes to exploring campus events, from finding PGs to buying second-hand books — it’s your one-stop solution for everything student life needs! 🌟

---

## 🔧 Tech Stack – Apun ka Setup 🚀

<div align="center">

<table>
  <tr>
    <td><strong>⚛️ Frontend</strong></td>
    <td>React.js + Tailwind CSS ✨ (for blazing fast & responsive UI)</td>
  </tr>
  <tr>
    <td><strong>🛠 Backend</strong></td>
    <td>Node.js + Express.js 🚀 (for smooth API handling)</td>
  </tr>
  <tr>
    <td><strong>🗃 Database</strong></td>
    <td>MongoDB Atlas 🌍 (cloud-first, NoSQL magic)</td>
  </tr>
  <tr>
    <td><strong>🔗 APIs & Utilities</strong></td>
    <td>Axios 📡 (for HTTP requests), JWT 🛡 (for secure auth), Bcrypt 🔒 (password security)</td>
  </tr>
  <tr>
    <td><strong>🎨 Extras</strong></td>
    <td>Recharts 📊 (for data visualization), Cloudinary ☁️ (for image uploads)</td>
  </tr>
</table>

</div>

---

### ⚡ Highlights:
- 🎯 **Optimized for Speed** – Turbocharged React components  
- 🛡 **Security First** – JWT tokens + Bcrypt password encryption  
- 🌎 **Cloud-Ready** – MongoDB Atlas + Cloudinary integrations  
- 📱 **Mobile-First UI** – Tailwind magic for seamless mobile and web experience  
- 📈 **Visual Dashboards** – Recharts for clean analytics and user stats  

---

## 📁 Project Architecture

```
campus-companion/
│
├── client/                     # React frontend
│   └── src/
│       └── components/
│           └── Notes.js
│           └── Events.js
│           └── Marketplace.js
│
├── backend/                    # Node + Express backend
│   ├── controllers/
│   │   └── userController.js
│   │   └── eventController.js
│   ├── models/
│   │   └── User.js
│   │   └── Event.js
│   │   └── MarketplaceItem.js
│   ├── routes/
│   │   └── userRoutes.js
│   │   └── eventRoutes.js
│   └── server.js
```

---

## 🚀 Getting Started

### Step 1: Clone the Repository

```bash
git clone https://github.com/lokeshagarwal2304/campus-companion.git
cd campus-companion
```

### Step 2: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../client
npm install
```

### Step 3: MongoDB Setup

Make sure MongoDB is running locally on port `27017`:

```bash
mongod
```

Or connect your app to **MongoDB Atlas**!

### Step 4: Start the App

**Backend:**
```bash
cd backend
node server.js
```

**Frontend:**
```bash
cd ../client
npm start
```

---

## 🎯 Features

- 📚 Access Study Notes & Resources
- 📅 Get Real-Time Event Updates
- 🛍️ Explore Student Marketplace
- 🏡 Find Hostels & PGs
- 🧑‍🤝‍🧑 Join Clubs and Communities
- 📈 Track Career Opportunities
- 🗺️ Navigate the Campus with Maps
- 🔔 Smart Alerts for Assignments & Exams
- 📋 Lost & Found Board
- 💬 Anonymous Feedback System

---

## 🔧 API Endpoints

### 🧑 User Routes (`/api/users`)
- `POST /signup` → Register student  
- `POST /login` → Login  
- `GET /profile/:id` → Fetch user profile  

### 📅 Event Routes (`/api/events`)
- `GET /events` → List all events  
- `POST /events` → Create new event  

### 🛒 Marketplace Routes (`/api/marketplace`)
- `GET /items` → List all marketplace items  
- `POST /items` → Sell an item  

---

## 🔮 Future Enhancements

- 🌐 Multilingual Support (Regional languages)
- 📡 Push Notifications Integration
- 📈 Smart Analytics Dashboard for Admins
- 🔑 Google & LinkedIn OAuth Sign-In
- 📷 Media Upload for Marketplace & Events
- 🚀 Progressive Web App (PWA) Support

---

## 🤝 Contribution

Pull requests and ⭐ stars are welcome!  
Let's build the ultimate campus buddy together! 🧑‍💻❤️

---

## 📄 License

MIT License

---

## ⚡ Final Thoughts

**Campus Companion** isn’t just a project...  
*kabhi kabhi toh college ki yaadein banana bhi ek technology ka project hota hai* 😌🎓
