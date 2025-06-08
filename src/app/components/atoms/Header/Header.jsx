import React, { useEffect, useState } from "react";
import { auth, db } from "@/app/firebaseConfig";
import { onValue, ref } from "firebase/database";
import { useRouter } from "next/navigation";
import Image from "next/image";
import closeIcon from "@/app/images/x.svg";
import menuIcon from "@/app/images/burger.svg";
import downIcon from "@/app/images/down.svg";
import searchIcon from "@/app/images/search.svg";
import { signOut } from "firebase/auth"; // Import Firebase signOut method
import "./header.css";

const doctorsData = [
  "Ашимов Алмас",
  "Ашимова Айгерим",
  "Ахметова Аружан",
  "Алмасов Данияр",
  "Серикова Динара",
];

export default function Header() {
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = doctorsData.filter((name) =>
      name.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredDoctors(filtered);
  };

  const navigate = (path) => {
    if (auth.currentUser) {
      router.push(path);
    } else {
      router.push("/pages/login");
    }
  };

  const handleNavigate = (path) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    signOut(auth) // Sign out the user from Firebase
      .then(() => {
        router.push("/pages/login"); // Redirect to the login page after sign out
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <header className="header">
      <div className="logo" onClick={() => router.push("/")}>
        CareFlow
      </div>

      <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
        <div className="nav-item" onClick={() => handleNavigate("/pages/main")}>
          Главная
        </div>
        <div className="nav-item" onClick={() => router.push("/pages/Appointment/Notifications")}>
          Уведомления
        </div>
        <div className="nav-item" onClick={() => toggleDropdown("services")}>
          Сервисы <span className={`icon ${activeDropdown === "services" ? "rotate" : ""}`}>▾</span>
          {activeDropdown === "services" && (
            <div className="dropdown">
              <div className="dropdown-item" onClick={() => handleNavigate("/pages/specialties/Cardiology")}>
                Кардиология
              </div>
              <div className="dropdown-item" onClick={() => handleNavigate("/pages/specialties/Neurology")}>
                Неврология
              </div>
              <div className="dropdown-item" onClick={() => handleNavigate("/pages/specialties/Therapy")}>
                Терапия
              </div>
              <div className="dropdown-item" onClick={() => handleNavigate("/pages/specialties/Gynecology")}>
                Гинекология
              </div>
            </div>
          )}
        </div>
        <div className="nav-item" onClick={() => navigate("/pages/doctors")}>
          Докторы
        </div>
        <div className="search-wrapper">
          <Image src={searchIcon} alt="Поиск" className="search-icon" />
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
        {userName ? (
          <div
            className="user-profile"
            onClick={() => navigate("/pages/profile/")}
          >
            {userName} <span>▾</span>
          </div>
        ) : (
          <button className="register-btn" onClick={() => router.push("/pages/login")}>
            Войти
          </button>
        )}
      </div>

      <Image
        className="meny-icon"
        src={menuIcon}
        alt="Menu Icon"
        width={48}
        height={48}
        onClick={toggleMobileMenu}
      />

      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="mob-head">
            <div className="logo" onClick={() => router.push("/")}>
              CareFlow
            </div>
            <Image
              className="close-bnt"
              src={closeIcon}
              alt="Close icon"
              width={24}
              height={24}
              onClick={toggleMobileMenu}
            />
          </div>
          <div className="mobile-menu-con">
            <div className="profile">
              {userName ? (
                <div
                  className="user-profile"
                  onClick={() => navigate("/pages/profile/")}
                >
                  {userName} <span>▾</span>
                </div>
              ) : (
                <button className="register-btn" onClick={() => router.push("/pages/login")}>
                  Войти
                </button>
              )}
            </div>
            <div className="search-wrapper">
              <Image src={searchIcon} alt="Поиск" className="search-icon" />
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
            <div className="mob-nav">
              <div className="mob-nav-item" onClick={() => handleNavigate("/pages/main")}>
                Главная
              </div>
              <div className="mob-nav-item" onClick={() => handleNavigate("/pages/Appointment/Notifications")}>
                Уведомления
              </div>
              <div className="mob-nav-item" onClick={() => handleNavigate("/pages/doctors")}>
                Докторы
              </div>
              <div
                className={`mob-nav-item ${activeDropdown === "services" ? "open" : ""}`}
                onClick={() => toggleDropdown("services")}
              >
                <span>Сервисы</span>
                <Image
                  src={downIcon}
                  width={11}
                  height={5}
                  className={`down-icon ${activeDropdown === "services" ? "rotate" : ""}`}
                />
              </div>
              <div
                className="mob-nav-item last"
                onClick={handleLogout} // Add logout on click
              >
                Выход
              </div>
              <div className={`mob-dropdown ${activeDropdown === "services" ? "open" : ""}`}>
                <div className="dropdown-item" onClick={() => handleNavigate("/pages/specialties/Cardiology")}>
                  Кардиология
                </div>
                <div className="dropdown-item" onClick={() => handleNavigate("/pages/specialties/Neurology")}>
                  Неврология
                </div>
                <div className="dropdown-item" onClick={() => handleNavigate("/pages/specialties/Therapy")}>
                  Терапия
                </div>
                <div className="dropdown-item" onClick={() => handleNavigate("/pages/specialties/Gynecology")}>
                  Гинекология
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
