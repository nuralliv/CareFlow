"use client";
import React, { useState } from "react";
import "./header.css";

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">CareFlow</div>
        <nav className="nav">
          <div className="nav-item" onClick={() => toggleDropdown("about")}>
            Про нас <span>▾</span>
          </div>
          <div className="nav-item" onClick={() => toggleDropdown("news")}>
            Новости <span>▾</span>
          </div>
          <div className="nav-item" onClick={() => toggleDropdown("services")}>
            Сервисы <span>▾</span>
            {activeDropdown === "services" && (
              <div className="dropdown">
                <div className="dropdown-item">Кардиология</div>
                <div className="dropdown-item">Неврология</div>
                <div className="dropdown-item">Терапия</div>
                <div className="dropdown-item">Гинекология</div>
              </div>
            )}
          </div>
          <div className="nav-item" onClick={() => toggleDropdown("doctors")}>
            Докторы <span>▾</span>
          </div>
          <input className="search-input" placeholder="Искать услугу или доктора..." />
        </nav>
      </div>
      <div className="header-right">
        
        <div className="profile">
          {/* <img src="/avatar.png" alt="avatar" className="avatar" /> */}
          <span>Alisher</span>
          <span>▾</span>
        </div>
      </div>
    </header>
  );
}
