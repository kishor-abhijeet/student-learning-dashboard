export default function Loading() {
  return (
    <div className="min-h-screen bg-obsidian px-4 py-6 md:pl-[6.25rem] lg:pl-72">
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-4">
        <div className="col-span-12 h-72 animate-pulse rounded-[2rem] border border-line bg-white/[0.06]" />
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="col-span-12 h-32 animate-pulse rounded-2xl border border-line bg-white/[0.05] sm:col-span-6 xl:col-span-3"
          />
        ))}
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="col-span-12 h-56 animate-pulse rounded-2xl border border-line bg-white/[0.05] md:col-span-6"
          />
        ))}
      </div>
    </div>
  );
}
