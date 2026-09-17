
import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import type { MealsResponse } from "../types/meal";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import RecipeCard from "../components/RecipeCard";



export default function CategoryPage() {
    const { name } = useParams<{ name: string }>();

    const { data, loading, error } = useFetch<MealsResponse>(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`
    );

    if (loading || !data) return <Spinner />;
    if (error) return <ErrorMessage message={error instanceof Error ? error.message : "Failed to load categories"} />;
    

    return (
        <div className="space-y-10 pb-16">
            {/* Header / Back button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-b border-amber-100/60 pb-6">
                <div>
                    <span className="px-3.5 py-1 text-xs font-bold tracking-wide uppercase bg-amber-100/80 text-amber-800 rounded-full shadow-sm">
                        Category
                    </span>
                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-2">
                        {name} Recipes
                    </h1>
                </div>
                <Link
                    to="/"
                    className="px-5 py-2.5 rounded-2xl bg-white/80 hover:bg-white text-slate-700 font-medium text-sm shadow-sm border border-amber-100/60 transition-all duration-300 hover:shadow"
                >
                    Back to Categories
                </Link>
            </div>

            {/* Recipes Grid */}
            {data?.meals && data.meals.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {data.meals.map((meal) => (
                        <RecipeCard key={meal.idMeal} meal={meal} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 text-slate-500 bg-white/60 rounded-3xl p-6 max-w-md mx-auto border border-amber-100/60">
                    <p className="font-medium">No recipes found in this category.</p>
                </div>
            )}
            
        </div>
    );
}