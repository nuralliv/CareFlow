"use client";
import React, { useEffect, useState, useMemo } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/app/firebaseConfig";
import Header from "@/app/components/atoms/Header/Header";
import Footer from "@/app/components/atoms/Footer/Footer";
import Image from "next/image";
import { useRouter } from "next/navigation";
import phoneIcon from "@/app/images/HealthcareCall.svg";
import search from "@/app/images/sea.svg";
import Overlay from "@/app/images/Overlay.svg";
import "./doctors.css";
import ProfileModal from "../profile/ProfileModal/page";

const ITEMS_PER_PAGE = 5;

export default function DoctorsPage() {
    const [doctorsData, setDoctorsData] = useState([]);
    const [selectedDirection, setSelectedDirection] = useState(null);
    const [selectedSpecialist, setSelectedSpecialist] = useState(null);
    const [selectedSorting, setSelectedSorting] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [openDropdown, setOpenDropdown] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const doctorsRef = ref(db, "doctors");
        const unsubscribe = onValue(doctorsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const doctorsList = Object.entries(data).map(([key, doc]) => ({
                    id: key,
                    name: doc.fullName || "",
                    experience: doc.experience || "",
                    specialties: doc.speciality ? [doc.speciality] : [],
                    // reviews: doc.reviews || 0,
                    reviews: doc.reviewsList
                        ? Object.keys(doc.reviewsList).length
                        : 0,
                    rating: doc.rating || 0,
                    priceOld: doc.priceOld || "",
                    priceNew: doc.priceNew || "",
                    clinicName: doc.location || "",
                    clinicAddress: doc.address || "",
                    workDirection: doc.workDirection || "",
                    avatarUrl: doc.avatarBase64 || "",
                }));
                setDoctorsData(doctorsList);
            } else {
                setDoctorsData([]);
            }
        });
        return () => unsubscribe();
    }, []);

    const filteredDoctors = useMemo(() => {
        let filtered = doctorsData;

        if (searchTerm.trim() !== "") {
            filtered = filtered.filter((d) =>
                d.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
            );
        }
        if (selectedDirection) {
            filtered = filtered.filter((d) =>
                d.workDirection
                    .toLowerCase()
                    .includes(selectedDirection.toLowerCase())
            );
        }

        if (selectedSpecialist) {
            filtered = filtered.filter((d) =>
                d.specialties.some((s) =>
                    s.toLowerCase().includes(selectedSpecialist.toLowerCase())
                )
            );
        }

        if (selectedSorting) {
            if (selectedSorting === "Много отзывов") {
                filtered = filtered
                    .slice()
                    .sort((a, b) => b.reviews - a.reviews);
            } else if (selectedSorting === "Высокие оценки") {
                filtered = filtered.slice().sort((a, b) => b.rating - a.rating);
            } else if (selectedSorting === "Большой стаж") {
                const getYears = (exp) => parseInt(exp.match(/\d+/));
                filtered = filtered
                    .slice()
                    .sort(
                        (a, b) =>
                            getYears(b.experience) - getYears(a.experience)
                    );
            } else if (selectedSorting === "Сначала дешевле") {
                const parsePrice = (price) => Number(price.replace(/\D/g, ""));
                filtered = filtered
                    .slice()
                    .sort(
                        (a, b) =>
                            parsePrice(a.priceNew) - parsePrice(b.priceNew)
                    );
            }
        }
        return filtered;
    }, [
        doctorsData,
        searchTerm,
        selectedDirection,
        selectedSpecialist,
        selectedSorting,
    ]);

    const totalPages = Math.ceil(filteredDoctors.length / ITEMS_PER_PAGE);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedDirection, selectedSpecialist, selectedSorting]);

    const paginatedDoctors = filteredDoctors.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const toggleDropdown = (name) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    const handleSelectDoctor = (doctorId) => {
        router.push(`/pages/profile/Doctor?id=${doctorId}`);
    };

    return (
        <div className="flex flex-col">
            <Header />
            <div className="doctors-page-container">
                <h1 className="page-title">Врач акушер-гинеколог в Таразе</h1>
                <p className="page-subtitle">
                    Лучшие акушер-гинекологи в Таразе – цены, отзывы. Записаться
                    онлайн и проконсультироваться
                </p>

                <div className="filters-row">
                    <div className="input-con">
                        <Image
                            className="imad"
                            src={search}
                            alt="search"
                            width={24}
                            height={24}
                        />
                        <input
                            className="sea"
                            type="text"
                            placeholder="Искать доктора"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filters">
                        <FilterDropdown
                            title="Направление"
                            options={[
                                "Кардиология",
                                "Неврология",
                                "Терапия",
                                "Гинекология",
                            ]}
                            selected={selectedDirection}
                            setSelected={setSelectedDirection}
                            openDropdown={openDropdown}
                            toggleDropdown={toggleDropdown}
                            name="direction"
                        />
                        <FilterDropdown
                            title="Специалист"
                            options={["Акушер", "Кардиологи", "Доктор"]}
                            selected={selectedSpecialist}
                            setSelected={setSelectedSpecialist}
                            openDropdown={openDropdown}
                            toggleDropdown={toggleDropdown}
                            name="specialist"
                        />
                        <FilterDropdown
                            title="Сортировать"
                            options={[
                                "Много отзывов",
                                "Высокие оценки",
                                "Большой стаж",
                                "Сначала дешевле",
                            ]}
                            selected={selectedSorting}
                            setSelected={setSelectedSorting}
                            openDropdown={openDropdown}
                            toggleDropdown={toggleDropdown}
                            name="sorting"
                        />
                    </div>
                </div>

                <div className="doctors-list">
                    {paginatedDoctors.map((doctor) => (
                        <DoctorCard
                            key={doctor.id}
                            doctor={doctor}
                            onSelect={handleSelectDoctor}
                        />
                    ))}
                </div>

                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
            <Footer />
        </div>
    );
}

