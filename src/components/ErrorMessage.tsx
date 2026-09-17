
interface ErrorMessageProps {
    message?: string;
}

export default function ErrorMessage({ message = "Could not load data." }: ErrorMessageProps) {
    return (
        <div className="text-center py-10 text-rose-600 bg-rose-50/95 rounded-3xl p-6 max-w-md mx-auto border border-rose-100 shadow-sm">
            <p className="font-semibold">Oops! Something went wrong:</p>
            <p className="text-sm mt-1">{message}</p>
        </div>
    );
}