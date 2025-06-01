"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ref, onValue } from "firebase/database";
import { db } from "@/app/firebaseConfig";
import './DoctorProfile.css';
import documentIcon from '@/app/images/fi-br-document.svg';
import btnBack from '@/app/images/Button.svg';
import Link from 'next/link';
import Image from 'next/image';

export default function DoctorProfile() {
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
                src={doctor.avatarUrl || "/doctor-avatar.jpg"}
                alt={`Фото доктора ${doctor.fullName}`}
                className="avatar"
              />
              <h2 className="doctor-name">{doctor.fullName}</h2>
              <div>
                <div className="rating">
                  {"★".repeat(Math.floor(doctor.rating)) + "☆".repeat(5 - Math.floor(doctor.rating))}{" "}
                </div>
                <p className="reviews-count">На основе {doctor.reviews || 0} отзывов</p>
              </div>

              <div className="info">
                <p><span>Специализация:</span> {doctor.speciality || "-"}</p>
                <p><span>Опыт работы:</span> {doctor.experience || "-"}</p>
                <p><span>Первичный приём:</span> {doctor.priceNew || "-"}</p>
              </div>

              <div className="buttons-group">
                <button className="btn btn-primary">Записаться на приём</button>
                <Link href='#review' className="btn btn-outline">
                  <div className='w-full h-full flex justify-center align-middle'>Оставить отзыв</div>
                </Link>
              </div>
            </div>
          </div>

          <div className="profile-right">
            <div className="section">
              <h3>Образование</h3>
              <ul>
                {(doctor.education || []).map((edu, idx) => (
                  <li key={idx}>{edu}</li>
                ))}
              </ul>
            </div>

            <div className="section">
              <h3>Повышение квалификации</h3>
              <ul>
                {(doctor.certificates || []).map((cert, idx) => (
                  <li key={idx}>{cert}</li>
                ))}
              </ul>
            </div>

            <div className="section">
              <h3>Опыт работы</h3>
              <ul>
                {(doctor.workExperience || []).map((work, idx) => (
                  <li key={idx}>{work}</li>
                ))}
              </ul>
            </div>

            <div className="section documents">
              <h3>Документы</h3>
              <div className="documents-grid">
                {(doctor.documents || []).map((doc, idx) => (
                  <div className="doc-item" key={idx}>
                    <Image src={documentIcon} alt='Document' width={32} height={32} />
                    <div>
                      <p className="doc-title">{doc.title}</p>
                      <a href={doc.url || "#"} className="doc-link" target="_blank" rel="noopener noreferrer">Открыть документ</a>
                    </div>
                  </div>
                ))}
              </div>
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
            Я даю <a href="#" className="consent-link">Согласие на сбор и обработку персональных данных</a>
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
