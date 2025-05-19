'use client';

import React, { createContext, useContext, useState } from 'react';

type MyContextType = {
  count: number;
  increment: () => void;
};

const MyContext = createContext<MyContextType | undefined>(undefined);

const MyProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);

  return (
    <MyContext.Provider value={{ count, increment }}>
      {children}
    </MyContext.Provider>
  );
};

const Counter = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error('Counter must be used within a MyProvider');
  }

  return (
    <div className="flex flex-col items-center space-y-4 mt-10">
      <p className="text-xl">Сан: {context.count}</p>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        onClick={context.increment}
      >
        +1 қосу
      </button>
    </div>
  );
};

// 4. Басты бет
export default function HomePage() {
  return (
    <MyProvider>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Контекстпен санау</h1>
        <Counter />
      </div>
    </MyProvider>
  );
}
