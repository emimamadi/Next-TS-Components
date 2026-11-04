export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-700">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-sky-600" />
        <p className="text-lg font-medium">Loading page...</p>
      </div>
    </div>
  );
}
