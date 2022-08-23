import React from "react";

type HeaderProps = {
    setIsOpen: Function,
    isOpen: boolean
}

export default function Header({ 
    setIsOpen,
    isOpen
} : HeaderProps) {
  return (
    <header className="flex items-center justify-between bg-slate-800 p-4 text-white sticky top-0 h-16 z-50  ">
        <h1 className="text-3xl font-bold">
          L5r
        </h1>
        <img className="h-12" src="/img/l5c_logo_transparent-inverse.png"></img>
        <button
        className="bg-green-600 text-white rounded px-4 py-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        open
      </button>
      </header>
  );
}
