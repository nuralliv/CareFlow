"use client";

import React, { useState, useEffect } from "react";
import { auth, db, storage } from "@/app/firebaseConfig";
import { ref as dbRef, onValue, update } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [userData, setUserData] = useState({
    fullName: "",
    speciality: "",
    experience: "",
    priceNew: "",
    clinicName: "",
    address: "",
    avatarUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      router.push("/pages/login");
      return;
    }

    const userRef = dbRef(db, `doctors/${user.uid}`);
    const unsubscribe = onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        setUserData(snapshot.val());
      } else {
        setUserData({});
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const user = auth.currentUser;
    if (!user) return;

    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const avatarStorageRef = storageRef(storage, `avatars/${user.uid}/${file.name}`);
      await uploadBytes(avatarStorageRef, file);
      const downloadURL = await getDownloadURL(avatarStorageRef);
      setUserData((prev) => ({ ...prev, avatarUrl: downloadURL }));
    } catch (error) {
      alert("Ошибка при загрузке фото: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return alert("Пользователь не авторизован");

    const userRef = dbRef(db, `doctors/${user.uid}`);

    try {
      await update(userRef, userData);
      alert("Данные успешно сохранены!");
    } catch (error) {
      alert("Ошибка при сохранении: " + error.message);
    }
  };

  if (loading) return <p>Загрузка данных...</p>;

  return (
    <div className="profile-container" style={{ padding: 20 }}>
      <h1>Мой профиль</h1>

      <div>
        <label>Фото профиля:</label><br />
        {userData.avatarUrl ? (
          <img
            src={userData.avatarUrl}
            alt="avatar"
            width={120}
            height={120}
            style={{ borderRadius: "50%" }}
          />
        ) : (
          <div style={{ width: 120, height: 120, backgroundColor: "#ccc", borderRadius: "50%" }} />
        )}
        <br />
        <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} />
        {uploading && <p>Загрузка...</p>}
      </div>

      <div>
        <label>Полное имя:</label><br />
        <input type="text" name="fullName" value={userData.fullName || ""} onChange={handleChange} />
      </div>

      <div>
        <label>Специализация:</label><br />
        <input type="text" name="speciality" value={userData.speciality || ""} onChange={handleChange} />
      </div>

      <div>
        <label>Опыт:</label><br />
        <input type="text" name="experience" value={userData.experience || ""} onChange={handleChange} />
      </div>

      <div>
        <label>Цена приёма:</label><br />
        <input type="text" name="priceNew" value={userData.priceNew || ""} onChange={handleChange} />
      </div>

      <div>
        <label>Клиника:</label><br />
        <input type="text" name="clinicName" value={userData.location || ""} onChange={handleChange} />
      </div>

      <div>
        <label>Адрес:</label><br />
        <input type="text" name="address" value={userData.address || ""} onChange={handleChange} />
      </div>

      <button onClick={handleSave} style={{ marginTop: 20 }}>
        Сохранить
      </button>
    </div>
  );
}
