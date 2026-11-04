export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sky-50">
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-8 shadow-md">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-200 border-t-sky-600" />
        <p className="text-base font-semibold text-slate-700">Loading tamrin data...</p>
      </div>
    </div>
  );
}
