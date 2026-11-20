
# Recipe Discovery App

A modern, responsive React single-page application built with TypeScript and Tailwind CSS that allows users to explore, search, and save their favorite recipes from around the world using the [TheMealDB API](https://www.themealdb.com/api.php).

## Live Demo

Live Demo: [https://natalymelnichuk.github.io/recipe-discovery-app/]

## Tech Stack

### Frontend
- **Core Framework:** React, TypeScript, Vite
- **Routing:** React Router (with dynamic base path support for GitHub Pages)
- **State & Persistence:** React Context API, Custom Hooks (`useFetch`, `useLocalStorage`), `localStorage`
- **UI & Styling:** Tailwind CSS

### Data & Deployment
- **External API:** TheMealDB API
- **Hosting:** GitHub Pages

## Key Features & User Capabilities

### 1. Dynamic Category Browsing
- **Category Exploration:** Browse recipe categories loaded dynamically from TheMealDB API with smooth switching between categories.
- **Category & Recipe Views:** Open any category to view matching dishes and inspect full ingredients, measurements, and step-by-step preparation instructions.

<img width="932" height="742" alt="Screenshot 2026-11-20 at 3 36 35 PM" src="https://github.com/user-attachments/assets/0028bee6-37fc-4f96-a381-8d8c22b40739" />

<img width="933" height="721" alt="Screenshot 2026-11-20 at 3 39 17 PM" src="https://github.com/user-attachments/assets/7097cf2d-eff5-445d-ac80-138e246bc2ee" />

<img width="923" height="742" alt="Screenshot 2026-11-20 at 3 39 38 PM" src="https://github.com/user-attachments/assets/2f66b7eb-9322-4ca5-bd9d-7ca078bd805b" />


### 2. Global Recipe Search
- **Keyword Search (`/search`):** Search across the recipe catalog by keyword to quickly find dishes or ingredients.
- **Loading & Error Feedback:** Clear loading indicators and error states while requests are in flight or if no matches are found.

<img width="934" height="738" alt="Screenshot 2026-11-20 at 3 37 53 PM" src="https://github.com/user-attachments/assets/dc23720c-64ce-4089-ba87-ddc070ea454f" />

<img width="951" height="737" alt="Screenshot 2026-11-20 at 3 38 06 PM" src="https://github.com/user-attachments/assets/ff97439b-b697-4a6a-8257-abf7571a7d27" />

<img width="946" height="436" alt="Screenshot 2026-11-20 at 3 38 48 PM" src="https://github.com/user-attachments/assets/846d7afd-be9d-4475-9ae8-e4c9069ab43d" />


### 3. Favorites Management & Local Filtering
- **Persistent Favorites (`/favorites`):** Save and remove favorite recipes with automatic persistence in `localStorage` across browser sessions.
- **Real-Time Name Filter:** Filter saved favorite recipes on the fly without extra network requests.

<img width="947" height="401" alt="Screenshot 2026-11-20 at 3 40 03 PM" src="https://github.com/user-attachments/assets/0dfe096a-7920-4dcb-954e-88ec8c998f65" />


### 4. Responsive UI & Persistent Navigation
- **Global Top Navigation:** Persistent navigation bar placed at the top level in `App.tsx` for seamless movement across pages.
- **Mobile-First Layout:** Clean, responsive interface styled with Tailwind CSS across desktop and mobile screens.

<img width="297" height="633" alt="Screenshot 2026-11-20 at 3 40 51 PM" src="https://github.com/user-attachments/assets/21e5ae9b-86a1-44a4-a933-7d44de9c8f35" />

<img width="300" height="662" alt="Screenshot 2026-11-20 at 3 41 06 PM" src="https://github.com/user-attachments/assets/442d43e2-2126-4aca-8cdb-60eb11d42a78" />


## Challenges and Solutions

* **Challenge:** Handling asynchronous data fetching, loading states, and potential errors when integrating external data from TheMealDB API into React components.
* **Solution:** Implemented structured error handling and clean data-fetching patterns within custom hooks to ensure smooth user feedback during API requests.

* **Challenge:** Synchronizing user-saved favorite recipes globally across multiple independent components (such as cards, detail views, and search filters) without causing prop drilling.
* **Solution:** Centralized state management using a dedicated **`FavoritesContext`** combined with a custom **`useLocalStorage`** hook to persist data across sessions.

* **Challenge:** Managing static asset paths and client-side routing differences between local development (`localhost`) and production subdirectory hosting on GitHub Pages.
* **Solution:** Configured Vite's `base` property and utilized dynamic router `basename={import.meta.env.BASE_URL}` to ensure seamless navigation and asset loading.


## Key Architectural & Design Decisions

* **Global Navbar Placement (`App.tsx`):** 
  The navigation bar was placed directly at the top level inside `App.tsx` (above the router view) so that it remains persistently visible across all pages without needing to be repeatedly imported inside individual layout views.

* **Reusable Component Architecture:** 
  UI elements like recipe cards, and search inputs were built as modular components. By accepting dynamic props (such as data objects, click handlers, and styling variants), these components are easily reused across the Home, Category, Details, and Favorites pages.

* **Strict TypeScript Typing:** 
  Dedicated types and interfaces were created in separate files to define API responses, recipe structures, and component props. This approach ensures robust type safety, improves autocomplete in the IDE, and prevents runtime errors.

* **Custom Hooks & Their Purpose:** 
  Custom hooks were structured to isolate specific logic—such as handling local storage persistence, managing search parameters, or abstracting API fetching processes. This separates business logic cleanly from UI presentation components, making the codebase much easier to maintain and test.


## Getting Started Locally

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/natalymelnichuk/recipe-discovery-app.git](https://github.com/natalymelnichuk/recipe-discovery-app.git)
