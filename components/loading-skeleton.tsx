export default function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex justify-center">
        <div className="h-24 w-24 bg-gray-200 rounded-full"></div>
      </div>

      <div className="space-y-1">
        <div className="h-4 w-20 bg-gray-200 rounded"></div>
        <div className="h-10 w-full bg-gray-200 rounded mt-1"></div>
      </div>

      <div className="space-y-1">
        <div className="h-4 w-20 bg-gray-200 rounded"></div>
        <div className="h-10 w-full bg-gray-200 rounded mt-1"></div>
      </div>

      <div className="space-y-1">
        <div className="h-4 w-20 bg-gray-200 rounded"></div>
        <div className="h-32 w-full bg-gray-200 rounded mt-1"></div>
      </div>

      <div className="flex justify-end">
        <div className="h-10 w-32 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
