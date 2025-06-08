"use client";
import React from "react";
import { neurologySpecialty, neurologyDoctors } from "@/app/pages/Data/neurologyData.js";
import Image from "next/image";
import "./neurology.css";
import Header from "@/app/components/atoms/Header/Header";
import Footer from "@/app/components/atoms/Footer/Footer";
import Button from "@/app/components/atoms/Button/Button";
import BtnBorder from "@/app/components/atoms/btnBorder/btnBorder";

export default function NeurologyPage() {
  return (
    <>
      <Header className="neo-header-bckg" />
      <section className="neo-specialty-page">
        <div className="neo-specialty-header">
          <h1>
            <span className="neo-emoji"><Image width={60} src={neurologySpecialty.emoji} /></span>{" "}
            {neurologySpecialty.title}
          </h1>
          <div className="neo-subtitle">{neurologySpecialty.subtitle}</div>
          <p className="neo-description">{neurologySpecialty.description}</p>
          <Button className="neo-bookAppointment" label="Записаться" />
        </div>

        <div className="neo-info-columns">
          <div>
            <h4 className="neo-block-title">Когда стоит обратиться:</h4>
            <ul>
              {neurologySpecialty.whenToVisit.map((item, i) => (
                <li className="neo-what-lech" key={i}><span className="neo-decoration-blue-700">•</span> {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="neo-block-title">Что мы лечим:</h4>
            <ul>
              {neurologySpecialty.whatWeTreat.map((item, i) => (
                <li className="neo-what-lech" key={i}><span className="neo-decoration-blue-700">•</span> {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <h2 className="neo-specialty-title">Наши специалисты</h2>
        <div className="neo-doctors-grid">
          {neurologyDoctors.map((doc) => (
            <div className="neo-doctor-card" key={doc.id}>
              <div className="neo-doctor-info">
                <Image
                  src={doc.image}
                  width={100}
                  height={100}
                  className="neo-specialty-avatar"
                  alt={doc.name}
                /><span className="flex flex-col items-center">
                  <p>⭐ {doc.rating}/5</p>
                  <p>На основе {doc.reviews} отзывов</p></span>

              </div>
              <div className="neo-doctor-info">
                <h3>{doc.name}</h3>
                <div className="neo-specialty-texts">
                  <p>Специализация: <span className="neo-clrblck">{doc.specialization}</span> </p>
                  <p>Опыт работы: <span className="neo-clrblck">{doc.experience} лет</span> </p>
                  <p>Первичный приём: <span className="neo-clrblck">{doc.price} ₸</span> </p>
                </div>

                <Button className="neo-btnWid" label="Записаться" />
              </div>
            </div>
          ))}
        </div>
        <BtnBorder className="neo-all-doctors-btn" label="Все специалисты" />

      </section>
      <Footer />
    </>
  );
}
