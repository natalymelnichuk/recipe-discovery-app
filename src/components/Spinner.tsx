
export default function Spinner() {
    return (
        <div className="flex justify-center items-center min-h-[50vh]">
            <div className="text-lg text-amber-600 font-medium animate-pulse">
                Loading delicious recipes...
            </div>
        </div>
    );
}