"use client";
import React from "react";
import "./ProfileModal.css";


export default function ProfileModal({
  doctor,
  selectedDate,
  selectedTime,
  setSelectedDate,
  setSelectedTime,
  onClose,
  onSubmit,
}) {

    

  const dates = ["13", "14", "15", "16", "17", "18", "19"];
  const days = ["вт", "ср", "чт", "пт", "сб", "вс", "пн"];
  const times = [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00"
  ];

  

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="modal-content">
          <div className="left-side">
            <img src={doctor.avatarBase64} className="avatar" alt="doctor" />
            <h3>{doctor.fullName}</h3>
            <p>⭐ {doctor.rating}/5</p>
            <p><strong>Специализация:</strong> {doctor.speciality}</p>
            <p><strong>Опыт работы:</strong> {doctor.experience}</p>
            <p><strong>Первичный приём:</strong> {doctor.priceNew} ₸</p>
          </div>

          <div className="right-side">
            <h4>Выберите желаемое время записи</h4>

            <div className="dates-row">
              {dates.map((day, i) => (
                <div
                  key={i}
                  className={`date-btn ${selectedDate === day ? "active" : ""}`}
                  onClick={() => setSelectedDate(day)}
                >
                  <div>{days[i]}</div>
                  <div>{day}</div>
                </div>
              ))}
            </div>

            <div className="times-row">
              {times.map((time) => (
                <button
                  key={time}
                  className={`time-btn ${selectedTime === time ? "active" : ""}`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>

            <div className="modal-actions">
              <button className="btn btn-primary" onClick={onSubmit}>
                Записаться
              </button>
              <button className="btn btn-outline" onClick={onClose}>
                Отмена
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
