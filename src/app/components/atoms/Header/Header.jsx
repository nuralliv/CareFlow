
import { useState } from "react";
import DropdownMenu from "../NavDropdown/DropdownMenu";
import "./header.css"
export default function Header() {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuToggle = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const doctorsCategories = [
    {
      title: "Кардиология",
      items: [
        "Кардиолог",
        "Детский кардиолог",
        "Кардиохирург",
        "Интервенционный кардиолог",
        "Электрофизиолог",
        "Реабилитолог после инфаркта",
      ],
    },
    {
      title: "Неврология",
      items: [
        "Невролог",
        "Детский невролог",
        "Нейрохирург",
        "Вертебролог",
        "Нейрореабилитолог",
        "Психоневролог",
      ],
    },
    {
      title: "Терапия",
      items: [
        "Терапевт",
        "Семейный врач",
        "Врач общей практики",
        "Гериатр (врач для пожилых)",
        "Аллерголог-иммунолог",
        "Кардиолог-терапевт",
      ],
    },
    {
      title: "Гинекология",
      items: [
        "Гинеколог",
        "Акушер-гинеколог",
        "Репродуктолог (специалист по бесплодию)",
        "Гинеколог-эндокринолог",
        "Онкогинеколог",
        "Детский гинеколог",
      ],
    },
  ];

  const servicesCategories = [
    {
      title: "Кардиология",
      items: [],
    },
    {
      title: "Неврология",
      items: [],
    },
    {
      title: "Терапия",
      items: [],
    },
    {
      title: "Гинекология",
      items: [],
    },
  ];

  return (
    <header className="header">
      <div className="logo">CareFlow</div>
      <nav className="nav">
        {["Про нас", "Новости"].map((item, idx) => (
          <div key={idx} className="navItem">
            <button className="navButton">{item}</button>
          </div>
        ))}

        <div
          className="navItem"
          onMouseEnter={() => handleMenuToggle("Сервисы")}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <button className="navButton">
            Сервисы{" "}
            <span className={activeMenu === "Сервисы" ? "arrowUp" : "arrowDown"}>▾</span>
          </button>
          {activeMenu === "Сервисы" && <DropdownMenu categories={servicesCategories} />}
        </div>

        <div
          className="navItem"
          onMouseEnter={() => handleMenuToggle("Докторы")}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <button className="navButton">
            Докторы{" "}
            <span className={activeMenu === "Докторы" ? "arrowUp" : "arrowDown"}>▾</span>
          </button>
          {activeMenu === "Докторы" && <DropdownMenu categories={doctorsCategories} />}
        </div>
      </nav>
      
      <div className="searchUser">
        <input
          type="text"
          placeholder="Искать услугу или доктора..."
          className="searchInput"
        />
        <div className="user">
          {/* <img src="/avatar.png" alt="User" className="avatar" /> */}
          <span>Alisher ▾</span>
        </div>
      </div>
    </header>
  );
}
