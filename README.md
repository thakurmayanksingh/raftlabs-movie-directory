# RaftLabs Cinema Assignment

A modern, high-performance movie directory built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**. This project features a programmatically generated "Top 250" collection with advanced filtering, client-side persistence, and staggered animations.

## 🚀 Live Demo
[**Click here to view the Live Site**](https://raftlabs-movie-directory.vercel.app/)
*(Note: Replace this link with your actual Vercel URL after deployment)*

## 🌟 Key Features
* **Deep Linking & Permutations:** "Permutations" are handled via URL parameters. Clicking a genre on a movie page automatically filters the main grid (e.g., `/?genre=Drama`).
* **Optimized Search:** Implemented **Debounced Search** (300ms) to handle real-time filtering without UI lag or race conditions.
* **Persistent Watchlist:** Client-side state management using Local Storage to save favorites across sessions.
* **Visual Polish:** Glassmorphism UI, "Waterfall" entrance animations, and dynamic visual rating bars inspired by Letterboxd.
* **SEO Ready:** Includes dynamic `sitemap.xml`, `robots.txt`, and OpenGraph metadata for every movie page.

## 🛠 Tech Stack
* **Framework:** Next.js 14 (App Router)
* **Styling:** Tailwind CSS + Custom Glassmorphism
* **Language:** TypeScript
* **Animations:** Framer Motion
* **Data:** Static JSON (SSG/ISR simulation)

## 📂 Dataset
* **Source:** The dataset is a curated JSON list of top-rated movies based on **TMDB (The Movie Database)** metadata.
* **Generation:** Data was programmatically formatted into a static `movies.json` file to ensure type safety and fast static generation without needing a live backend connection for this demo.

## 🤖 AI Usage & Prompts
This project was accelerated using AI-assisted development (Cursor/Gemini) for scaffolding and logic. Key prompts used include:
1.  *"Create a reusable 'StaggerContainer' component using Framer Motion that creates a waterfall effect for a grid of items."*
2.  *"Refactor the Movie Grid component to sync filters (genre, year, sort) directly with the URL search parameters for shareability, ensuring the back button works."*
3.  *"Implement a debounced search input in React that updates the URL query params without causing render loops."*

## 🔮 What I'd improve with 2 more days
1.  **Virtualization:** Implement `react-window` for the main grid to handle datasets of 1000+ movies without performance drops.
2.  **Backend Integration:** Move the Watchlist from Local Storage to a Supabase/PostgreSQL database for cross-device syncing.
3.  **Unit Testing:** Add Jest/React Testing Library for the filter logic and edge cases.

## 🏃‍♂️ How to Run Locally
1.  Clone the repo:
    ```bash
    git clone [https://github.com/YOUR_USERNAME/raftlabs-cinema.git](https://github.com/YOUR_USERNAME/raftlabs-cinema.git)
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000)
