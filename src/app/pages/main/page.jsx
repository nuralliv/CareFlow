"use client";
import React from "react";
import "./main.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import Button from "@/app/components/atoms/Button/Button";
// import MainImg from "../../../../public/images/main-img.png";

export default function MainPage() {
    return (
        <main className="main-page">
            <div className="image-section">
                {/* <img src={MainImg} alt="Medical Illustration" /> */}
            </div>

            <div className="content-section">
                <div className="location">
                    <FaMapMarkerAlt className="icon" />
                    Тараз, Пушкина 154
                </div>

                <h1 className="title">
                    Добро пожаловать в <span>CareFlow</span> — ваш надёжный
                    помощник в мире медицины!
                </h1>

                <p className="description">
                    Найдите ближайшие аптеки и медицинские центры за считанные
                    секунды. Удобный поиск по карте, актуальные данные, и
                    возможность онлайн-записи к врачу — всё в одном месте.
                    Заботьтесь о здоровье легко и без очередей.
                </p>

                <div className="buttons">
                    <Button label="Забронировать встречу" />
                </div>
            </div>
        </main>
    );
}
