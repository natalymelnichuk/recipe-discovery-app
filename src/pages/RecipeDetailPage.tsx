
import { useParams, Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useFavs } from "../hooks/useFavs";

interface MealDetail {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strYoutube?: string;
    [key: `strIngredient${number}`]: string | null | undefined;
    [key: `strMeasure${number}`]: string | null | undefined;
}

interface MealDetailResponse {
    meals: MealDetail[] | null;
}

export default function RecipeDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { favorites, addFavorite, removeFavorite } = useFavs();

    const { data, loading, error } = useFetch<MealDetailResponse>(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );

    const meal = data?.meals ? data.meals[0] : null;
    const isFavorite = meal ? favorites.includes(meal.idMeal) : false;

    if (loading || !data) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="text-lg text-amber-600 font-medium animate-pulse">
                    Loading recipe details...
                </div>
            </div>
        );
    }

    if (error || !meal) {
        return (
            <div className="text-center py-10 text-rose-600 bg-rose-50/95 rounded-3xl p-6 max-w-md mx-auto border border-rose-100 shadow-sm">
                <p className="font-semibold">Oops! Recipe not found:</p>
                <p className="text-sm mt-1">
                    {error instanceof Error ? error.message : "Could not load this recipe."}
                </p>
                <Link
                    to="/"
                    className="inline-block mt-4 px-4 py-2 bg-white rounded-xl text-slate-700 text-sm font-medium shadow-sm border border-rose-200"
                >
                    Back to Home
                </Link>
            </div>
        );
    }

    
    const ingredients: { ingredient: string; measure: string }[] = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}` as keyof MealDetail];
        const measure = meal[`strMeasure${i}` as keyof MealDetail];

        if (ingredient && ingredient.trim() !== "") {
            ingredients.push({
                ingredient: ingredient.trim(),
                measure: measure ? measure.trim() : "",
            });
        }
    }

    const toggleFavorite = () => {
        if (isFavorite) {
            removeFavorite(meal.idMeal);
        } else {
            addFavorite(meal.idMeal);   
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-16">
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between pt-4">
                <button
                    onClick={() => navigate(-1)}
                    className="px-5 py-2.5 rounded-2xl bg-white/80 hover:bg-white text-slate-700 font-medium text-sm shadow-sm border border-amber-100/60 transition-all duration-300 hover:shadow"
                >
                    Back
                </button>
                <button
                    onClick={toggleFavorite}
                    className={`px-5 py-2.5 rounded-2xl font-medium text-sm shadow-sm border transition-all duration-300 flex items-center gap-2 ${
                        isFavorite
                            ? "bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100"
                            : "bg-white/90 text-slate-700 border-amber-100/60 hover:bg-white hover:text-amber-700"
                    }`}
                >
                    {isFavorite ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
                </button>
            </div>

            {/* Hero Card */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden shadow-sm border border-amber-100/60 p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="w-full h-72 md:h-80 rounded-2xl overflow-hidden shadow-inner bg-gradient-to-br from-amber-100/40 to-orange-50/30">
                    <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        {meal.strCategory && (
                            <span className="px-3.5 py-1 text-xs font-bold tracking-wide uppercase bg-amber-100/80 text-amber-800 rounded-full shadow-sm">
                                {meal.strCategory}
                            </span>
                        )}
                        {meal.strArea && (
                            <span className="px-3.5 py-1 text-xs font-bold tracking-wide uppercase bg-orange-100/80 text-orange-800 rounded-full shadow-sm">
                                {meal.strArea}
                            </span>
                        )}
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight leading-tight">
                        {meal.strMeal}
                    </h1>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        Follow the ingredients and step-by-step instructions below to prepare this wonderful dish right in your kitchen.
                    </p>
                </div>
            </div>

            {/* Content Section: Ingredients & Instructions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Ingredients Column */}
                <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-amber-100/60 space-y-4 md:col-span-1">
                    <h2 className="text-xl font-bold text-slate-800 border-b border-amber-100 pb-3">
                        Ingredients
                    </h2>
                    <ul className="space-y-2.5">
                        {ingredients.map((item, index) => (
                            <li
                                key={index}
                                className="text-sm flex justify-between items-center text-slate-600 bg-amber-50/30 px-3 py-2 rounded-xl"
                            >
                                <span className="font-medium text-slate-700">{item.ingredient}</span>
                                <span className="text-slate-400 text-xs font-semibold ml-2">
                                    {item.measure}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Instructions Column */}
                <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-amber-100/60 space-y-4 md:col-span-2">
                    <h2 className="text-xl font-bold text-slate-800 border-b border-amber-100 pb-3">
                        Instructions
                    </h2>
                    <div className="text-slate-600 text-sm leading-relaxed space-y-4 whitespace-pre-line">
                        {meal.strInstructions}
                    </div>
                </div>
            </div>
        </div>
    );
}