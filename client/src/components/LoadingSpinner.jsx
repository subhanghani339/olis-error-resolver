function LoadingSpinner({ size = "large", className = "" }) {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-6 h-6",
    large: "w-8 h-8",
    xlarge: "w-12 h-12"
  };

  if (size === "large") {
    return (
      <div className={`flex flex-col items-center justify-center py-16 ${className}`}>
        <div className="relative">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-500 text-sm mt-4">Loading resolution records...</p>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center ${className}`}>
      <div className={`${sizeClasses[size]} border-2 border-gray-200 border-t-current rounded-full animate-spin`}></div>
    </div>
  );
}

export default LoadingSpinner;
