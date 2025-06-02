  "use client";

  import React, { useEffect, useState } from "react";
  import { auth, db } from "@/app/firebaseConfig";
  import { onValue, ref } from "firebase/database";
  import { useRouter } from "next/navigation";
  import Link from "next/link";
  import Image from "next/image";
  import searchIcon from "@/app/images/search.svg";
  import "./header.css";

  import AppointmentModal from "@/app/pages/Appointment/page";

  const doctorsData = [
    "Ашимов Алмас",
    "Ашимова Айгерим",
    "Ахметова Аружан",
    "Алмасов Данияр",
    "Серикова Динара",
  ];

  export default function Header() {
    // const [isModalOpen, setModalOpen] = useState(false);

    const [isModalOpen, setModalOpen] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);

    const [userName, setUserName] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredDoctors, setFilteredDoctors] = useState([]);
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
  };


    return (
      <header className="header">
        <div className="logo" onClick={() => router.push("/")}>
          CareFlow
        </div>

        <nav className="nav">

         


          <div className="nav-item" onClick={() => toggleDropdown("news")}>
            Новости
          </div>

          <div className="nav-item" onClick={() => router.push("/pages/Appointment/Notifications")}>
        Уведомления
      </div>

          <div className="nav-item" onClick={() => toggleDropdown("services")}>
            Сервисы <span>▾</span>
            {activeDropdown === "services" && (
              <div className="dropdown">
      <div
        className="dropdown-item"
        onClick={() => handleNavigate("/pages/specialties/Cardiology")}
      >
        Кардиология
      </div>
      <div
        className="dropdown-item"
        onClick={() => handleNavigate("/pages/specialties/Neurology")}
      >
        Неврология
      </div>
      <div
        className="dropdown-item"
        onClick={() => handleNavigate("/pages/specialties/Therapy")}
      >
        Терапия
      </div>
      <div
        className="dropdown-item"
        onClick={() => handleNavigate("/pages/specialties/Gynecology")}
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
              onClick={() =>
                  navigate(
                      userRole === "doctor"
                          ? "/pages/profile/"
                          : "/pages/profile/"
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
      {isModalOpen && (
    <AppointmentModal
      onClose={() => setModalOpen(false)}
      setSuccessModal={() => {
        setSuccessModal(true);
        setModalOpen(false); 
      }}
      setCancelModal={() => {
        setCancelModal(true);
        setModalOpen(false);
      }}
    />
  )}

  {successModal && (
    <SuccessModal onClose={() => setSuccessModal(false)} />
  )}

  {cancelModal && (
    <CancelModal onClose={() => setCancelModal(false)} />
  )}
        
      </header>
      
    );
  }
