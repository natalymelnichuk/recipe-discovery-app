
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import type { CategoriesResponse } from "../types/category";

export default function HomePage() {
    const { data, loading, error } = useFetch<CategoriesResponse>(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
    );

    if (loading) return <Spinner />;
    if (error) return <ErrorMessage message={error instanceof Error ? error.message : "Failed to load categories"} />;

    return (
        <div className="space-y-10 pb-16">
            {/* Hero Section */}
            <div className="text-center max-w-2xl mx-auto space-y-4 pt-8">
                <span className="px-4 py-1.5 text-xs font-bold tracking-wide uppercase bg-amber-100/80 text-amber-800 rounded-full shadow-sm">
                    Culinary Inspiration
                </span>
                <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
                    Discover Delicious Recipes
                </h1>
                <p className="text-slate-600 text-lg leading-relaxed">
                    Explore categories, find your next favorite meal, and cook something amazing today.
                </p>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data?.categories.map((category) => (
                    <Link
                        to={`/category/${category.strCategory}`}
                        key={category.idCategory}
                        className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-amber-100/60 flex flex-col items-center text-center group"
                    >
                        <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-amber-100/60 via-orange-50/40 to-rose-100/50 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300 p-2 shadow-inner">
                            <img
                                src={category.strCategoryThumb}
                                alt={category.strCategory}
                                className="w-full h-full object-contain drop-shadow-md"
                            />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-amber-700 transition-colors">
                            {category.strCategory}
                        </h2>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            {category.strCategoryDescription}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}