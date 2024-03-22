"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex items-center justify-center h-full flex-col gap-10 px-5">
            <h2 className="text-base-content md:text-5xl lg:text-7xl">Something went wrong:</h2>
            <h3 className="text-base-content md:text-2xl lg:text-3xl">{error.message}</h3>
            <button
            className="btn btn-primary"
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    );
}