function FilterDropdown({
    title,
    options,
    selected,
    setSelected,
    openDropdown,
    toggleDropdown,
    name,
}) {
    const isOpen = openDropdown === name;

    const onSelect = (option) => {
        setSelected(option === selected ? null : option);
        toggleDropdown(null);
    };

    return (
        <div className="filter-dropdown">
            <button
                className="filter-button"
                onClick={() => toggleDropdown(name)}
            >
                {selected ?? title} ▼
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    {options.map((option) => (
                        <div
                            key={option}
                            className={`dropdown-item ${
                                selected === option ? "selected" : ""
                            }`}
                            onClick={() => onSelect(option)}
                        >
                            {selected === option && "✓ "} {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function getReviewWord(count) {
    const mod10 = count % 10;
    const mod100 = count % 100;

    if (mod10 === 1 && mod100 !== 11) return "отзыв";
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "отзыва";
    return "отзывов";
}

function DoctorCard({ doctor, onSelect }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDateClick = (date) => setSelectedDate(date);
    const handleTimeClick = (time) => setSelectedTime(time);

    const handleAppointment = async () => {
        if (!selectedDate || !selectedTime || !auth.currentUser) {
            alert("Выберите дату и время");
            return;
        }

        const appointmentData = {
            doctorId: doctor.id,
            doctorName: doctor.fullName,
            userId: auth.currentUser.uid,
            date: selectedDate,
            time: selectedTime,
            status: "ожидает подтверждения",
            createdAt: new Date().toISOString(),
        };

        try {
            const appointmentsRef = ref(db, "appointments");
            await push(appointmentsRef, appointmentData);
            alert("Запись успешно создана!");
            setIsModalOpen(false);
            setSelectedDate(null);
            setSelectedTime(null);
        } catch (error) {
            console.error("Ошибка при записи:", error);
            alert("Не удалось записаться. Попробуйте позже.");
        }
    };

    return (
        <div className="doctor-card">
            <div className="doctor-top flex">
                <div className="doc-left">
                    <div className="flex flex-col gap-[10px]">
                        <div className="avatar-container">
                            {doctor.avatarUrl ? (
                                <img
                                    src={doctor.avatarUrl}
                                    alt={doctor.name}
                                    className="avatar"
                                    onClick={() => onSelect(doctor.id)}
                                />
                            ) : (
                                <div className="avatar-placeholder" />
                            )}
                        </div>
                        <div className="reviews-rating">
                            <span>
                                {doctor.reviews} {getReviewWord(doctor.reviews)}
                            </span>

                            <span>
                                ★ {Number(doctor.rating || 0).toFixed(1)}
                            </span>
                        </div>
                    </div>
                    <div className="infos">
                        <h2
                            className="doctor-name"
                            onClick={() => onSelect(doctor.id)}
                        >
                            {doctor.name}
                        </h2>

                        <div className="doctor-meta">
                            <span>{doctor.experience}</span>
                            <span> - </span>
                            <span>{doctor.specialties.join(" • ")}</span>
                        </div>
                        <div className="appointment-info">
                            <div className="spec">{doctor.workDirection}</div>
                            <div className="price-old">{doctor.priceOld}</div>
                            <div className="price-new">{doctor.priceNew}₸</div>
                        </div>
                    </div>
                </div>
                <div className="doc-right">
                    <div className="schedule">
                        <div className="dates-row">
                            {[
                                { label: "вт", value: "13" },
                                { label: "ср", value: "14" },
                                { label: "чт", value: "15" },
                                { label: "пт", value: "16" },
                                { label: "сб", value: "17", disabled: true },
                                { label: "вс", value: "18", disabled: true },
                                { label: "пн", value: "19", disabled: true },
                            ].map(({ label, value, disabled }) => (
                                <div
                                    key={value}
                                    className={`date-item ${
                                        disabled
                                            ? "disabled"
                                            : selectedDate === value
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        !disabled && handleDateClick(value)
                                    }
                                >
                                    <span>{label}</span>
                                    <span>{value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="times-row">
                            {[
                                "00:00",
                                "01:00",
                                "02:00",
                                "03:00",
                                "04:00",
                                "05:00",
                                "06:00",
                                "07:00",
                                "08:00",
                                "...",
                            ].map((time) => (
                                <button
                                    key={time}
                                    className={`time-button ${
                                        selectedTime === time ? "active" : ""
                                    }`}
                                    onClick={() => handleTimeClick(time)}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>

                        <div className="call-info">
                            <Image
                                src={Overlay}
                                alt="Overlay"
                                height={28}
                                width={28}
                            />
                            Вам перезвонят для подтверждения записи
                        </div>
                    </div>
                </div>
            </div>
            <div className="doctor-bottom">
                <div className="clinic-info">
                    <strong>{doctor.clinicName}</strong>
                    <div>{doctor.clinicAddress}</div>
                </div>
                <button
                    className="sign-up-button"
                    onClick={() => setIsModalOpen(true)}
                    // onClick={() => onSelect(doctor.id)}
                >
                    Записаться{" "}
                    <Image
                        src={phoneIcon}
                        alt="Phone Icon"
                        width={24}
                        height={24}
                    />
                    
                </button>
                {isModalOpen && (
                    <ProfileModal
                        doctor={doctor}
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                        setSelectedDate={setSelectedDate}
                        setSelectedTime={setSelectedTime}
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={handleAppointment}
                    />
                )}
            </div>
        </div>
    );
}

function Pagination({ totalPages, currentPage, setCurrentPage }) {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);

    return (
        <div className="pagination">
            {pages.map((page) => (
                <button
                    key={page}
                    className={`page-btn ${
                        page === currentPage ? "active" : ""
                    }`}
                    onClick={() => setCurrentPage(page)}
                    disabled={page === currentPage}
                >
                    {page}
                </button>
            ))}
        </div>
    );
}
