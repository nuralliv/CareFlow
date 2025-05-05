"use client";

import { useState } from "react";
import Link from "next/link";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-300">
      <div className="w-4/5 max-w-4xl flex shadow-lg rounded-md overflow-hidden">
        <div className="w-1/2 bg-gray-200 p-10">
          <h2 className="text-2xl font-bold mb-6 text-black">Добро пожаловать! Давайте начнём.</h2>
          <label className="block mb-2 text-black">Введите ваш email</label>
          <input
            className="w-full p-2 mb-4 border border-gray-400 rounded"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="block mb-2 text-black">Введите пароль</label>
          <input
            className="w-full p-2 mb-4 border border-gray-400 rounded"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex gap-2 mb-4">
            <input className="w-10 h-10 text-center border border-gray-400" maxLength={1} />
            <input className="w-10 h-10 text-center border border-gray-400" maxLength={1} />
            <input className="w-10 h-10 text-center border border-gray-400" maxLength={1} />
          </div>

          <p className="text-sm mb-4 text-black">
            Уже есть аккаунт? <Link href="/login" className="text-blue-600">Войти</Link>
          </p>

          <div className="flex gap-4">
            <button className="text-black bg-white px-4 py-2">Зарегистрироваться</button>
            <button className="text-black bg-white px-4 py-2">Отмена</button>
          </div>
        </div>

        <div className="w-1/2 bg-gray-300 flex flex-col items-center justify-center">
          <p className="text-black mb-4 text-2xl ">Я здесь, чтобы помогать</p>
          <div className="w-24 h-24 bg-white"></div>
        </div>
      </div>
    </div>
  );
}
