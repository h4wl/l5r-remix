



export default function Header({ }) {
    const headingElements = (typeof document !== "undefined")
        ? Array.from(
            document.querySelectorAll("h2, h3, h4")
          )
        : null;
    
    if (!headingElements) return null;

    return (
    <div>
        {headingElements.map((el, i) => 
            <div>{el.textContent}</div>
        )}
    </div>
  );
}
