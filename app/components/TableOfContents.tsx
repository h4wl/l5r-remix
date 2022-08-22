



export default function TableOfContents({ }) {
    const headingElements = (typeof document !== "undefined" && document.querySelector("article"))
        ? Array.from(
            document.querySelector("article")!.querySelectorAll("h2, h3, h4")
          )
        : null;
    
    if (!headingElements) return null;

    const tocElement = (typeof document !== "undefined" && document.querySelector("nav.toc"));
    if (!tocElement) return null;

    return (
    <div>
        {headingElements.map((el, i) => 
            <div>{el.textContent}</div>
        )}
    </div>
  );
}
