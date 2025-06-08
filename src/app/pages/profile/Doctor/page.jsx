"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { push, ref, onValue, set, get } from "firebase/database";
import { db, auth } from "@/app/firebaseConfig";

import "./DoctorProfile.css";
import documentIcon from "@/app/images/fi-br-document.svg";
import btnBack from "@/app/images/Button.svg";
import Link from "next/link";
import Image from "next/image";

import ProfileModal from "../ProfileModal/page";
import userProfile from "@/app/images/user-profile-icon.jpg";

export default function DoctorProfile() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const doctorId = searchParams.get("id");
    const [doctor, setDoctor] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [consent, setConsent] = useState(false);

    const [currentUserInfo, setCurrentUserInfo] = useState(null);

    useEffect(() => {
        if (!doctorId) return;

        const doctorRef = ref(db, `doctors/${doctorId}`);
        const unsubscribe = onValue(doctorRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setDoctor(data);
            } else {
                setDoctor(null);
            }
        });

        return () => unsubscribe();
    }, [doctorId]);

    if (!doctorId) {
        return <p>Доктор не выбран.</p>;
    }

    if (!doctor) {
        return <p>Загрузка данных доктора...</p>;
    }

    const handleAppointment = async () => {
        if (!selectedDate || !selectedTime || !doctorId || !auth.currentUser) {
            alert("Выберите дату и время");
            return;
        }

        const appointmentData = {
            doctorId,
            doctorName: doctor.fullName,
            userId: auth.currentUser.uid,
            date: selectedDate,
            time: selectedTime,
            status: "ожидает подтверждения",
            createdAt: new Date().toISOString(),
        };

        try {
            const appointmentsRef = ref(db, "appointments");
            await push(appointmentsRef, appointmentData);
            alert("Запись успешно создана!");
            setIsModalOpen(false);
            setSelectedDate(null);
            setSelectedTime(null);
        } catch (error) {
            console.error("Ошибка при записи:", error);
            alert("Не удалось записаться. Попробуйте позже.");
        }
    };

    const handleReviewSubmit = async () => {
        if (!auth.currentUser) {
            alert("Вы должны войти, чтобы оставить отзыв");
            return;
        }
        if (!rating || !reviewText.trim() || !consent) {
            alert("Пожалуйста, заполните все поля и подтвердите согласие");
            return;
        }

        try {
            const uid = auth.currentUser.uid;

            let userRef = ref(db, `patients/${uid}`);
            let snapshot = await get(userRef);
            let userData = snapshot.val();

            if (!userData) {
                userRef = ref(db, `doctors/${uid}`);
                snapshot = await get(userRef);
                userData = snapshot.val();
            }

            const userFullName = userData?.fullName || "Аноним";
            const userPhoto =
                userData?.avatarBase64 || userData?.photoUrl || null;

            const newReview = {
                userId: uid,
                userName: userFullName,
                userPhoto: userPhoto,
                rating,
                text: reviewText,
                date: new Date().toLocaleDateString(),
            };

            const reviewsRef = ref(db, `doctors/${doctorId}/reviewsList`);
            await push(reviewsRef, newReview);

            const reviewSnap = await get(reviewsRef);
            const reviews = reviewSnap.val();
            if (reviews) {
                const ratings = Object.values(reviews).map(
                    (r) => r.rating || 0
                );
                const avgRating =
                    ratings.reduce((a, b) => a + b, 0) / ratings.length;
                const ratingRef = ref(db, `doctors/${doctorId}/rating`);
                await set(ratingRef, Number(avgRating.toFixed(1)));
            }

            alert("Спасибо за ваш отзыв!");
            setRating(0);
            setReviewText("");
            setConsent(false);
        } catch (err) {
            console.error("Ошибка при отправке отзыва:", err);
            alert("Ошибка при отправке отзыва. Попробуйте позже.");
        }
    };

    return (
        <div className="container">
            <div className="flex flex-col">
                <div className="pro-head">
                    <button onClick={() => router.back()}>
                        <Image
                            src={btnBack}
                            alt="Btn-back"
                            width={45}
                            height={45}
                        />
                    </button>
                    Специалисты
                </div>
                <section className="profile-card">
                    <div className="profile-left">
                        <div className="profle-left-content">
                            <img
                                src={
                                    doctor.avatarBase64 || "/doctor-avatar.jpg"
                                }
                                alt={`Фото доктора ${doctor.fullName}`}
                                className="avatar"
                            />
                            <h2 className="doctor-name">{doctor.fullName}</h2>
                            <div>
                                <div className="rating">
                                    {"★".repeat(Math.floor(doctor.rating)) +
                                        "☆".repeat(
                                            5 - Math.floor(doctor.rating)
                                        )}{" "}
                                </div>
                                <p className="reviews-count">
                                    На основе{" "}
                                    {doctor.reviewsList
                                        ? Object.keys(doctor.reviewsList).length
                                        : 0}{" "}
                                    отзывов
                                </p>
                            </div>

                            <div className="info">
                                <p>
                                    <span>Специализация:</span>{" "}
                                    {doctor.speciality || "-"}
                                </p>
                                <p>
                                    <span>Опыт работы:</span>{" "}
                                    {doctor.experience || "-"}
                                </p>
                                <p>
                                    <span>Первичный приём:</span>{" "}
                                    {doctor.priceNew || "-"}
                                </p>
                            </div>

                            <div className="buttons-group">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    Записаться на приём
                                </button>
                                <Link
                                    href="#review"
                                    className="btn btn-outline"
                                >
                                    <div className="w-full h-full flex justify-center align-middle">
                                        Оставить отзыв
                                    </div>
                                </Link>
                                {isModalOpen && (
                                    <ProfileModal
                                        doctor={doctor}
                                        selectedDate={selectedDate}
                                        selectedTime={selectedTime}
                                        setSelectedDate={setSelectedDate}
                                        setSelectedTime={setSelectedTime}
                                        onClose={() => setIsModalOpen(false)}
                                        onSubmit={handleAppointment}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="profile-right">
                        <div className="section-txt">
                            <h3>Образование</h3>
                            <ul>
                                <li>
                                    2010 — врач, Государственное образовательное
                                    учреждение высшего профессионального
                                    образования «УСМА», г. Иркутск
                                </li>
                                <li>
                                    2011 — интернатура по специальности
                                    «Хирург», «УСМА», г. Иркутск
                                </li>
                            </ul>
                        </div>

                        <div className="section-txt">
                            <h3>Повышение квалификации</h3>
                            <ul>
                                <li>2013 — специализация «Хирург», УСМА</li>
                                <li>
                                    2015 — аккредитация по специальности
                                    «Хирург»
                                </li>
                                <li>
                                    2016 — курс «Экспертиза временной
                                    нетрудоспособности», УСМА
                                </li>
                            </ul>
                        </div>

                        <div className="section-txt">
                            <h3>Опыт работы</h3>
                            <ul>
                                <li>
                                    2012–2019 — Врач общей практики, Поликлиника
                                    №2, Иркутская городская больница
                                </li>
                                <li>
                                    С 2019 года — Врач общей практики,
                                    Медицинская клиника
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>

            <section id="review" className="review-form-section">
                <h1 className="review-form-h1">Поделитесь мнением</h1>
                <div className="rev-forms">
                    <div className="stars">
                        {[...Array(5)].map((_, i) => (
                            <button
                                key={i}
                                className={`star ${
                                    i < (hoverRating || rating) ? "active" : ""
                                }`}
                                onClick={() => setRating(i + 1)}
                                onMouseEnter={() => setHoverRating(i + 1)}
                                onMouseLeave={() => setHoverRating(0)}
                                aria-label={`${i + 1} звезда`}
                                type="button"
                            >
                                ★
                            </button>
                        ))}
                    </div>
                    <textarea
                        placeholder="Опишите, как прошел прием: помог ли специалист решаить проблему качество приема (внимательность, сервис), будете ли еще обращаться и рекомендовать специалиста"
                        className="review-textarea"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                    ></textarea>

                    <label className="consent-label">
                        <input
                            type="checkbox"
                            className="consent-checkbox"
                            checked={consent}
                            onChange={(e) => setConsent(e.target.checked)}
                        />
                        Я даю{" "}
                        <a href="#" className="consent-link">
                            Согласие на обработку персональных данных
                        </a>
                    </label>

                    <div className="review-buttons">
                        <button
                            className="btn btn-primary"
                            onClick={handleReviewSubmit}
                        >
                            Написать отзыв
                        </button>
                        <button
                            className="btn btn-link"
                            onClick={() => {
                                setReviewText("");
                                setRating(0);
                                setConsent(false);
                            }}
                        >
                            Отмена
                        </button>
                    </div>

                    <p className="agreement-note">
                        Нажимая кнопку “Написать отзыв”, вы принимаете{" "}
                        <a href="#" className="consent-link">
                            условия Пользовательского соглашения
                        </a>
                    </p>
                </div>
            </section>

            <section className="reviews-list-section">
                <h3>Проверенные отзывы</h3>

                <div className="reviews-list">
                    {Object.values(doctor.reviewsList || {}).map(
                        (review, idx) => (
                            <article key={idx} className="review-item">
                                <div className="review-header">
                                    <img
                                        src={
                                            review.userPhoto || userProfile.src
                                        }
                                        alt="Пользователь"
                                        className="user-avatar"
                                    />

                                    <p className="user-name">
                                        {review.userName}
                                    </p>
                                </div>
                                <p className="review-text">
                                    Отзыв: {review.text}
                                </p>
                                <time className="review-date">
                                    {review.date}
                                </time>
                            </article>
                        )
                    )}
                </div>
            </section>
        </div>
    );
}
