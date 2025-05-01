import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      <header className="bg-white border-b px-10 py-2 flex justify-between items-center text-sm">
        <div className="flex gap-4">
          <span className="text-gray-500">Название и лого проекта</span>
          <span className="text-gray-500">Местоположение: Тараз</span>
        </div>
        <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Поиск лекарств и медуслуг"
            className="w-full px-10 py-1 border rounded-full text-sm"
          />
        </div>
        <div className="flex gap-4 items-center">
          <span>KZ</span>
          <span className="font-semibold">Nurzhan Sagyndy</span>
        </div>
      </header>

      <nav className="bg-gray-200 px-10 py-2 flex flex-wrap gap-2 text-sm font-medium">
        <button className="bg-white px-3 py-1 rounded shadow">Поиск лекарств</button>
        <button className="bg-white px-3 py-1 rounded shadow">Клиники</button>
        <button className="bg-white px-3 py-1 rounded shadow">Стоматологи</button>
        <button className="bg-white px-3 py-1 rounded shadow">Врачи</button>
        <button className="bg-white px-3 py-1 rounded shadow">Онлайн прием</button>
        <button className="bg-white px-3 py-1 rounded shadow">Аптеки</button>
        <button className="bg-white px-3 py-1 rounded shadow">Детям</button>
        <button className="bg-white px-3 py-1 rounded shadow">Товары</button>
      </nav>

      <section className="px-10 py-6">
        <h2 className="text-lg font-semibold mb-4">Популярное</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center text-sm">
          <div className="bg-gray-300 h-24 rounded">Поиск лекарства</div>
          <div className="bg-gray-300 h-24 rounded">Офтальмолог</div>
          <div className="bg-gray-300 h-24 rounded">Лор</div>
          <div className="bg-gray-300 h-24 rounded">Невролог</div>
          <div className="bg-gray-300 h-24 rounded">Трихолог</div>
        </div>
      </section>

      <section className="px-10">
        <div className="relative bg-gray-300 h-70 rounded flex items-center justify-center text-center text-xl font-medium">
          <button className="absolute left-2 bg-white rounded-full px-2">&#8592;</button>
          Майские скидки в честь праздников. Успей воспользоваться!
          <button className="absolute right-2 bg-white rounded-full px-2">&#8594;</button>
        </div>
      </section>

      <section className="px-10 py-6">
        <h2 className="text-lg font-semibold mb-4">Ваш врач</h2>
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 text-center text-sm">
          <div className="bg-gray-300 h-24 rounded">Гинеколог</div>
          <div className="bg-gray-300 h-24 rounded">Аллерголог</div>
          <div className="bg-gray-300 h-24 rounded">Гастроэнтеролог</div>
          <div className="bg-gray-300 h-24 rounded">Стоматолог</div>
          <div className="bg-gray-300 h-24 rounded">Психотерапевт</div>
          <div className="bg-gray-300 h-24 rounded">Хирург</div>
        </div>
      </section>

      <section className="px-10 py-6">
        <h2 className="text-lg font-semibold mb-4">Скидки и акции</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm">
          {["Бесплатная диагностика", "Скидка 50% на протезирование", "Скидка 50% на прием терапевта", "Скидка до 53% на художественные виниры"].map((text, i) => (
            <div key={i} className="bg-white p-3 rounded shadow">
              <div className="bg-gray-300 h-24 rounded mb-2"></div>
              <p className="font-medium">Стоматологическая клиника "Demokrat&quot;</p>
              <p className="text-gray-700 mt-1">{text}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <button className="text-blue-600 hover:underline">Читать еще</button>
        </div>
      </section>

      <footer className="bg-white px-10 py-6 text-sm text-gray-600 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t">
        <div>
          <h3 className="font-semibold mb-2">Диагностика</h3>
          <ul className="space-y-1">
            <li>Лабораторные анализы</li>
            <li>УЗИ диагностика</li>
            <li>Рентген</li>
            <li>КТ</li>
            <li>МРТ</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Стоматология</h3>
          <ul className="space-y-1">
            <li>Брекеты</li>
            <li>Виниры</li>
            <li>Цены на услуги</li>
            <li>Отбеливание зубов</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Диагностика</h3>
          <ul className="space-y-1">
            <li>КТ и МРТ</li>
            <li>Рентген</li>
            <li>УЗИ диагностика</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Стоматология</h3>
          <ul className="space-y-1">
            <li>Виниры</li>
            <li>Клиники в Алматы</li>
          </ul>
        </div>
      </footer>

      <div className="flex flex-wrap justify-center gap-4 p-6 bg-gray-100 border-t">
        <button className="border border-gray-400 rounded px-10 py-2 text-sm">+ Добавить компанию</button>
        <button className="border border-gray-400 rounded px-10 py-2 text-sm">+ Добавить специалиста</button>
        <button className="border border-gray-400 rounded px-10 py-2 text-sm">+ Добавить аптеку</button>
      </div>
    </div>
  );
}
