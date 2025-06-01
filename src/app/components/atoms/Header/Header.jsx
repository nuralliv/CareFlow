"use client";

import React, { useState, useEffect } from "react";
import { auth, db } from "@/app/firebaseConfig";
import { onValue, ref } from "firebase/database";
import { useRouter } from "next/navigation";
import "./header.css";

export default function Header() {
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'doctor' или 'patient'
  const router = useRouter();

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const uid = user.uid;

        // Сначала попробуем получить имя из doctors
        const doctorRef = ref(db, `doctors/${uid}/fullName`);
        onValue(
          doctorRef,
          (snapshot) => {
            if (snapshot.exists()) {
              const fullName = snapshot.val();
              setUserName(fullName ? fullName.split(" ")[0] : null);
              setUserRole("doctor");
            } else {
              // Если нет в докторах, проверяем в patients
              const patientRef = ref(db, `patients/${uid}/fullName`);
              onValue(patientRef, (snapPat) => {
                if (snapPat.exists()) {
                  const fullNamePat = snapPat.val();
                  setUserName(fullNamePat ? fullNamePat.split(" ")[0] : null);
                  setUserRole("patient");
                } else {
                  // Имя не найдено
                  setUserName(null);
                  setUserRole(null);
                }
              });
            }
          },
          { onlyOnce: true }
        );
      } else {
        // Нет юзера
        setUserName(null);
        setUserRole(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Универсальная функция для проверки авторизации и навигации
  const navigate = (path) => {
    if (auth.currentUser) {
      router.push(path);
    } else {
      router.push("/pages/login");
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo" onClick={() => router.push("/")}>CareFlow</div>
        <nav className="nav">
          <div className="nav-item" onClick={() => navigate("/about")}>
            Про нас <span>▾</span>
          </div>
          <div className="nav-item" onClick={() => navigate("/news")}>
            Новости <span>▾</span>
          </div>
          <div className="nav-item" onClick={() => navigate("/services")}>
            Сервисы <span>▾</span>
          </div>
          <div className="nav-item" onClick={() => navigate("/doctors")}>
            Докторы <span>▾</span>
          </div>
          <input
            className="search-input"
            placeholder="Искать услугу или доктора..."
            onClick={() => {
              if (!auth.currentUser) {
                router.push("/pages/login");
              }
            }}
            readOnly
          />
        </nav>
      </div>
      <div className="header-right">
        {userName ? (
          <div className="profile" onClick={() => navigate("/pages/profile/Doctor")}>
            <span>{userName}</span>
            <span>▾</span>
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
