# Website Frontend (Legacy)

This project was the frontend for a previous version of my personal website, [shenderov.me](https://shenderov.me).  
It contains **two separate single-page applications** (SPAs) under one repository:

- The **main website SPA**, built with AngularJS and Materialize CSS
- The **admin panel**, built with AngularJS, W3.CSS, and Font Awesome

Both apps use **Gulp** for building and asset management.

> **Note:**  
> This project, along with its backend, has been **fully replaced** by my new static site: [shenderov.github.io](https://github.com/shenderov/shenderov.github.io).  
> This repo is left for reference and future frontend experiments only.

---

## 🚀 Features

- **Main SPA:**  
  - Single-page site with AngularJS  
  - Materialize CSS for UI styling  
  - Gulp for asset building and optimization

- **Admin Panel:**  
  - Separate AngularJS SPA for site management  
  - Uses W3.CSS and Font Awesome for UI  
  - Gulp for build pipeline

- Clean, modular codebase
- Connects to a Java Spring Boot backend ([website-backend](https://github.com/shenderov/website-backend))
- Responsive layouts

---

## 🛠️ Tech Stack

### Main SPA
- **Framework:** AngularJS (1.x)
- **UI:** Materialize CSS
- **Build:** Gulp

### Admin Panel
- **Framework:** AngularJS (1.x)
- **UI:** W3.CSS, Font Awesome
- **Build:** Gulp

---

## 📁 Project Structure

<pre>
website-frontend/
├── src/                   # Main website SPA (AngularJS + Materialize CSS)
│   ├── app/               # AngularJS app code
│   ├── assets/            # Images, styles
│   └── index.html         # SPA entry point
├── admin/                 # Admin panel SPA (AngularJS + W3.CSS)
│   ├── app/               # AngularJS admin code
│   ├── assets/            # Admin assets
│   └── index.html         # Admin panel entry point
├── gulpfile.js            # Gulp build configuration
├── package.json           # npm dependencies
├── README.md
└── ...
</pre>

---

## ⚡ Getting Started

1. **Clone the repository:**
    ```bash
    git clone https://github.com/shenderov/website-frontend.git
    cd website-frontend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Build both apps:**
    - For the main SPA:
      ```bash
      gulp build --cwd spa
      ```
    - For the admin panel:
      ```bash
      gulp build --cwd admin
      ```
    *(Commands may vary; check `gulpfile.js` or scripts for details)*

4. **Run locally:**  
   Serve each app (e.g., using `gulp serve` or a local server) and open in your browser.

5. **Backend API:**  
   Both apps expect the [website-backend](https://github.com/shenderov/website-backend) server running at [http://localhost:8080](http://localhost:8080).

---

## 🌐 Related Projects

- **Backend:**  
  [website-backend](https://github.com/shenderov/website-backend) — Java/Spring Boot backend service for this frontend

- **Current site (replacement):**  
  [shenderov.github.io](https://github.com/shenderov/shenderov.github.io) — The new, static version of [shenderov.me](https://shenderov.me) (no backend required)

---

## ⚠️ Disclaimer

This project is not actively maintained and is left public for reference and future experiments.  
It was primarily a learning project for frontend-backend integration and SPA/admin panel architectures.

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).
