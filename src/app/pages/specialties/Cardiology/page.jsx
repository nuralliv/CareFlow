"use client";
import React from "react";
import { cardiologySpecialty, cardiologyDoctors } from "@/app/pages/Data/cardiologyData.js";
import Image from "next/image";
import "./cardiology.css";
import Header from "@/app/components/atoms/Header/Header";
import Footer from "@/app/components/atoms/Footer/Footer";
import Button from "@/app/components/atoms/Button/Button";
import BtnBorder from "@/app/components/atoms/btnBorder/btnBorder";

export default function CardiologyPage() {
  return (
    <>
      <Header className="cor-header-bckg" />
      <section className="cor-specialty-page">
        <div className="cor-specialty-header">
          <h1>
            <span className="cor-emoji"><Image width={60} src={cardiologySpecialty.emoji} /></span>{" "}
            {cardiologySpecialty.title}
          </h1>
          <div className="cor-subtitle">{cardiologySpecialty.subtitle}</div>
          <p className="cor-description">{cardiologySpecialty.description}</p>
          <Button className="cor-bookAppointment" label="Записаться" />
        </div>

        <div className="cor-info-columns">
          <div>
            <h4 className="cor-block-title">Когда стоит обратиться:</h4>
            <ul>
              {cardiologySpecialty.whenToVisit.map((item, i) => (
                <li className="cor-what-lech" key={i}><span className="cor-decoration-blue-700">•</span> {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="cor-block-title">Что мы лечим:</h4>
            <ul>
              {cardiologySpecialty.whatWeTreat.map((item, i) => (
                <li className="cor-what-lech" key={i}><span className="cor-decoration-blue-700">•</span> {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <h2 className="cor-specialty-title">Наши специалисты</h2>
        <div className="cor-doctors-grid">
          {cardiologyDoctors.map((doc) => (
            <div className="cor-doctor-card" key={doc.id}>
              <div className="cor-doctor-info">
                <Image
                  src={doc.image}
                  width={100}
                  height={100}
                  className="cor-specialty-avatar"
                  alt={doc.name}
                /><span className="flex flex-col items-center"><p>⭐ {doc.rating}/5</p>
                  <p>На основе {doc.reviews} отзывов</p></span>

              </div>
              <div className="cor-doctor-info">
                <h3>{doc.name}</h3>
                <div className="cor-specialty-texts">
                  <p>Специализация: <span className="cor-clrblck">{doc.specialization}</span> </p>
                  <p>Опыт работы: <span className="cor-clrblck">{doc.experience} лет</span> </p>
                  <p>Первичный приём: <span className="cor-clrblck">{doc.price} ₸</span> </p>
                </div>

                <Button className="cor-btnWid" label="Записаться" />
              </div>
            </div>
          ))}
        </div>
        <BtnBorder className="cor-all-doctors-btn" label="Все специалисты" />

      </section>
      <Footer />
    </>
  );
}
