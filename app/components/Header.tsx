import React from "react";

type HeaderProps = {
  setTocIsOpen: Function,
  tocIsOpen: boolean
  setBookMenuIsOpen: Function;
  bookMenuIsOpen: boolean;
}

export default function Header({ 
    setTocIsOpen,
    tocIsOpen,
    setBookMenuIsOpen,
    bookMenuIsOpen
} : HeaderProps) {
  return (
    <header className="flex items-center justify-between bg-slate-800 p-4 text-white sticky top-0 h-16 z-50  ">
        <button
        className="bg-green-600 text-white rounded px-4 py-1"
        onClick={() => setBookMenuIsOpen(!bookMenuIsOpen)}
      >
        book
      </button>
        {/* <img className="h-12" src="/img/l5c_logo_transparent-inverse.png"></img> */}
        <div className="sm:hidden">xs</div>
        <div className="hidden sm:block md:hidden">sm</div>
        <div className="hidden md:block lg:hidden">md</div>
        <div className="hidden lg:block xl:hidden">lg</div>
        <div className="hidden xl:block 2xl:hidden">xl</div>
        <div className="hidden 2xl:block">2xl</div>
        <button
        className="bg-green-600 text-white rounded px-4 py-1"
        onClick={() => setTocIsOpen(!tocIsOpen)}
      >
        ToC
      </button>
      </header>
  );
}
