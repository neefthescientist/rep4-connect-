import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold tracking-wide text-blue-600">
            REP4 CONNECT
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl">
            Your REP4 journey continues all year.
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Stay connected, discover opportunities, continue your projects,
            build relationships, serve your community, and grow your
            professional skills beyond the summer experience.
          </p>

          <div className="mt-10 flex gap-4">
            <Link
              href="/student"
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Student Dashboard
            </Link>

            <Link
              href="/student/journey"
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Explore REP4
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}