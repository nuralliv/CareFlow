import "../Header/header.css"

export default function DropdownMenu({ isMobile, categories }) {
  return (
    <div className={`dropdown ${isMobile ? "dropdownMobile" : ""}`}>
      {categories.map((column, index) => (
        <div key={index} className="dropdownColumn">
          <strong>{column.title}</strong>
          <ul>
            {column.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
