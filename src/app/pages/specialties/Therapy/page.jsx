"use client";
import React, { useEffect, useState } from "react";
import {
    therapySpecialty,
    therapyDoctors,
} from "@/app/pages/Data/therapyData.js";
import Image from "next/image";
import "./therapy.css";
import Header from "@/app/components/atoms/Header/Header";
import Footer from "@/app/components/atoms/Footer/Footer";
import Button from "@/app/components/atoms/Button/Button";
import BtnBorder from "@/app/components/atoms/btnBorder/btnBorder";
import { ref, onValue } from "firebase/database";
import { db } from "@/app/firebaseConfig";
import AppointmentModal from "../../Appointment/page";

export default function TherapyPage() {
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (doctor) => {
        setSelectedDoctor(doctor);
        setIsModalOpen(true);
    };

    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const doctorsRef = ref(db, "doctors");
        const unsubscribe = onValue(doctorsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const filtered = Object.entries(data)
                    .map(([id, doc]) => ({
                        id,
                        name: doc.fullName || "Без имени",
                        specialization: doc.speciality || "-",
                        experience: doc.experience || "-",
                        price: doc.priceNew || "-",
                        image: doc.avatarBase64 || "/default-avatar.png",
                        rating: doc.rating || 0,
                        reviews: doc.reviewsList
                            ? Object.keys(doc.reviewsList).length
                            : 0,
                    }))
                    .filter((doc) =>
                        (doc.specialization || "")
                            .toLowerCase()
                            .includes("")
                    )
                    .slice(0, 4);
    
                setDoctors(filtered);
            } else {
                setDoctors([]);
            }
        });
    
        return () => unsubscribe();
    }, []);
    
    return (
        <>
            <Header className="the-header-bckg" />
            <section className="the-specialty-page">
                <div className="the-specialty-header">
                    <h1>
                        <span className="the-emoji">
                            <Image width={60} src={therapySpecialty.emoji} />
                        </span>{" "}
                        {therapySpecialty.title}
                    </h1>
                    <div className="the-subtitle">
                        {therapySpecialty.subtitle}
                    </div>
                    <p className="the-description">
                        {therapySpecialty.description}
                    </p>
                    <Button
                        className="the-bookAppointment"
                        label="Записаться"
                        onClick={() => setIsModalOpen(true)}
                    />
                    {isModalOpen && (
                        <AppointmentModal
                            onClose={() => setIsModalOpen(false)}
                        />
                    )}
                </div>

                <div className="the-info-columns">
                    <div>
                        <h4 className="the-block-title">
                            Когда стоит обратиться:
                        </h4>
                        <ul>
                            {therapySpecialty.whenToVisit.map((item, i) => (
                                <li className="the-what-lech" key={i}>
                                    <span className="the-decoration-blue-700">
                                        •
                                    </span>{" "}
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="the-block-title">Что мы лечим:</h4>
                        <ul>
                            {therapySpecialty.whatWeTreat.map((item, i) => (
                                <li className="the-what-lech" key={i}>
                                    <span className="the-decoration-blue-700">
                                        •
                                    </span>{" "}
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <h2 className="the-specialty-title">Наши специалисты</h2>
                <div className="the-doctors-grid">
                    {doctors.map((doc) => (
                        <div className="the-doctor-card" key={doc.id}>
                            <div className="the-doctor-info">
                                <Image
                                    src={doc.image}
                                    width={100}
                                    height={100}
                                    className="the-specialty-avatar"
                                    alt={doc.name}
                                />
                                <span className="flex flex-col items-center">
                                    <p>⭐ {doc.rating}/5</p>
                                    <p>На основе {doc.reviews} отзывов</p>
                                </span>
                            </div>
                            <div className="the-doctor-info">
                                <h3>{doc.name}</h3>
                                <div className="the-specialty-texts">
                                    <p>
                                        Специализация:{" "}
                                        <span className="the-clrblck">
                                            {doc.specialization}
                                        </span>{" "}
                                    </p>
                                    <p>
                                        Опыт работы:{" "}
                                        <span className="the-clrblck">
                                            {doc.experience} лет
                                        </span>{" "}
                                    </p>
                                    <p>
                                        Первичный приём:{" "}
                                        <span className="the-clrblck">
                                            {doc.price} ₸
                                        </span>{" "}
                                    </p>
                                </div>

                                <Button
                                    className="the-btnWid"
                                    label="Записаться"
                                    onClick={() => handleOpenModal(doc)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <BtnBorder
                    className="the-all-doctors-btn"
                    label="Все специалисты"
                />
            </section>
            <Footer />
        </>
    );
}
