
import { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import type { MealsResponse } from "../types/meal";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import RecipeCard from "../components/RecipeCard";

export default function SearchPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [query, setQuery] = useState("");

    
    const { data, loading, error } = useFetch<MealsResponse>(
        query ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}` : ''
    );

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setQuery(searchTerm.trim());
    };

    return (
        <div className="space-y-10 pb-16">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-b border-amber-100/60 pb-6">
                <div>
                    <span className="px-3.5 py-1 text-xs font-bold tracking-wide uppercase bg-amber-100/80 text-amber-800 rounded-full shadow-sm">
                        Discover
                    </span>
                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-2">
                        Search Recipes
                    </h1>
                </div>
                <Link
                    to="/"
                    className="px-5 py-2.5 rounded-2xl bg-white/80 hover:bg-white text-slate-700 font-medium text-sm shadow-sm border border-amber-100/60 transition-all duration-300 hover:shadow"
                >
                    Back to Categories
                </Link>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-3">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for recipes (e.g., chicken, pasta, pie)..."
                    className="flex-grow px-5 py-3.5 rounded-2xl bg-white/95 border border-amber-100/80 text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
                />
                <button
                    type="submit"
                    className="px-7 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-medium shadow-sm transition-all cursor-pointer flex items-center justify-center"
                >
                    Search
                </button>
            </form>

            {/* Results Section */}
            {loading && <Spinner />}
            {error && <ErrorMessage message={error instanceof Error ? error.message : "Failed to search recipes."} />}

            {!loading && !error && query && (
                data?.meals && data.meals.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {data.meals.map((meal) => (
                            <RecipeCard key={meal.idMeal} meal={meal} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 text-slate-500 bg-white/60 rounded-3xl p-8 max-w-md mx-auto border border-amber-100/60 space-y-3">
                        <div className="text-4xl">🔍</div>
                        <p className="font-semibold text-slate-700 text-lg">No recipes found</p>
                        <p className="text-sm text-slate-500">
                            We couldn't find anything matching "{query}". Try searching for something else!
                        </p>
                    </div>
                )
            )}

            {!query && (
                <div className="text-center py-16 text-slate-400 bg-white/40 rounded-3xl p-8 max-w-md mx-auto border border-amber-100/40">
                    <p className="font-medium text-slate-600">Type a keyword above to start searching for delicious recipes!</p>
                </div>
            )}
        </div>
    );
}