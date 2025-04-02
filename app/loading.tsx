import LoadingSkeleton from "@/components/loading-skeleton";

export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="h-10 w-48 bg-gray-200 rounded mb-6 animate-pulse"></div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <LoadingSkeleton />
      </div>
    </main>
  );
}
