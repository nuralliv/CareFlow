import { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';

export default function DoctorProfile({ doctor }) {
  const [review, setReview] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleAppointment = async () => {
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ doctorId: doctor.id, date: new Date().toISOString() })
      });
      if (!res.ok) throw new Error();
      alert('Вы успешно записались на приём!');
    } catch {
      alert('Произошла ошибка при записи.');
    }
  };

  const handleReview = async () => {
    try {
      const res = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ doctorId: doctor.id, review, date: new Date().toISOString() })
      });
      if (!res.ok) throw new Error();
      setReviewSubmitted(true);
      alert('Спасибо за ваш отзыв!');
    } catch {
      alert('Не удалось отправить отзыв.');
    }
  };

  return (
    <>
      <Head>
        <title>{doctor.name}</title>
      </Head>
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.leftPanel}>
            <Image
              src={doctor.imageUrl}
              alt={doctor.name}
              width={120}
              height={120}
              style={{ borderRadius: '50%' }}
            />
            <h2>{doctor.name}</h2>
            <p><strong> {doctor.rating}/5</strong><br />На основе {doctor.reviewsCount} отзывов</p>
            <p><strong>Специализация:</strong> {doctor.specialization}</p>
            <p><strong>Опыт работы:</strong> {doctor.experience} лет</p>
            <p><strong>Первичный приём:</strong> {doctor.price} ₸</p>

            <button onClick={handleAppointment} style={styles.primaryButton}>Записаться на приём</button>

            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder='Напишите ваш отзыв'
              rows={4}
              style={{ width: '100%', marginTop: '10px', padding: '8px' }}
            />
            <button
              onClick={handleReview}
              style={styles.secondaryButton}
              disabled={reviewSubmitted || !review}
            >
              {reviewSubmitted ? 'Отзыв отправлен' : 'Оставить отзыв'}
            </button>
          </div>

          <div style={styles.rightPanel}>
            <section>
              <h3>Образование</h3>
              <ul>{doctor.education.map((e, i) => <li key={i}>{e}</li>)}</ul>
            </section>
            <section>
              <h3>Повышение квалификации</h3>
              <ul>{doctor.training.map((e, i) => <li key={i}>{e}</li>)}</ul>
            </section>
            <section>
              <h3>Опыт работы</h3>
              <ul>{doctor.experienceDetails.map((e, i) => <li key={i}>{e}</li>)}</ul>
            </section>
            <section>
              <h3>Документы</h3>
              <ul>{doctor.documents.map((doc, i) => (
                <li key={i}><a href={doc.link} target='_blank'>{doc.title}</a></li>
              ))}</ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch('https://your-backend.com/api/doctor/1');
  const doctor = await res.json();

  return { props: { doctor } };
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f6ff',
    minHeight: '100vh'
  },
  card: {
    display: 'flex',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    maxWidth: '1000px',
    margin: 'auto'
  },
  leftPanel: {
    flex: '0 0 300px',
    padding: '20px',
    borderRight: '1px solid #eee',
    textAlign: 'center'
  },
  rightPanel: {
    flex: '1',
    padding: '20px'
  },
  primaryButton: {
    backgroundColor: '#2f66ff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    marginTop: '10px',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  secondaryButton: {
    backgroundColor: 'white',
    color: '#2f66ff',
    border: '2px solid #2f66ff',
    padding: '10px 20px',
    marginTop: '10px',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};
