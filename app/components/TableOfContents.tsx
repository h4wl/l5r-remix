import { Link } from "@remix-run/react";

const getClassName = (tagName: string) => {
  switch (tagName) {
    case "H2":
      return "ml-3";
    case "H3":
      return "ml-6";
    case "H4":
      return "ml-9";
    default:
      return "";
  }
};

type TableOfContentsProps = {
  setIsOpen: Function;
};

export default function TableOfContents({ setIsOpen }: TableOfContentsProps) {
  const headingElements =
    typeof document !== "undefined" && document.querySelector("article")
      ? Array.from(
          document.querySelector("article")!.querySelectorAll("h2, h3, h4")
        )
      : null;

  if (!headingElements) return null;

  const tocElement =
    typeof document !== "undefined" && document.querySelector("nav.toc");
  if (!tocElement) return null;

  return (
    <nav className="flex flex-col">
      {headingElements.map((el, i) => {
        return (
          <Link to={`#${el.id}`} onClick={() => setIsOpen(false)} className={getClassName(el.tagName)} key={i}>
            {el.textContent}
          </Link>
        );
      })}
    </nav>
  );
}
