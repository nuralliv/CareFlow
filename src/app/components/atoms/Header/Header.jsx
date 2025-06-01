"use client";
import React, { useState } from "react";
import "./header.css";
import Link from "next/link";
import Image from "next/image";
import searchIcon from "@/app/images/search.svg";

const doctorsData = [
    "Ашимов Алмас",
    "Ашимова Айгерим",
    "Ахметова Аружан",
    "Алмасов Данияр",
    "Серикова Динара",
];

export default function Header() {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredDoctors, setFilteredDoctors] = useState([]);

    const toggleDropdown = (name) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        const filtered = doctorsData.filter((name) =>
            name.toLowerCase().startsWith(value.toLowerCase())
        );
        setFilteredDoctors(filtered);
    };

    return (
        <header className="header">
            <div className="logo">
                <Link href="#">CareFlow</Link>
            </div>

            <nav className="nav">
                <div
                    className="nav-item"
                    onClick={() => toggleDropdown("about")}
                >
                    Про нас
                </div>
                <div
                    className="nav-item"
                    onClick={() => toggleDropdown("news")}
                >
                    Новости
                </div>
                <div
                    className="nav-item"
                    onClick={() => toggleDropdown("services")}
                >
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
                <div
                    className="nav-item"
                    onClick={() => toggleDropdown("doctors")}
                >
                    Докторы
                </div>

                <div className="search-wrapper">
                    <Image
                        src={searchIcon}
                        alt="search"
                        className="search-icon"
                    />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="search-input"
                        placeholder="Искать услугу или доктора..."
                    />
                    {searchTerm && filteredDoctors.length > 0 && (
                        <div className="search-results">
                            {filteredDoctors.map((doctor, index) => (
                                <div key={index} className="search-result-item">
                                    {doctor}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </nav>

            <div className="profile">
                <span className="loginBtn">Войти</span>
            </div>
        </header>
    );
}
