"use client";

import React, { useEffect, useState } from "react";
import Button from "@/app/components/atoms/Button/Button";
import Image from "next/image";
import MainPageImg from "@/app/images/MainPageImg.png";
import Doctors from "@/app/images/Team-doctors.png";
import "./main.css";
import Header from "@/app/components/atoms/Header/Header";
import Link from "next/link";
import first from "@/app/images/1.jpg";
import second from "@/app/images/2.jpg";
import third from "@/app/images/3.jpg";
import SendTo from "@/app/images/Sendicon.svg";
import Heart from "@/app/images/heart.svg";
import BtnBorder from "@/app/components/atoms/btnBorder/btnBorder";
import doctor2 from "@/app/images/11.jpg";
import doctor1 from "@/app/images/22.jpg";
import doctor3 from "@/app/images/33.jpg";
import Footer from "@/app/components/atoms/Footer/Footer";

import { auth } from "@/app/firebaseConfig";
import { useRouter } from "next/navigation";

const newsItems = [
    {
        id: 1,
        image: first,
        date: "27 Май 2025",
        title: "В Казахстане разработают стандарт для традиционной медицины",
        description:
            "Министерство здравоохранения разработает стандарт с целью регламентации методов традиционной медицины.",
        link: "https://www.inform.kz/ru/v-kazahstane-razrabotayut-standart-dlya-traditsionnoy-meditsini-b9921a",
    },
    {
        id: 2,
        image: second,
        date: "27 Май 2025",
        title: "Новые протоколы для борьбы с наркоманией разработают в Казахстане",
        description:
            "Минздрав разработает новый протокол по лечению зависимостей от новых психоактивных веществ передает агентства Kazinform. ",
        link: "https://www.inform.kz/ru/novie-protokoli-dlya-borbi-s-narkomaniey-razrabotayut-v-kazahstane-e3ed69",
    },
    {
        id: 3,
        image: third,
        date: "27 Май 2025",
        title: "В Алматы не могут решить, кто будет управлять первым крематорием в стране",
        description:
            "В Алматы построили первый в стране крематорий, но никто не хочет брать его на баланс, передает корреспондент агентства Kazinform.",
        link: "https://www.inform.kz/ru/v-almati-ne-mogut-reshit-kto-budet-upravlyat-pervim-krematoriem-v-strane-0f08b9",
    },
];
const doctors = [
    {
        id: 1,
        name: "Алия Жумагалиева",
        specialty: "Педиатр",
        image: doctor1,
    },
    {
        id: 2,
        name: "Тимур Рахимов",
        specialty: "Терапевт",
        image: doctor2,
    },
    {
        id: 3,
        name: "Жанара Тулеубаева",
        specialty: "Невролог",
        image: doctor3,
    },
];

export default function HomePage() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => { 
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const handleNavigate = (path) => {
        if (user) {
            router.push(path);
        } else {
            router.push("/pages/login");
        }
    };

    return (
        <div className="homepage">
            <Header />

            <section className="hero-section">
                <div className="hero-image">
                    <Image src={MainPageImg} alt="MainPageImg" className="main-img" />
                </div>

                <div className="hero-content">
                    <h1 className="hero-title">
                        Добро пожаловать в CareFlow — ваш надёжный помощник в мире медицины!
                    </h1>
                    <p className="hero-subtitle">
                        Найдите ближайшие аптеки и медицинские центры за считанные секунды. Удобный поиск по карте,
                        актуальные данные, и возможность онлайн-записи к врачу — всё в одном месте. Заботьтесь о здоровье легко и без очередей.
                    </p>
                    <Button label="Записаться на приём" onClick={() => handleNavigate("/appointment")} />
                </div>
            </section>

            <section className="about-section">
                <div className="about-texts">
                    <h2 className="about-main-txt">Что делает нас особенным?</h2>
                    <p className="about-second-txt">
                        Ничто не важнее вашего здоровья. Мы стремимся предоставить медицинские услуги,
                        которые помогут вам легче заботиться о своём здоровье и повышать его уровень благополучия.
                    </p>
                </div>

                <div className="about-content">
                    <Image src={Doctors} alt="Doctors" className="doctors-img" />
                    <div className="about-stats">
                        <div className="stat-box">
                            <div className="stat-number">5</div>
                            <div className="stat-label">Лет успешной работы</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-number">10k+</div>
                            <div className="stat-label">Довольных пациентов</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-number">20+</div>
                            <div className="stat-label">Медицинских услуг</div>
                        </div>
                        <div className="stat-box highlight">
                            <div className="stat-number">1k+</div>
                            <div className="stat-label">Профессиональных докторов</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="news-section">
                <h2 className="section-title">Новости</h2>
                <div className="news-grid">
                    {newsItems.map((news) => (
                        <div key={news.id} className="news-card">
                            <Image src={news.image} alt={news.title} className="news-image" />

                            <div className="white-bckg">
                                <div className="news-date">{news.date}</div>
                            </div>
                            <div className="news-title">{news.title}</div>
                            <div className="news-description">{news.description}</div>
                            <div className="link">
                                <Button
                                    label="Узнать больше"
                                    icon={SendTo}
                                    iconPosition="right"
                                    className="btnSendTo"
                                    onClick={() => handleNavigate(news.link)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="services-section">
                <h2 className="section-title">Процедуры и услуги</h2>
                <div className="services-grid">
                    <div className="container">
                        <div className="service-card">
                            <Image src={Heart} width={70} />
                            <h3>Кардиология</h3>
                            <p>
                                Диагностика и лечение сердечно-сосудистых заболеваний. Онлайн-запись к кардиологу без ожидания.
                            </p>
                            <BtnBorder
                                label="Читать подробнее"
                                className="btnRead"
                                onClick={() => handleNavigate("/services/cardiology")}
                            />
                        </div>

                        <div className="service-card highlight">
                            <Image src={Heart} width={70} />
                            <h3>Неврология</h3>
                            <p>Помощь при головной боли, бессоннице, остеохондрозе, невралгии и других нарушениях.</p>
                            <BtnBorder
                                label="Читать подробнее"
                                className="btnRead borW"
                                onClick={() => handleNavigate("/services/neurology")}
                            />
                        </div>
                    </div>

                    <div className="container">
                        <div className="service-card highlight">
                            <Image src={Heart} width={70} />
                            <h3>Терапия</h3>
                            <p>Первичный приём, лечение простуд, ОРВИ, хронических заболеваний.</p>
                            <BtnBorder
                                label="Читать подробнее"
                                className="btnRead borW"
                                onClick={() => handleNavigate("/services/therapy")}
                            />
                        </div>

                        <div className="service-card">
                            <Image src={Heart} width={70} />
                            <h3>Гинекология</h3>
                            <p>Профилактика и лечение женских заболеваний. УЗИ, консультации, ведение беременности.</p>
                            <BtnBorder
                                label="Читать подробнее"
                                className="btnRead"
                                onClick={() => handleNavigate("/services/gynecology")}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="doctors-section">
                <h2 className="section-title">Наши лучшие доктора</h2>
                <div className="doctor-cards">
                    {doctors.map((doctor) => (
                        <div key={doctor.id} className="doctor-card">
                            <Image src={doctor.image} alt={doctor.title} className="doctor-image" />
                            <div className="doctor-info">
                                <h4>{doctor.name}</h4>
                                <p>{doctor.specialty}</p>
                            </div>
                        </div>
                    ))}
                    <BtnBorder label="Все специалисты" className="btnAllSpe" onClick={() => handleNavigate("/doctors")} />
                </div>
            </section>

            <Footer />
        </div>
    );
}
