
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from './components/Navbar';
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import SearchDetail from "./pages/SearchDetail";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import FavoritesPage from "./pages/FavoritesPage";


function App() {
  
  return (
    <FavoritesProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <div className="min-h-screen bg-[#FDFBF7] text-slate-800">
          
          <Navbar />

          <main className="container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/category/:name" element={<CategoryPage />} />
              <Route path="/search" element={<SearchDetail />} />
              <Route path="/recipe/:idSlug" element={<RecipeDetailPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </FavoritesProvider>
  )
}

export default App
