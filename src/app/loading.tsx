export default function Loading() {
  return (
    <div className="p-4 flex flex-col space-y-4 max-w-4xl mx-auto animate-pulse">
      {/* Header */}
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-md w-3/4"></div>

      {/* Card Skeletons */}
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4"
          >
            {/* Image Skeleton */}
            <div className="w-full md:w-1/3 h-32 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            {/* Text Skeleton */}
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-md w-5/6"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-md w-4/6"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-md w-3/6"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-md w-1/2 mx-auto"></div>
    </div>
  );
}
