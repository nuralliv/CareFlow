"use client";
import React from "react";
import { gynecologySpecialty, gynecologyDoctors } from "@/app/pages/Data/gynecologyData.js";
import Image from "next/image";
import "./gynecology.css";
import Header from "@/app/components/atoms/Header/Header";
import Footer from "@/app/components/atoms/Footer/Footer";
import Button from "@/app/components/atoms/Button/Button";
import BtnBorder from "@/app/components/atoms/btnBorder/btnBorder";

export default function GynecologyPage() {
  return (
    <>
    <Header className="header-bckg"/>
    <section className="specialty-page">
      <div className="specialty-header">
        <h1>
          <span className="emoji"><Image width={60} src={gynecologySpecialty.emoji}/></span>{" "}
          {gynecologySpecialty.title}
        </h1>
        <div className="subtitle">{gynecologySpecialty.subtitle}</div>
        <p className="description">{gynecologySpecialty.description}</p>
        <Button className="bookAppointment" label="Записаться"/>
      </div>

      <div className="info-columns">
        <div>
          <h4 className="block-title">Когда стоит обратиться:</h4>
          <ul>
            {gynecologySpecialty.whenToVisit.map((item, i) => (
              <li className="what-lech" key={i}><span className="decoration-blue-700">•</span> {item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="block-title">Что мы лечим:</h4>
          <ul>
            {gynecologySpecialty.whatWeTreat.map((item, i) => (
              <li className="what-lech" key={i}><span className="decoration-blue-700">•</span> {item}</li>
            ))}
          </ul>
        </div>
      </div>

      <h2 className="specialty-title">Наши специалисты</h2>
      <div className="doctors-grid">
        {gynecologyDoctors.map((doc) => (
          <div className="doctor-card" key={doc.id}>
            <div className="doctor-info">
              <Image
              src={doc.image}
              width={100}
              height={100}
              className="specialty-avatar"
              alt={doc.name}
            />
              <p>⭐ {doc.rating}/5</p>
              <p>На основе {doc.reviews} отзывов</p>
            </div>
            <div className="doctor-info">
              <h3>{doc.name}</h3>
              <div className="specialty-texts">
                <p>Специализация: <span className="clrblck">{doc.specialization}</span> </p>
                <p>Опыт работы: <span className="clrblck">{doc.experience} лет</span> </p>
                <p>Первичный приём: <span className="clrblck">{doc.price} ₸</span> </p>
              </div>
              
              <Button className="btnWid" label="Записаться"/>
            </div>
          </div>
        ))}
      </div>
      <BtnBorder className="all-doctors-btn" label="Все специалисты"/>

    </section>
      <Footer/>
    </>
    
  );
}
