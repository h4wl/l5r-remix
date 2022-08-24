import { ReactNode } from "react";

type DrawerProps = {
  isOpen: boolean;
  setIsOpen: Function;
  direction: "left" | "right";
  header?: string;
  children?: ReactNode
}

export default function Drawer({ 
  children, 
  isOpen, 
  setIsOpen,
  direction,
  header
}: DrawerProps) {
  return (
    <aside
      className={
        " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0" +
        (isOpen
          ? "  translate-x-0 "
          : "  translate-x-full  ")
      }
    >
      <section
        className={
          ` w-screen md:max-w-sm ${direction}-0 absolute bg-white h-full shadow-xl duration-100 transition-all transform  ` +
          (isOpen 
            ? " translate-x-0 " 
            : (direction === "right" 
              ? " translate-x-full " 
              : " -translate-x-full ") )
        }
      >
        <article className="relative w-screen md:max-w-sm p-4 pb-10 mt-16 overflow-y-scroll h-[calc(100vh_-_4rem)] ">
          {header && <header className="pb-4 font-medium text-2xl">{header}</header>}
          {children}
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </aside>
  );
}
