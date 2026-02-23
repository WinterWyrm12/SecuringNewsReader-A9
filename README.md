# NewsReader Starter App

⚠️ **IMPORTANT: This is intentionally insecure starter code!**

This application has several security issues that you will need to fix as part of your assignment:

## Security Issues to Address

1. **No Authentication**: Anyone can access all features without logging in
2. **Shared State**: All users share the same saved articles (no user-specific data)
3. **No Protected Routes**: The "Saved Articles" page should require authentication
4. **No Role-Based Access**: There's no concept of different user types (regular vs premium)

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- A NY Times API key (get one free at https://developer.nytimes.com/)

### Getting Your NY Times API Key

1. Visit https://developer.nytimes.com/ and create a free account
2. After logging in, click on your email address in the top right corner
3. Click "Apps" to go to your apps page
4. Click "New App" button
5. Give your app a name (e.g., "NewsReader App")
6. **Important**: Enable these two APIs:
   - ✅ **Top Stories API**
   - ✅ **Article Search API**
7. Click "Save" to generate your API key

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Add your NY Times API key to `src/services/api.js`:
   ```javascript
   const NY_TIMES_API_KEY = 'your-actual-api-key-here';
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open your browser to `http://localhost:5173`

## Project Structure

```
news-reader-starter/
├── src/
│   ├── components/
│   │   ├── ArticleCard.jsx
│   │   ├── Layout.jsx
│   │   ├── Login.css
│   │   ├── Login.jsx
│   │   └── Navigation.jsx
│   ├── context/
│   │   └── ArticlesContext.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── SearchPage.jsx
│   │   └── SavedArticlesPage.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Features (Current)

- Browse NY Times top stories
- Search for articles by keyword
- Bookmark articles (shared by all users - this needs to be fixed!)
- Responsive design

## Your Assignment

You will need to:
1. Implement user authentication (login/logout)
2. Create protected routes that require authentication
3. Make saved articles user-specific
4. Add role-based access control (regular vs premium users)
5. Secure the API key using environment variables
6. Deploy the application to Vercel

Good luck!
