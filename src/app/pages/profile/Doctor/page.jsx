
"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ref, onValue } from "firebase/database";
import { db } from "@/app/firebaseConfig";
import './DoctorProfile.css'; // Assuming you have a CSS file for styles
import documentIcon from '@/app/images/fi-br-document.svg';
import btnBack from '@/app/images/Button.svg';
import Link from 'next/link';
import Image from 'next/image';
import AppointmentModal from '../../Appointment/page';

export default function DoctorProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const doctorId = searchParams.get('id');

  const [doctor, setDoctor] = useState(null);

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

  return (
    <div className="container">
      <div className='flex flex-col'>
        <div className="pro-head">
          <button onClick={() => router.back()}>
            <Image src={btnBack} alt='Btn back' width={45} height={45} />
          </button>
          Специалисты
        </div>
        <section className="profile-card">
          <div className="profile-left">
            <div className='profle-left-content'>
              <img
                src={doctor.avatarBase64 || "/doctor-avatar.jpg"}
                alt={`Фото доктора ${doctor.fullName}`}
                className="avatar"
              />
              <h2 className="doctor-name">{doctor.fullName}</h2>
              <div>
                <div className="rating">
                  {"★".repeat(Math.floor(doctor.rating)) + "☆".repeat(5 - Math.floor(doctor.rating))}{" "}
                  {/* <span className="rating-value">{doctor.rating.toFixed(1)}/5</span> */}
                </div>
                <p className="reviews-count">На основе {doctor.reviews || 0} отзывов</p>
              </div>

              <div className="info">
                <p><span>Специализация:</span> {doctor.speciality || "-"}</p>
                <p><span>Опыт работы:</span> {doctor.experience || "-"}</p>
                <p><span>Первичный приём:</span> {doctor.priceNew || "-"}</p>
              </div>

              <div className="buttons-group">
                <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                  Записаться на приём
                </button>
                {isModalOpen && (
                  <AppointmentModal onClose={() => setIsModalOpen(false)} />
                )}
                <Link href='#review' className="btn btn-outline">
                  <div className='w-full h-full flex justify-center align-middle'>Оставить отзыв</div>
                </Link>
              </div>
            </div>
          </div>

          <div className="profile-right">
            <div className="section-txt">
              <h3>Образование</h3>
              <ul>
                <li>2010 — врач, Государственное образовательное учреждение высшего профессионального образования «УСМА», г. Иркутск</li>
                <li>2011 — интернатура по специальности «Хирург», «УСМА», г. Иркутск</li>
              </ul>
            </div>

            <div className="section-txt">
              <h3>Повышение квалификации</h3>
              <ul>
                <li>2013 — специализация «Хирург», УСМА</li>
                <li>2015 — аккредитация по специальности «Хирург»</li>
                <li>2016 — курс «Экспертиза временной нетрудоспособности», УСМА</li>
              </ul>
            </div>

            <div className="section-txt">
              <h3>Опыт работы</h3>
              <ul>
                <li>2012–2019 — Врач общей практики, Поликлиника №2, Иркутская городская больница</li>
                <li>С 2019 года — Врач общей практики, Медицинская клиника</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <section id='review' className="review-form-section">
        <h3>Поделитесь мнением</h3>
        <div className='rev-forms'>
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <button key={i} className="star" aria-label={`${i + 1} звезда`}>★</button>
            ))}
          </div>

          <textarea
            placeholder="Опишите, как прошел прием: помог ли специалист решить проблему качество приема (внимательность, сервис), будете ли еще обращаться и рекомендовать специалиста"
            className="review-textarea"
          ></textarea>

          <label className="consent-label">
            <input type="checkbox" className="consent-checkbox" />
            <a href="#" className="consent-link"><span>Я даю</span> Согласие на сбор и обработку персональных данных</a>
          </label>

          <div className="review-buttons">
            <button className="btn btn-primary">Написать отзыв</button>
            <button className="btn btn-link">Отмена</button>
          </div>

          <p className="agreement-note">
            Нажимая кнопку “Написать отзыв”, вы принимаете <a href="#" className="consent-link">условия Пользовательского соглашения</a>
          </p>
        </div>
      </section>

      <section className="reviews-list-section">
        <h3>Проверенные отзывы</h3>

        <div className="reviews-list">
          {(doctor.reviewsList || []).map((review, idx) => (
            <article key={idx} className="review-item">
              <div className="review-header">
                <img src={documentIcon} alt="Пользователь" className="user-avatar" />
                <p className="user-name">{review.userName}</p>
              </div>
              <p className="review-text">{review.text}</p>
              <time className="review-date">{review.date}</time>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
