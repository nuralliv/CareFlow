import React from "react";
import "./header.css";
import NavDropdown from "../NavDropdown/NavDropdown";

export default function Header() {
    return (
        <header className="header">
            <div className="logo">CareFlow</div>

            <nav className="nav-menu">
                <NavDropdown label="Сервисы" options={["Терапия", "Диагностика", "Стоматология"]} />
                <NavDropdown label="Сервисы" options={["Терапия", "Диагностика", "Стоматология"]} />
                <NavDropdown label="Сервисы" options={["Терапия", "Диагностика", "Стоматология"]} />
                <NavDropdown label="Сервисы" options={["Терапия", "Диагностика", "Стоматология"]} />
            </nav>

            <div className="profile">
                <span className="username">Alisher ▾</span>
            </div>
        </header>
    );
}
