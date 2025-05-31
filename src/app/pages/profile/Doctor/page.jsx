
"use client";
import React from 'react'
import './DoctorProfile.css';
import documentIcon from '@/app/images/fi-br-document.svg';
import btnBack from '@/app/images/Button.svg';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


export default function DoctorProfile() {
  const router = useRouter();
  return (
    <div className="container">
      <div className='flex flex-col'>
        <div className="pro-head">
          <button onClick={() => router.back()}><Image src={btnBack} alt='Btn back' width={45} height={45} /></button>
          Специалисты
        </div>
        <section className="profile-card">
          
          <div className="profile-left">
            <div className='profle-left-content'>
              <img src="/doctor-avatar.jpg" alt="Фото доктора" className="avatar" />
              <h2 className="doctor-name">Шишкин Арсений Павлович</h2>
              <div><div className="rating">★★★★☆ <span className="rating-value">4.5/5</span></div>
                <p className="reviews-count">На основе 120 отзывов</p></div>


              <div className="info">
                <p><span>Специализация:</span> Хирург</p>
                <p><span>Опыт работы:</span> 15 лет</p>
                <p><span>Первичный приём:</span> 4 800 ₸</p>
              </div>

              <div className="buttons-group">
                <button className="btn btn-primary">Записаться на приём</button>
                <Link href='#review' className="btn btn-outline"><div className='w-full h-full flex justify-center align-middle'>Оставить отзыв</div></Link>
              </div>
            </div>

          </div>

          <div className="profile-right">
            <div className="section">
              <h3>Образование</h3>
              <ul>
                <li>2010 — Государственное образовательное учреждение высшего профессионального образования «УСМА», г. Иркутск</li>
                <li>2011 — интернатура по специальности «Хирург», «УСМА», г. Иркутск</li>
              </ul>
            </div>

            <div className="section">
              <h3>Повышение квалификации</h3>
              <ul>
                <li>2013 — специализация «Хирург», УСМА</li>
                <li>2015 — аккредитация по специальности «Хирург»</li>
                <li>2016 — курс «Экспертиза временной нетрудоспособности», УСМА</li>
              </ul>
            </div>

            <div className="section">
              <h3>Опыт работы</h3>
              <ul>
                <li>2012–2019 — Врач общей практики, Поликлиника №2, Иркутская городская больница</li>
                <li>С 2019 года — Врач общей практики, Медицинская клиника</li>
              </ul>
            </div>

            <div className="section documents">
              <h3>Документы</h3>
              <div className="documents-grid">
                <div className="doc-item">
                  <Image src={documentIcon} alt='Document' width={32} height={32} />
                  <div>
                    <p className="doc-title">Сертификат специалиста (Хирург)</p>
                    <a href="#" className="doc-link">Открыть документ</a>
                  </div>
                </div>
                <div className="doc-item">
                  <Image src={documentIcon} alt='Document' width={32} height={32} />

                  <div>
                    <p className="doc-title">Удостоверение о повышении квалификации</p>
                    <a href="#" className="doc-link">Открыть документ</a>
                  </div>
                </div>
                <div className="doc-item">
                  <Image src={documentIcon} alt='Document' width={32} height={32} />
                  <div>
                    <p className="doc-title">Диплом</p>
                    <a href="#" className="doc-link">Открыть документ</a>
                  </div>
                </div>
                <div className="doc-item">
                  <Image src={documentIcon} alt='Document' width={32} height={32} />

                  <div>
                    <p className="doc-title">Удостоверение личности</p>
                    <a href="#" className="doc-link">Открыть документ</a>
                  </div>
                </div>
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
          {[1, 2].map((i) => (
            <article key={i} className="review-item">
              <div className="review-header">
                <img src={documentIcon} alt="Пользователь" className="user-avatar" />
                <p className="user-name">Байкенже Бибигуль Сериковна</p>
              </div>
              <p className="review-text">
                Отзыв: Я получила необходимые услуги, которые мне помогли! У меня была аллергия, поэтому врач-аллерголог Мунира Заирова прописала мне действенное лечение. Еще могу отметить, что доктор чудесно все рассказала и прекрасно общалась со мной во время приема...
              </p>
              <time className="review-date">1 августа 2025</time>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}


