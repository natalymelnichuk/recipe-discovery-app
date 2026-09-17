import { useState, useEffect } from "react";
import { data, Link } from "react-router-dom";
import { useFavs } from "../hooks/useFavs";
import type { MealSummary } from "../types/meal";
import Spinner from "../components/Spinner";
import RecipeCard from "../components/RecipeCard";

export default function FavoritesPage() {
    const { favorites } = useFavs();
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
                const promises = favorites.map(async (id) => {
                    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                    const data = await res.json();
                    return data.meals ? data.meals[0] : null;
                });

                const results = await Promise.all(promises);
                setMeals(results.filter((meal): meal is MealSummary => meal !== null));
            } catch (err) {
                console.error("Failed to fetch favorite recipes:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchFavorites();
    }, [favorites]);

    if (loading || !data) return <Spinner />;

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
                    Back to Categories
                </Link>
            </div>

            {/* Recipes Grid using RecipeCard or Empty State */}
            {meals.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {meals.map((meal) => (
                        <RecipeCard key={meal.idMeal} meal={meal} />
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