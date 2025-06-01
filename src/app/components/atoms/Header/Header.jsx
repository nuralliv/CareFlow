"use client";

import React, { useEffect, useState } from "react";
import { auth, db } from "@/app/firebaseConfig";
import { onValue, ref } from "firebase/database";
import { useRouter } from "next/navigation";
import Image from "next/image";
import searchIcon from "@/app/images/search.svg";
import "./header.css";

const doctorsData = [
    "Ашимов Алмас",
    "Ашимова Айгерим",
    "Ахметова Аружан",
    "Алмасов Данияр",
    "Серикова Динара",
];

export default function Header({ className = "" } ) {
    const [userName, setUserName] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged((user) => {
            if (user) {
                const uid = user.uid;
                const doctorRef = ref(db, `doctors/${uid}/fullName`);
                onValue(
                    doctorRef,
                    (snapshot) => {
                        if (snapshot.exists()) {
                            const fullName = snapshot.val();
                            setUserName(fullName?.split(" ")[0] || null);
                            setUserRole("doctor");
                        } else {
                            const patientRef = ref(db, `patients/${uid}/fullName`);
                            onValue(patientRef, (snapPat) => {
                                if (snapPat.exists()) {
                                    const fullNamePat = snapPat.val();
                                    setUserName(fullNamePat?.split(" ")[0] || null);
                                    setUserRole("patient");
                                } else {
                                    setUserName(null);
                                    setUserRole(null);
                                }
                            });
                        }
                    },
                    { onlyOnce: true }
                );
            } else {
                setUserName(null);
                setUserRole(null);
            }
        });

        return () => unsubscribeAuth();
    }, []);

    const toggleDropdown = (name) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    // Универсальная функция навигации:
    // если юзер залогинен, идет на указанный путь
    // если нет — на страницу логина
    const navigate = (path) => {
        if (auth.currentUser) {
            router.push(path);
        } else {
            router.push("/pages/login");
        }
        setActiveDropdown(null); // закрываем дропдаун при переходе
    };

    return (
        <header className={`header ${className}`}>
            <div className="logo" onClick={() => router.push("/")}>
                CareFlow
            </div>

            <nav className="nav">
                {/* Про нас */}
                <div className="nav-item" onClick={() => navigate("/pages/about")}>
                    Про нас
                </div>

                {/* Новости */}
                <div className="nav-item" onClick={() => navigate("/pages/news")}>
                    Новости
                </div>

                {/* Сервисы с дропдауном */}
                <div
                    className="nav-item"
                    onClick={() => toggleDropdown("services")}
                    onMouseLeave={() => setActiveDropdown(null)}
                >
                    Сервисы <span>▾</span>
                    {activeDropdown === "services" && (
                        <div className="dropdown">
                            <div
                                className="dropdown-item"
                                onClick={() => navigate("/pages/services/cardiology")}
                            >
                                Кардиология
                            </div>
                            <div
                                className="dropdown-item"
                                onClick={() => navigate("/pages/services/neurology")}
                            >
                                Неврология
                            </div>
                            <div
                                className="dropdown-item"
                                onClick={() => navigate("/pages/services/therapy")}
                            >
                                Терапия
                            </div>
                            <div
                                className="dropdown-item"
                                onClick={() => navigate("/pages/services/gynecology")}
                            >
                                Гинекология
                            </div>
                        </div>
                    )}
                </div>

                {/* Докторы */}
                <div className="nav-item" onClick={() => navigate("/pages/doctors")}>
                    Докторы
                </div>

                {/* Поиск */}
                <div className="search-wrapper">
                    <Image src={searchIcon} alt="Поиск" className="search-icon" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                        placeholder="Искать услугу или доктора..."
                    />
                </div>
            </nav>

            {/* Профиль / Войти */}
            <div className="profile">
                {userName ? (
                    <div
                        className="user-profile"
                        onClick={() =>
                            navigate(
                                userRole === "doctor"
                                    ? "/pages/profile/Doctor"
                                    : "/pages/profile/Patient"
                            )
                        }
                    >
                        {userName} <span>▾</span>
                    </div>
                ) : (
                    <button className="register-btn" onClick={() => router.push("/pages/login")}>
                        Войти
                    </button>
                )}
            </div>
        </header>
    );
}
