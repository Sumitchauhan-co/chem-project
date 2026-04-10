import React from "react";

const Loader: React.FC = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="flex items-center justify-center">
                <svg
                    className="h-10 w-10 animate-loader-spin"
                    viewBox="0 0 50 50"
                >
                    <circle
                        className="animate-loader-dash stroke-blue-600"
                        cx="25"
                        cy="25"
                        r="20"
                        fill="none"
                        strokeWidth="5"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
        </div>
    );
};

export default Loader;
