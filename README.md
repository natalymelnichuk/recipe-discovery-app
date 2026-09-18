
# Recipe Discovery App

A modern, responsive React single-page application built with TypeScript and Tailwind CSS that allows users to explore, search, and save their favorite recipes from around the world using the [TheMealDB API](https://www.themealdb.com/api.php).

Live Demo: [https://natalymelnichuk.github.io/recipe-discovery-app/]


## Features

- **Home Page**: Browse recipe categories fetched dynamically from the API with smooth category switching.
- **Category & Detail Pages**: View recipes by category and inspect full ingredients, measurements, and cooking instructions for any dish.
- **Global Search (`/search`)**: Search for recipes across the entire API database by keyword.
- **Favorites Management (`/favorites`)**: Persist saved recipes across browser sessions using custom hooks and local storage, complete with a real-time local name filter.
- **Responsive UI**: Clean, modern interface designed with Tailwind CSS, featuring custom loading spinners and robust error handling.


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