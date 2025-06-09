"use client";
import React, { useEffect, useState } from "react";
import { gynecologySpecialty, gynecologyDoctors } from "@/app/pages/Data/gynecologyData.js";
import Image from "next/image";
import "./gynecology.css";
import Header from "@/app/components/atoms/Header/Header";
import Footer from "@/app/components/atoms/Footer/Footer";
import Button from "@/app/components/atoms/Button/Button";
import BtnBorder from "@/app/components/atoms/btnBorder/btnBorder";
import { ref, onValue } from "firebase/database";
import { db } from "@/app/firebaseConfig";
import AppointmentModal from "../../Appointment/page";


export default function GynecologyPage() {
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
                              .includes("кардио")
                      );
  
                  setDoctors(filtered);
              } else {
                  setDoctors([]);
              }
          });
  
          return () => unsubscribe();
      }, []);
  return (
    <>
      <Header className="gyn-header-bckg" />
      <section className="gyn-specialty-page">
        <div className="gyn-specialty-header">
          <h1>
            <span className="gyn-emoji"><Image width={60} src={gynecologySpecialty.emoji} /></span>{" "}
            {gynecologySpecialty.title}
          </h1>
          <div className="gyn-subtitle">{gynecologySpecialty.subtitle}</div>
          <p className="gyn-description">{gynecologySpecialty.description}</p>
          <Button className="gyn-bookAppointment" label="Записаться" onClick={() => setIsModalOpen(true)}/>
            {isModalOpen && (
                <AppointmentModal
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>

        <div className="gyn-info-columns">
          <div>
            <h4 className="gyn-block-title">Когда стоит обратиться:</h4>
            <ul>
              {gynecologySpecialty.whenToVisit.map((item, i) => (
                <li className="gyn-what-lech" key={i}><span className="gyn-decoration-blue-700">•</span> {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="gyn-block-title">Что мы лечим:</h4>
            <ul>
              {gynecologySpecialty.whatWeTreat.map((item, i) => (
                <li className="gyn-what-lech" key={i}><span className="gyn-decoration-blue-700">•</span> {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <h2 className="gyn-specialty-title">Наши специалисты</h2>
        <div className="gyn-doctors-grid">
          {doctors.map((doc) => (
            <div className="gyn-doctor-card" key={doc.id}>
              <div className="gyn-doctor-info">
                <Image
                  src={doc.image}
                  width={100}
                  height={100}
                  className="gyn-specialty-avatar"
                  alt={doc.name}
                /><span className="flex flex-col items-center">
                  <p>⭐ {doc.rating}/5</p>
                  <p>На основе {doc.reviews} отзывов</p></span>

              </div>
              <div className="gyn-doctor-info">
                <h3>{doc.name}</h3>
                <div className="gyn-specialty-texts">
                  <p>Специализация: <span className="gyn-clrblck">{doc.specialization}</span> </p>
                  <p>Опыт работы: <span className="gyn-clrblck">{doc.experience} лет</span> </p>
                  <p>Первичный приём: <span className="gyn-clrblck">{doc.price} ₸</span> </p>
                </div>

                <Button className="gyn-btnWid" label="Записаться" />
              </div>
            </div>
          ))}
        </div>
        <BtnBorder className="gyn-all-doctors-btn" label="Все специалисты" onClick={() => setIsModalOpen(true)}/>
        {isModalOpen && (
                <AppointmentModal
                    onClose={() => setIsModalOpen(false)}
                />
            )}
      </section>
      <Footer />
    </>
  );
}
