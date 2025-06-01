"use client";
import React from "react";
import { neurologySpecialty, neurologyDoctors } from "@/app/pages/Data/neurologyData.js";
import Image from "next/image";
import "./neurology.css";

export default function NeurologyPage() {
  return (
    <section className="specialty-page">
      <div className="specialty-header">
        <h1>
          <span className="emoji">{neurologySpecialty.emoji}</span>{" "}
          {neurologySpecialty.title}
        </h1>
        <div className="subtitle">{neurologySpecialty.subtitle}</div>
        <p className="description">{neurologySpecialty.description}</p>
        <div className="book-buttons">
          <button className="primary-btn">Записаться</button>
          <button className="icon-btn">📞</button>
        </div>
      </div>

      <div className="info-columns">
        <div>
          <h4 className="block-title">Когда стоит обратиться:</h4>
          <ul>
            {neurologySpecialty.whenToVisit.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="block-title">Что мы лечим:</h4>
          <ul>
            {neurologySpecialty.whatWeTreat.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>

      <h2 className="section-title">Наши специалисты</h2>
      <div className="doctors-grid">
        {neurologyDoctors.map((doc) => (
          <div className="doctor-card" key={doc.id}>
            <Image
              src={doc.image}
              width={100}
              height={100}
              className="avatar"
              alt={doc.name}
            />
            <div className="doctor-info">
              <h4>{doc.name}</h4>
              <p><strong>Специализация:</strong> {doc.specialization}</p>
              <p><strong>Опыт работы:</strong> {doc.experience} лет</p>
              <p><strong>Первичный приём:</strong> {doc.price} ₸</p>
              <p>⭐ {doc.rating}/5 — на основе {doc.reviews} отзывов</p>
              <button className="primary-btn">Записаться</button>
            </div>
          </div>
        ))}
      </div>

      <button className="all-doctors-btn">Все специалисты</button>
    </section>
  );
}
