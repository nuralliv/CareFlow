"use client";
import React from "react";
import { therapySpecialty, therapyDoctors } from "@/app/pages/Data/therapyData.js";
import Image from "next/image";
import "./therapy.css";
import Header from "@/app/components/atoms/Header/Header";
import Footer from "@/app/components/atoms/Footer/Footer";
import Button from "@/app/components/atoms/Button/Button";
import BtnBorder from "@/app/components/atoms/btnBorder/btnBorder";

export default function TherapyPage() {
  return (
    <>
      <Header className="the-header-bckg" />
      <section className="the-specialty-page">
        <div className="the-specialty-header">
          <h1>
            <span className="the-emoji"><Image width={60} src={therapySpecialty.emoji} /></span>{" "}
            {therapySpecialty.title}
          </h1>
          <div className="the-subtitle">{therapySpecialty.subtitle}</div>
          <p className="the-description">{therapySpecialty.description}</p>
          <Button className="the-bookAppointment" label="Записаться" />
        </div>

        <div className="the-info-columns">
          <div>
            <h4 className="the-block-title">Когда стоит обратиться:</h4>
            <ul>
              {therapySpecialty.whenToVisit.map((item, i) => (
                <li className="the-what-lech" key={i}><span className="the-decoration-blue-700">•</span> {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="the-block-title">Что мы лечим:</h4>
            <ul>
              {therapySpecialty.whatWeTreat.map((item, i) => (
                <li className="the-what-lech" key={i}><span className="the-decoration-blue-700">•</span> {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <h2 className="the-specialty-title">Наши специалисты</h2>
        <div className="the-doctors-grid">
          {therapyDoctors.map((doc) => (
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
                  <p>Специализация: <span className="the-clrblck">{doc.specialization}</span> </p>
                  <p>Опыт работы: <span className="the-clrblck">{doc.experience} лет</span> </p>
                  <p>Первичный приём: <span className="the-clrblck">{doc.price} ₸</span> </p>
                </div>

                <Button className="the-btnWid" label="Записаться" />
              </div>
            </div>
          ))}
        </div>
        <BtnBorder className="the-all-doctors-btn" label="Все специалисты" />

      </section>
      <Footer />
    </>
  );
}
