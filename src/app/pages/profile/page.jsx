"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./profile.css";
import Header from "@/app/components/atoms/Header/Header";
import Button from "@/app/components/atoms/Button/Button";
import BtnDelete from "@/app/components/atoms/BtnDelete/BtnDelete";
import UserIcon from "@/app/images/user.png";

import { auth, db } from "@/app/firebaseConfig";
import { ref as dbRef, onValue, update } from "firebase/database";

import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/app/firebaseConfig"; 

export default function ProfilePage() {
    const [uid, setUid] = useState(null);
    const [data, setData] = useState({
        fullName: "",
        surname: "",
        birthDate: "",
        phone: "",
        experience: "",
        position: "",
        servicePrice: "",
        location: "",
    });

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUid(user.uid);
                const doctorRef = dbRef(db, `doctors/${user.uid}`);
                onValue(doctorRef, (snapshot) => {
                    if (snapshot.exists()) {
                        setData(snapshot.val());
                    }
                });
            }
        });
        return () => unsubscribe();
    }, []);

    const handleChange = (field, value) => {
        setData((prev) => ({ ...prev, [field]: value }));
        if (uid) {
            update(dbRef(db, `doctors/${uid}`), { [field]: value });
        }
    };

    const handleFileUpload = async (field, file) => {
    if (!uid || !file) return;

    const filePath = `documents/${uid}/${field}.pdf`;
    const fileRef = storageRef(storage, filePath);

    try {
        await uploadBytes(fileRef, file);
        const downloadUrl = await getDownloadURL(fileRef);

        // Save URL to Realtime DB under doctors/{uid}/documents/{field}
        const updates = {};
        updates[`doctors/${uid}/documents/${field}`] = downloadUrl;
        await update(dbRef(db), updates);

        // Optionally update local state
        setData((prev) => ({
            ...prev,
            documents: {
                ...prev.documents,
                [field]: downloadUrl,
            },
        }));
    } catch (err) {
        console.error("Ошибка загрузки файла:", err);
    }
};


    return (
        <section className="profile-page">
            <Header className="qwer" />
            <main className="profile-section">
                <div className="profile-header">
                    <div className="profile-head">
                        <Image
                            src={UserIcon}
                            width={60}
                            height={60}
                            alt="avatar"
                        />
                        <div className="profile-name">
                            <h2>{data.fullName || "Имя Фамилия"}</h2>
                            <p>Врач – {data.position || "Специализация"}</p>
                        </div>
                    </div>
                    <div className="actions">
                        <Button label="Загрузить новое фото" />
                        <BtnDelete label="Удалить" />
                    </div>
                </div>

                <div className="info-block">
                    <h2>Личная информация</h2>
                    <div className="info-grid">
                        <Input
                            label="Имя"
                            placeholder="qwer"
                            value={data.fullName?.split(" ")[0]}
                            onChange={(e) =>
                                handleChange("fullName", e.target.value)
                            }
                        />
                        <Input
                            label="Фамилия"
                            value={data.surname}
                            onChange={(e) =>
                                handleChange("surname", e.target.value)
                            }
                        />
                        <Input
                            label="Дата рождения"
                            value={data.birthDate}
                            onChange={(e) =>
                                handleChange("birthDate", e.target.value)
                            }
                        />
                        <Input
                            label="Номер телефона"
                            value={data.phone}
                            onChange={(e) =>
                                handleChange("phone", e.target.value)
                            }
                        />
                    </div>
                </div>

                <div className="info-block">
                    <h2>Профессиональные данные</h2>
                    <div className="info-grid">
                        <Input
                            label="Опыт работы"
                            value={data.experience}
                            onChange={(e) =>
                                handleChange("experience", e.target.value)
                            }
                        />
                        <Input
                            label="Должность"
                            value={data.position}
                            onChange={(e) =>
                                handleChange("position", e.target.value)
                            }
                        />
                        <Input
                            label="Цена за услуги"
                            value={data.servicePrice}
                            onChange={(e) =>
                                handleChange("servicePrice", e.target.value)
                            }
                        />
                        <Input
                            label="Место приёма"
                            value={data.location}
                            onChange={(e) =>
                                handleChange("location", e.target.value)
                            }
                        />
                    </div>
                </div>

                <div className="info-block">
                    <h2>Профессиональные документы</h2>
                    {/* <div className="docs-grid">
                        {["diploma", "license", "qualification", "awards"].map(
                            (docKey, i) => (
                                <div key={i} className="doc-upload">
                                    <label>
                                        {docKey === "diploma"
                                            ? "Диплом"
                                            : docKey === "license"
                                            ? "Лицензия"
                                            : docKey === "qualification"
                                            ? "Квалификация"
                                            : "Грамоты"}
                                    </label>
                                    <input type="file" accept=".pdf" />
                                    <p className="doc-placeholder">docs.pdf</p>
                                </div>
                            )
                        )}
                    </div> */}
                    <div className="docs-grid">
  {["diploma", "license", "qualification", "awards"].map((docKey, i) => (
    <div key={i} className="doc-upload">
      <label className="doc-label">
        {docKey === "diploma"
          ? "Диплом"
          : docKey === "license"
          ? "Лицензия"
          : docKey === "qualification"
          ? "Квалификация"
          : "Грамоты"}
      </label>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => handleFileUpload(docKey, e.target.files[0])}
        className="doc-input"
      />

      <label htmlFor="upload-diploma">Загрузить диплом</label>
<input id="upload-diploma" type="file" style={{ display: "none" }} />


      {data.documents?.[docKey] && (
        <a
          href={data.documents[docKey]}
          target="_blank"
          rel="noreferrer"
          className="doc-placeholder"
        >
          docs.pdf
        </a>
      )}
    </div>
  ))}
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
            <input
                value={value || ""}
                placeholder=""
                onChange={onChange}
            />
        </div>
    );
}
