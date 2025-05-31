"use client";
import React from "react";
import "./main.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import Button from "@/app/components/atoms/Button/Button";
import Header from "@/app/components/atoms/Header/Header";
import Image from "next/image";
import MainPageImg from "@/app/images/MainPageImg.png";
import Doctors from "@/app/images/Team-doctors.png";

export default function MainPage() {
    return (
        <>
            <Header />
            <section className="main-page">
                <div className="image-section">
                    <Image
                        src={MainPageImg}
                        alt="Doctor"
                        width={400}
                        height={400}
                        className=""
                    />
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
                        Найдите ближайшие аптеки и медицинские центры за
                        считанные секунды. Удобный поиск по карте, актуальные
                        данные, и возможность онлайн-записи к врачу — всё в
                        одном месте. Заботьтесь о здоровье легко и без очередей.
                    </p>

                    <div className="buttons">
                        <Button label="Забронировать встречу" />
                    </div>
                </div>
            </section>

            <section className="why-us-section">
                <div className="container">
                    <div className="left">
                        <h2 className="title">
                            Что делает нас <br /> особенным?
                        </h2>

                        <div className="image-container">
                            <Image
                                src={Doctors}
                                alt="Doctor"
                                width={500}
                                height={500}
                                className=""
                            />
                        </div>
                    </div>

                    <div className="right">
                        <p className="description">
                            Ничто не важнее вашего здоровья. Мы стремимся
                            предоставить медицинские услуги, которые помогут вам
                            легче заботиться о своём здоровье и повышать его
                            уровень благополучия.
                        </p>
                        <div className="boxs">
                            <div className="stat-box">
                                <h2 className="stat-number">5</h2>
                                <p className="stat-text">Лет успешной работы</p>
                            </div>
                            <div className="stat-box">
                                <h2 className="stat-number">10k+</h2>
                                <p className="stat-text">Довольных пациентов</p>
                            </div>
                            <div className="stat-box">
                                <h2 className="stat-number">20+</h2>
                                <p className="stat-text">Медицинских услуг</p>
                            </div>
                            <div className="stat-box dark">
                                <h2 className="stat-number">1k+</h2>
                                <p className="stat-text">
                                    Профессиональных докторов
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
