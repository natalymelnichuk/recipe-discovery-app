
import { Link } from "react-router-dom";
import { createSlug } from "../utils/slugify";

interface RecipeCardProps {
    meal: {
        idMeal: string;
        strMeal: string;
        strMealThumb: string;
    };
    onRemoveFavorite?: (id: string) => void;
}

export default function RecipeCard({ meal, onRemoveFavorite }: RecipeCardProps) {
    return (
        <div className="bg-white/95 backdrop-blur-md rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-amber-100/60 flex flex-col group relative">
            {onRemoveFavorite && (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        onRemoveFavorite(meal.idMeal);
                    }}
                    title="Remove from favorites"
                    className="absolute top-3 right-3 z-10 w-9 h-9 bg-white/90 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-full flex items-center justify-center shadow-sm border border-amber-100/60 transition-colors cursor-pointer"
                >
                    ❤️
                </button>
            )}

            <Link
                to={`/recipe/${meal.idMeal}-${createSlug(meal.strMeal)}`}
                className="flex flex-col flex-grow"
            >
                <div className="w-full h-48 bg-gradient-to-br from-amber-100/40 to-orange-50/30 overflow-hidden relative">
                    <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
                <div className="p-5 flex flex-col flex-grow justify-between">
                    <h2 className="text-lg font-bold text-slate-800 group-hover:text-amber-700 transition-colors line-clamp-2">
                        {meal.strMeal}
                    </h2>
                    <span className="text-xs font-medium text-amber-700 mt-4 inline-flex items-center gap-1">
                        View Recipe
                    </span>
                </div>
            </Link>
        </div>
    );
}