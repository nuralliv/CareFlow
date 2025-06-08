"use client";

import { useState } from "react";
import Image from "next/image";
import Patient from "@/app/images/Patient-login-img.png";
import BtnBorder from "@/app/components/atoms/btnBorder/btnBorder";
import Button from "@/app/components/atoms/Button/Button";
import { useRouter } from "next/navigation";
import { auth, db } from "@/app/firebaseConfig";
import { ref, update } from "firebase/database";
import "./patientName.css";

export default function PatientNamePage() {
    const router = useRouter();
    const user = auth.currentUser;

    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("8");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePhoneChange = (e) => {
        let val = e.target.value.replace(/\D/g, "");
        if (val.length > 11) val = val.slice(0, 11);
        if (!val.startsWith("8")) val = "8" + val.slice(1);
        setPhone(val);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!fullName.trim()) {
            alert("Введите ФИО");
            return;
        }
        if (phone.length !== 11) {
            alert("Номер телефона должен содержать 11 цифр и начинаться с 8");
            return;
        }
        if (!address.trim()) {
            alert("Введите адрес");
            return;
        }
        if (!user) {
            alert("Пользователь не авторизован");
            return;
        }

        setLoading(true);
        try {
            // Обновляем данные пациента в базе, добавляем role
            await update(ref(db, `patients/${user.uid}`), {
                fullName: fullName.trim(),
                phone,
                address: address.trim(),
                role: "patient",
                uid: user.uid,
                email: user.email,
                isPatient: true,
            });

            router.push("/pages/register/patient/interested-to");
        } catch (error) {
            alert("Ошибка сохранения данных: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const onCancel = () => {
        router.push("/pages/register/patient");
    };

    return (
        <div className="container">
            <div className="left">
                <div className="left-top"><h1 className="heading">Я ищу медицинскую помощь</h1>
                    <Image src={Patient} alt="Patient" width={300} className="image" /></div>
                <div className="left-bottom">
                    <h1 className="heading">Добро пожаловать! Давайте начнём.</h1>
                    <form className="form" onSubmit={onSubmit}>
                        <label htmlFor="fullname">ФИО</label>
                        <input
                            className="input"
                            id="fullname"
                            type="text"
                            placeholder="Введите ФИО"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                        <label htmlFor="phone">Номер телефона</label>
                        <input
                            className="input"
                            id="phone"
                            type="text"
                            placeholder="Введите ваш номер телефона"
                            value={phone}
                            onChange={handlePhoneChange}
                            maxLength={11}
                            required
                        />
                        <label htmlFor="address">Адрес</label>
                        <input
                            className="input"
                            id="address"
                            type="text"
                            placeholder="Введите ваш адрес"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                        <div className="buttNs">
                            <Button label={loading ? "Сохранение..." : "Зарегистрироваться"} className="btnRegister" disabled={loading} />
                            <BtnBorder label="Отмена" className="btnCancel" onClick={onCancel} />
                        </div>
                    </form>
                    <p className="loginText">
                        Уже есть аккаунт? <a href="/patient/login">Войти</a>
                    </p>
                </div>
            </div>

            <div className="right">
                <h1 className="heading">Я ищу медицинскую помощь</h1>
                <Image src={Patient} alt="Patient" width={300} className="image" />
            </div>
        </div>
    );
}
