
import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

interface MealSummary {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

interface MealsResponse {
    meals: MealSummary[] | null;
}

export default function CategoryPage() {
    const { name } = useParams<{ name: string }>();

    const { data, loading, error } = useFetch<MealsResponse>(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`
    );

    if (loading || !data) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="text-lg text-amber-600 font-medium animate-pulse">
                    Loading recipes for {name}...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-10 text-rose-600 bg-rose-50/90 rounded-3xl p-6 max-w-md mx-auto border border-rose-100 shadow-sm">
                <p className="font-semibold">Oops! Something went wrong:</p>
                <p className="text-sm mt-1">{error instanceof Error ? error.message : String(error)}</p>
            </div>
        );
    }

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
                        <Link
                            to={`/recipe/${meal.idMeal}`}
                            key={meal.idMeal}
                            className="bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-amber-100/60 flex flex-col group"
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