"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import "./profile.css";
import Header from "@/app/components/atoms/Header/Header";
import Button from "@/app/components/atoms/Button/Button";
import BtnDelete from "@/app/components/atoms/BtnDelete/BtnDelete";
import UserIcon from "@/app/images/user.png";

import { auth, db } from "@/app/firebaseConfig";
import { ref as dbRef, onValue, update } from "firebase/database";

export default function ProfilePage() {
    const [uid, setUid] = useState(null);
    const [originalData, setOriginalData] = useState(null);
    const [data, setData] = useState({
        fullName: "",
        surname: "",
        birthDate: "",
        phone: "",
        experience: "",
        position: "",
        priceNew: "",
        location: "",
        avatarBase64: "",  // ключ для Base64 картинки
        documents: {},
    });

    const [newAvatarFile, setNewAvatarFile] = useState(null);
    const [newAvatarPreview, setNewAvatarPreview] = useState(null);
    const avatarInputRef = useRef();

    // Загрузка данных
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUid(user.uid);
                const doctorRef = dbRef(db, `doctors/${user.uid}`);
                onValue(doctorRef, (snapshot) => {
                    if (snapshot.exists()) {
                        const val = snapshot.val();
                        setData(val);
                        setOriginalData(val);
                        setNewAvatarPreview(val.avatarBase64 || null);
                    }
                });
            } else {
                setUid(null);
                setData({});
                setOriginalData(null);
                setNewAvatarPreview(null);
            }
        });
        return () => unsubscribe();
    }, []);

    // Проверка изменений
    const hasChanges = () => {
        if (!originalData) return false;
        const keys = ["fullName", "surname", "birthDate", "phone", "experience", "position", "priceNew", "location"];
        for (const key of keys) {
            if ((data[key] || "") !== (originalData[key] || "")) return true;
        }
        // Проверяем фото
        if (newAvatarPreview !== (originalData.avatarBase64 || null)) return true;

        return false;
    };

    // Обновление текстовых данных
    const handleChange = (field, value) => {
        setData((prev) => ({ ...prev, [field]: value }));
    };

    // Конвертация файла в Base64
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };

    // Обработка выбора фото
    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const base64 = await fileToBase64(file);
            setNewAvatarFile(file);
            setNewAvatarPreview(base64);
            setData((prev) => ({ ...prev, avatarBase64: base64 }));
        }
    };

    // Удаление фото
    const handleDeleteAvatar = async () => {
        if (!uid) return;
        try {
            // Обновляем локальное состояние
            setNewAvatarFile(null);
            setNewAvatarPreview(null);
            setData((prev) => ({ ...prev, avatarBase64: "" }));
            // Обновляем базу, удаляем фото (ставим пустую строку)
            await update(dbRef(db, `doctors/${uid}`), { avatarBase64: "" });
            setOriginalData((prev) => ({ ...prev, avatarBase64: "" }));
            alert("Фото успешно удалено");
        } catch (error) {
            console.error("Ошибка удаления фото:", error);
            alert("Ошибка удаления фото");
        }
    };

    // Сохранение всех данных
    const handleSave = async () => {
        if (!uid) return;

        try {
            const updatedData = {
                ...data,
                avatarBase64: newAvatarPreview,
            };
            await update(dbRef(db, `doctors/${uid}`), updatedData);
            setOriginalData(updatedData);
            setNewAvatarFile(null);
            alert("Данные успешно сохранены");
        } catch (error) {
            console.error("Ошибка сохранения данных:", error);
            alert("Ошибка сохранения данных");
        }
    };

    // Запуск выбора файла
    const triggerAvatarInput = () => {
        if (avatarInputRef.current) avatarInputRef.current.click();
    };

    return (
        <section className="profile-page">
            <Header className="qwer" />
            <main className="profile-section">
                <div className="profile-header">
                    <div className="profile-head">
                        {newAvatarPreview ? (
                            <img
                                src={newAvatarPreview}
                                alt="avatar"
                                className="profile-avatar"
                                style={{ borderRadius: "50%", width: 60, height: 60, objectFit: "cover" }}
                            />
                        ) : (
                            <Image
                                src={UserIcon}
                                width={60}
                                height={60}
                                alt="avatar"
                                className="profile-avatar"
                                style={{ borderRadius: "50%" }}
                            />
                        )}

                        <input
                            ref={avatarInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            style={{ display: "none" }}
                        />


                        <div className="profile-name">
                            <h2>{data.fullName || "Имя Фамилия"}</h2>
                            <p>Врач – {data.position || "Специализация"}</p>
                        </div>
                        <Button label="Загрузить новое фото" onClick={triggerAvatarInput} />

                    </div>

                    <div className="actions">
                        <BtnDelete label="Удалить" onClick={handleDeleteAvatar} />
                        {hasChanges() && <Button label="Сохранить" onClick={handleSave} />}
                    </div>
                </div>

                <div className="info-block">
                    <h2>Личная информация</h2>
                    <div className="info-grid">
                        <Input label="Имя" value={data.fullName} onChange={(e) => handleChange("fullName", e.target.value)} />
                        <Input label="Фамилия" value={data.surname} onChange={(e) => handleChange("surname", e.target.value)} />
                        <Input label="Дата рождения" value={data.birthDate} onChange={(e) => handleChange("birthDate", e.target.value)} />
                        <Input label="Номер телефона" value={data.phone} onChange={(e) => handleChange("phone", e.target.value)} />
                    </div>
                </div>

                <div className="info-block">
                    <h2>Профессиональные данные</h2>
                    <div className="info-grid">
                        <Input label="Опыт работы" value={data.experience} onChange={(e) => handleChange("experience", e.target.value)} />
                        <Input label="Должность" value={data.position} onChange={(e) => handleChange("position", e.target.value)} />
                        <Input label="Цена за услуги" value={data.priceNew} onChange={(e) => handleChange("priceNew", e.target.value)} />
                        <Input label="Клиника" value={data.location} onChange={(e) => handleChange("location", e.target.value)} />
                    </div>
                </div>
            </main>
        </section>
    );
}

function Input({ label, value, onChange }) {
    return (
        <div className="input-field">
            <label>{label}</label>
            <input value={value || ""} onChange={onChange} />
        </div>
    );
}
