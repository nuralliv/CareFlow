

"use client";
import React, { useEffect, useState } from "react";
import { db, auth } from "@/app/firebaseConfig";
import { onValue, ref } from "firebase/database";
import "./notifications.css";
import Header from "@/app/components/atoms/Header/Header";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const notiRef = ref(db, `notifications/${userId}`);
    onValue(notiRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const parsed = Object.values(data).reverse();
        setNotifications(parsed);
      } else {
        setNotifications([]);
      }
    });
  }, [userId]);

  return (
    <>
        <Header/>
      <div className="noti-page">
      <div className="noti-header">
        <h2>🔔 Уведомления о приёмах</h2>
      </div>

      <div className="noti-list">
        {notifications.length === 0 ? (
          <p className="no-noti">У вас пока нет уведомлений.</p>
        ) : (
          notifications.map((item, index) => (
            <div className="noti-card" key={index}>
              <div className="noti-title">
                <span className="noti-patient">👤 {item.fullName}</span>
                <span className="noti-time">
                   {new Date(item.timestamp).toLocaleString("ru-RU")}
                </span>
              </div>
              <div className="noti-message"> {item.message}</div>
              <div className="noti-meta">
                <span className="noti-date"> {item.date}</span>
                <span className="noti-clock"> {item.time}</span>
                <span className="noti-tag"> {item.specialty}</span>
              </div>
              {item.symptoms && (
                <p className="noti-symptoms"> Комментарий/жалобы: {item.symptoms}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
    </>
  );
}
