"use client";
import React, { useEffect, useState } from "react";
import { auth, db } from "@/app/firebaseConfig";
import { onValue, push, ref } from "firebase/database";
import "./appointment.css";


export default function AppointmentModal({ onClose }) {
  const [userData, setUserData] = useState({
    fullName: "",
    phone: "",
    email: ""
  });
  const [specialty, setSpecialty] = useState("Кардиология");
  const [doctorList, setDoctorList] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [successModal, setSuccessModal] = useState(false); 
  const [cancelModal, setCancelModal] = useState(false);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        const doctorRef = ref(db, `doctors/${uid}`);
        onValue(doctorRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setUserData({
              fullName: data.fullName || "",
              phone: data.phone || "",
              email: data.email || ""
            });
          } else {
            const patientRef = ref(db, `patients/${uid}`);
            onValue(patientRef, (snap) => {
              if (snap.exists()) {
                const data = snap.val();
                setUserData({
                  fullName: data.fullName || "",
                  phone: data.phone || "",
                  email: data.email || ""
                });
              }
            });
          }
        });
      }
    });

    const doctorsRef = ref(db, "doctors");
    onValue(doctorsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const list = Object.values(data).map((doc) => doc.fullName);
        setDoctorList(list);
        setSelectedDoctor(list[0] || "");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    if (!date || !time || !selectedDoctor || !specialty) {
      alert("Пожалуйста, заполните все обязательные поля.");
      return;
    }

    const newAppointment = {
      fullName: userData.fullName,
      phone: userData.phone,
      email: userData.email,
      specialty,
      doctor: selectedDoctor,
      date,
      time,
      symptoms,
      timestamp: new Date().toISOString(),
    };

    try {
      await push(ref(db, "appointments"), newAppointment);
       const doctorsRef = ref(db, "doctors");
//     onValue(doctorsRef, (snapshot) => {
//       if (snapshot.exists()) {
//         const doctors = snapshot.val();
//         const doctorEntry = Object.entries(doctors).find(
//           ([_, value]) => value.fullName === selectedDoctor
//         );

//         // if (doctorEntry) {
//         //   const doctorUid = doctorEntry[0];

//         //   const notificationRef = ref(db, `notifications/${doctorUid}`);
//         //   push(notificationRef, {
//         //     message: `Новая запись от пациента ${userData.fullName}`,
//         //     date: newAppointment.date,
//         //     time: newAppointment.time,
//         //     specialty: newAppointment.specialty,
//         //     symptoms: newAppointment.symptoms,
//         //     timestamp: new Date().toISOString(),
//         //   });
//         // }
//         if (doctorEntry) {
//   const doctorUid = doctorEntry[0];
//   console.log("Врач найден, UID:", doctorUid); // ⬅️ Добавь

//   // Уведомление врачу
//   const notificationRef = ref(db, `notifications/${doctorUid}`);
//   push(notificationRef, {
//     message: `Новая запись от пациента ${userData.fullName}`,
//     date: newAppointment.date,
//     time: newAppointment.time,
//     specialty: newAppointment.specialty,
//     symptoms: newAppointment.symptoms,
//     timestamp: new Date().toISOString(),
//   });
// } else {
//   console.warn("Врач не найден по имени:", selectedDoctor); // ⬅️ если не нашли
// }


//       }
//     }, {
//       onlyOnce: true
//     });
onValue(doctorsRef, (snapshot) => {
      if (snapshot.exists()) {
        const doctorsData = snapshot.val();

        const doctorEntry = Object.entries(doctorsData).find(
          ([uid, value]) => value.fullName === selectedDoctor
        );

        if (doctorEntry) {
          const doctorUid = doctorEntry[0];

          const notificationRef = ref(db, `notifications/${doctorUid}`);
          push(notificationRef, {
            message: `Пациент ${userData.fullName} записался к вам на приём`,
            date,
            time,
            specialty,
            symptoms,
            timestamp: new Date().toISOString(),
          });

          console.log("Уведомление отправлено врачу:", doctorUid);
        } else {
          console.warn("Не найден врач с именем:", selectedDoctor);
        }
      }
    }, {
      onlyOnce: true
    });
setSuccessModal(true);
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
    }
  };

  return (
    <div className="modal-overlay">
  <div className="modal-content">
    <h2>Записаться на приём</h2>
    <div className="modal-form">

      <div className="form-row">
        <div className="form-group">
          <label>ФИО</label>
          <input type="text" value={userData.fullName} readOnly />
        </div>
        <div className="form-group">
          <label>Номер телефона</label>
          <input type="tel" value={userData.phone} readOnly />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={userData.email} readOnly />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Выберите направление</label>
          <select value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
            <option>Кардиология</option>
            <option>Неврология</option>
            <option>Гинекология</option>
            <option>Терапия</option>
          </select>
        </div>
        <div className="form-group">
          <label>Выберите врача</label>
          <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
            {doctorList.map((doc, idx) => (
              <option key={idx}>{doc}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
  <div className="form-group">
    <label className="field-label">Дата приёма</label>
    <input
      type="date"
      className="custom-date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
    />
  </div>

  <div className="form-group">
    <label className="field-label">Время приёма</label>
    <input
      type="time"
      className="custom-time"
      value={time}
      onChange={(e) => setTime(e.target.value)}
    />
  </div>
</div>


      <div className="form-group">
        <label>Комментарий / жалобы</label>
        <textarea
          placeholder="Укажите симптомы, если нужно"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        ></textarea>
      </div>

      <div className="modal-buttons">
        <button className="cancel-btn" onClick={() => setCancelModal(true)}>Отмена</button>
        <button className="submit-btn" onClick={handleSubmit}>Отправить заявку</button>
      </div>

      <p className="modal-policy">
        Нажимая кнопку «Отправить заявку», вы соглашаетесь с{" "}
        <a href="#">Политикой конфиденциальности</a>.
      </p>
    </div>
    

    {successModal && (
  <div className="modal-overlay">
    <div className="modal-content success-modal">
      <h2>Ваша встреча успешно записана!</h2>
      <p>
        Спасибо! Запись на встречу прошла успешно. <br />
        В ближайшее время вы получите сообщение в WhatsApp для подтверждения и уточнения деталей.
      </p>
      <button className="success-btn" onClick={() => {
        setSuccessModal(false);
        onClose();
      }}>
        Ясно!
      </button>
    </div>
  </div>
)}


{cancelModal && (
  <div className="modal-overlay">
    <div className="modal-content cancel-modal">
      <h2>Вы уверены, что хотите прекратить встречу?</h2>
      <p>
        Вы ещё не завершили запись встречи. <br />
        Если вы прекратите сейчас, все введённые данные будут потеряны и встреча не будет сохранена.
      </p>

      <div className="btn-group">
        <button className="btn-stop" onClick={onClose}>Прекратить встречу</button>
        <button className="btn-continue" onClick={() => setCancelModal(false)}>Продолжить</button>
      </div>
    </div>
  </div>
)}

  </div>
</div>

  );
}
