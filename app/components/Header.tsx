import React from "react";

type HeaderProps = {
    setIsOpen: Function
}

export default function Header({ 
    setIsOpen 
} : HeaderProps) {
  return (
    <header className="flex items-center justify-between bg-slate-800 p-4 text-white sticky top-0 h-16 ">
        <h1 className="text-3xl font-bold">
          L5r
        </h1>
        <h2>test</h2>
        <button
        className="bg-green-600 text-white rounded px-4 py-1"
        onClick={() => setIsOpen(true)}
      >
        open
      </button>
      </header>
  );
}
