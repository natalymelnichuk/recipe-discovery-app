
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFavs } from "../hooks/useFavs";
import { createSlug } from "../utils/slugify";
import type { MealSummary } from "../types/meal";



export default function FavoritesPage() {
    const { favorites, removeFavorite } = useFavs();
    const [meals, setMeals] = useState<MealSummary[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchFavorites() {
            if (favorites.length === 0) {
                setMeals([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                // Запрашиваем каждый любимый рецепт по его ID паралелльно
                const promises = favorites.map(async (id) => {
                    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                    const data = await res.json();
                    return data.meals ? data.meals[0] : null;
                });

                const results = await Promise.all(promises);
                // Фильтруем на случай, если какой-то рецепт не нашелся
                setMeals(results.filter((meal): meal is MealSummary => meal !== null));
            } catch (err) {
                console.error("Failed to fetch favorite recipes:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchFavorites();
    }, [favorites]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="text-lg text-amber-600 font-medium animate-pulse">
                    Loading your favorite recipes...
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-10 pb-16">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-b border-amber-100/60 pb-6">
                <div>
                    <span className="px-3.5 py-1 text-xs font-bold tracking-wide uppercase bg-rose-100/80 text-rose-800 rounded-full shadow-sm">
                        Saved Collection
                    </span>
                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-2">
                        Favorite Recipes ({favorites.length})
                    </h1>
                </div>
                <Link
                    to="/"
                    className="px-5 py-2.5 rounded-2xl bg-white/80 hover:bg-white text-slate-700 font-medium text-sm shadow-sm border border-amber-100/60 transition-all duration-300 hover:shadow"
                >
                    ← Back to Categories
                </Link>
            </div>

            {/* Recipes Grid or Empty State */}
            {meals.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {meals.map((meal) => (
                        <div
                            key={meal.idMeal}
                            className="bg-white/95 backdrop-blur-md rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-amber-100/60 flex flex-col group relative"
                        >
                            {/* Кнопка быстрого удаления прямо с карточки */}
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    removeFavorite(meal.idMeal);
                                }}
                                title="Remove from favorites"
                                className="absolute top-3 right-3 z-10 w-9 h-9 bg-white/90 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-full flex items-center justify-center shadow-sm border border-amber-100/60 transition-colors cursor-pointer"
                            >
                                ❤️
                            </button>

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
                                        View Recipe →
                                    </span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 text-slate-500 bg-white/60 rounded-3xl p-8 max-w-md mx-auto border border-amber-100/60 space-y-4">
                    <div className="text-4xl">🍳</div>
                    <p className="font-semibold text-slate-700 text-lg">Your favorites list is empty</p>
                    <p className="text-sm text-slate-500">
                        Explore categories, find something delicious, and click the heart icon to save it here!
                    </p>
                    <Link
                        to="/"
                        className="inline-block mt-2 px-6 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm shadow-sm transition-all"
                    >
                        Explore Recipes
                    </Link>
                </div>
            )}
        </div>
    );
}