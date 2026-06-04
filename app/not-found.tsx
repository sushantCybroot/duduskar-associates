import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-dark-950 px-4 text-white">
      <div className="max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-500">404</p>
        <h1 className="mt-4 text-5xl">Page not found</h1>
        <p className="text-gray-300">
          The page you are looking for may have moved or is no longer available.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-gold-500 px-6 py-3 font-semibold text-dark-950"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
