import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-12 bg-gradient-to-br from-blue-50 to-blue-100">
      <main className="flex flex-col gap-8 items-center text-center">
        <h1 className="text-3xl sm:text-5xl font-bold text-blue-900">
          Медицина платформасы
        </h1>
        <p className="text-lg sm:text-xl text-blue-700 max-w-2xl">
          Клиникалар, дәрігерлер және пациенттер үшін ыңғайлы медициналық веб-сайт.
          Пациенттердің медициналық деректері мен тарихын оңай басқару.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 mt-8">
          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow transition duration-300"
          >
            Жүйеге кіру
          </Link>
          <Link
            href="/register"
            className="border-2 border-blue-600 hover:bg-blue-50 text-blue-600 font-semibold py-3 px-6 rounded-full shadow transition duration-300"
          >
            Тіркелу
          </Link>
        </div>
      </main>

      <footer className="mt-16 text-blue-500 text-sm">
        © {new Date().getFullYear()} Медицина Платформасы. Барлық құқықтар қорғалған.
      </footer>
    </div>
  );
}
