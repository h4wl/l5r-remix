import React from "react";
import { BookOpenIcon, ListBulletIcon } from "@heroicons/react/24/outline";
import { Link } from "@remix-run/react";
type HeaderProps = {
  setTocIsOpen: Function;
  tocIsOpen: boolean;
  setBookMenuIsOpen: Function;
  bookMenuIsOpen: boolean;
};

export default function Header({
  setTocIsOpen,
  tocIsOpen,
  setBookMenuIsOpen,
  bookMenuIsOpen,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between bg-slate-800 p-4 text-white  ">
      <div
        className="visible xl:invisible"
        onClick={() => setBookMenuIsOpen(!bookMenuIsOpen)}
      >
        <BookOpenIcon className="h-9 w-9" />
      </div>

      <Link to="/">
        <img className="h-12" src="/img/l5c_logo_transparent-inverse.png"></img>
      </Link>

      {/* <div className="sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden">sm</div>
      <div className="hidden md:block lg:hidden">md</div>
      <div className="hidden lg:block xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div> */}

      <div
        className="visible lg:invisible"
        onClick={() => setTocIsOpen(!tocIsOpen)}
      >
        <ListBulletIcon className="h-9 w-9" />
      </div>
    </header>
  );
}
