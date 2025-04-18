🔗 [Live Demo](https://mediumslateblue-mandrill-355504.hostingersite.com/)

# 🎮 RAWG Game Browser

A fully responsive front-end React application built using Create React App that fetches and displays game data using the RAWG Video Games Database API. It features user authentication, filtering, bookmarking, and a game detail page – all styled using Bootstrap and React-Bootstrap. 

This project is part of a front-end challenge to demonstrate skills in component design, API integration, state management, and user authentication.

---

## 🚀 Features

- 🔍 Live Search with real-time suggestions
- 🎮 Game Cards with image, title, tags, genre, ratings
- 🧭 Sidebar Filters (genre, tags, year, popularity)
- 📄 Detailed Game Page (screenshots, description, system requirements, etc.)
- 🔐 Clerk Authentication (Sign up, Log in, Log out)
- 📚 Bookmark/Favorite Games (only accessible when logged in)
- 🌐 Responsive Design using Bootstrap + React-Bootstrap
- 📦 Redux for state management
- 📄 Pagination to load more games

---

## 📁 Folder Structure

```
src/
├── assets/               # Images and static assets
├── components/           # Reusable UI components
├── pages/                # Page-level components (Home, GameDetails, Library)
├── redux/                # Redux store, slices, actions
├── utils/                # Helper functions and constants
├── App.js                # Main app entry with routes
├── index.js              # React DOM render with Redux and Clerk setup
└── ...other CRA files
```

---

## 🧩 Tech Stack

- **React (CRA)** – UI Framework
- **React-Bootstrap** – Styling components
- **Bootstrap 5** – Responsive layout & design
- **Redux & @reduxjs/toolkit** – State management
- **Axios** – API calls
- **React Router DOM** – Page routing
- **Clerk** – User authentication system

---

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/rawg-game-browser.git
cd rawg-game-browser
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a `.env` file

Create a `.env` file in the root directory and add the following keys:

```
REACT_APP_RAWG_API_KEY=your_rawg_api_key_here
REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

Replace with your actual keys. **Do not expose `.env` in public repositories.**

---

## 🧪 Available Scripts

In the project directory, run:

### `npm start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000).

### `npm test`

Launches the test runner.

### `npm run build`

Builds the app for production.

### `npm run eject`

**Note: this is irreversible.** Copies config to allow full customization.

---

## 🔐 Authentication

- Implemented via [Clerk](https://clerk.dev)
- Routes like `/library` are protected and require login
- Users can sign up and log in using Clerk's hosted components

---

## 📚 Bookmarks

- Logged-in users can bookmark games (saved in Redux)
- Bookmark state persists using `localStorage`

---

## 📌 API Used

- **RAWG Video Games Database API**: https://rawg.io/apidocs
  - Used for fetching game listings, screenshots, tags, and details.

---

## 🧠 Future Enhancements

- Dark/Light Mode Toggle
- Sorting Options (Rating, Release Date)
- User Profile Pages
- Lazy Loading for Images

---

## 🤝 Contributing

1. Fork this repo
2. Create a new branch: `git checkout -b my-feature`
3. Make your changes and commit: `git commit -m 'add feature'`
4. Push to branch: `git push origin my-feature`
5. Open a Pull Request

---

## 📄 License

MIT © Pratyush Shrivastava
