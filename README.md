# Blog Web Application

A full-stack, in-memory blog app built with Node.js, Express.js, and EJS. Create, view, edit, and delete posts—all without a database—and enjoy a fully responsive, professional UI.

---

## Table of Contents

- [Demo](#demo)  
- [Features](#features)  
- [Prerequisites](#prerequisites)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Project Structure](#project-structure)  
- [Environment Variables](#environment-variables)  
- [Scripts](#scripts)  
- [Contributing](#contributing)  
- [License](#license)  
- [Contact](#contact)  
- [Acknowledgements](#acknowledgements)  

---


---

## Features

- Create, read, update, delete (CRUD) blog posts  
- Reverse-chronological listing with featured post  
- Confirmation prompt on delete  
- Flash messages (create/edit/delete) with auto-dismiss  
- Responsive layout for desktop, tablet, mobile  
- Reusable EJS partials for header & footer  
- Graceful 404 and 500 error pages  

---

## Prerequisites

- Node.js ≥ 14.x  
- npm (bundled with Node)  
- Git  

---

## Installation

```bash
# 1. Clone this repo
git clone https://github.com/your-org/blog-app.git

# 2. Navigate into the folder
cd blog-app

# 3. Install dependencies
npm install

Usage
bash
# Start in development mode (with nodemon if installed)
npm run dev

# Or simply
node app.js
Then open your browser to:

Code
http://localhost:3000
Project Structure
Code
blog-app/
├── app.js               # Express server & routes
├── package.json         # Project config & dependencies
├── public/              # Static assets
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
│   └── images/          # Screenshots, icons, etc.
└── views/               # EJS templates
    ├── partials/
    │   ├── header.ejs
    │   └── footer.ejs
    ├── index.ejs        # All posts page
    ├── create.ejs       # New post form
    ├── edit.ejs         # Edit post form
    └── post.ejs         # Single post view
Environment Variables
This app uses the following optional variables (with defaults shown):

env
PORT=3000
To override, create a .env file and add:

ini
PORT=8080
Scripts
Script	    Description
node app.js   Start server with nodemon (if installed)
npm start   Start server with node app.js
Contributing
Fork the repository

Create your feature branch

bash
git checkout -b feature/YourFeature
Commit your changes

bash
git commit -m "Add YourFeature"
Push to the branch

bash
git push origin feature/YourFeature
Open a Pull Request and request a review

Please adhere to the existing code style, write clear commit messages, and include screenshots or GIFs for any UI changes.

**Acknowledgements**
EJS Documentation
Express.js Guide
Node.js


**Individual Contributions**
**Victoria**
Designed and implemented header.ejs hero section and navigation styling
Crafted footer.ejs with responsive layout and professional theming
Added deletion with confirmation, success flash, and 404 handling
Built post-listing logic in index.ejs and /posts route
Created featured post section and reverse-order rendering
styled index.ejs with CSS for consistency and responsiveness


**Louiser**
Developed post creation flow in create.ejs and POST /posts route
Configured Express app in app.js with EJS, middleware, and static routes
Established in-memory data store and helper functions
Improved css styling in header and footer ejs
styled create.ejs with consistent form elements and spacing

**Debra**
Implemented edit functionality in edit.ejs and /posts/:id/edit routes
Validated input and displayed inline error messages
Added editing with confirmation, success flash, and 404 handling
Implemented script.js for flash message dismissal and DOM manipulation
Styled edit form with CSS for consistency and responsiveness

