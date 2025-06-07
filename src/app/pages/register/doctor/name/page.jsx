"use client";

import { useState } from "react";
import { auth, db } from "@/app/firebaseConfig";
import { ref, update } from "firebase/database";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Doctor from "../../../../images/Doctor.png";
import BtnBorder from "@/app/components/atoms/btnBorder/btnBorder";
import Button from "@/app/components/atoms/Button/Button";
import "./name.css";

export default function DoctorNamePage() {
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("8"); // starts with 8
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const user = auth.currentUser;

    const onCancel = () => {
        router.push("/pages/register/doctor");
    };
    const validatePhone = (value) => {
        if (!value.startsWith("8")) {
            return "Номер должен начинаться с 8";
        }
        if (value.length !== 11) {
            return "Номер должен содержать 11 цифр";
        }
        return "";
    };

    const [phoneError, setPhoneError] = useState("");

    const onPhoneChange = (e) => {
        const val = e.target.value;
        if (val === "" || /^[0-9]*$/.test(val)) {
            setPhone(val);
            setPhoneError(validatePhone(val));
        }
    };

    const onSubmit = async () => {
        if (!user) {
            alert("Ошибка: пользователь не авторизован");
            return;
        }
        if (!fullName || !phone || !address) {
            alert("Заполните все поля");
            return;
        }
        if (phoneError) {
            alert(phoneError);
            return;
        }

        setLoading(true);
        try {
            await update(ref(db, `doctors/${user.uid}`), {
                fullName,
                phone,
                address,
            });
            router.push("/pages/register/doctor/experience");
        } catch (error) {
            alert("Ошибка при сохранении данных: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="dleft">
                <h1 className="heading">Я здесь, чтобы помогать</h1>
                <Image src={Doctor} alt="Doctor" width={300} className="image" />
            </div>

            <div className="dright">
                <div className="dright-top"><h1 className="heading">Я здесь, чтобы помогать</h1>
                    <Image src={Doctor} alt="Doctor" width={300} className="image" /></div>
                <div className="dright-bottom">
                    <h1 className="heading">Добро пожаловать! Давайте начнём.</h1>
                    <form
                        className="form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            onSubmit();
                        }}
                    >
                        <label htmlFor="fullName">ФИО</label>
                        <input
                            className="input"
                            id="fullName"
                            type="text"
                            placeholder="Введите ФИО"
                            value={fullName}
                            onChange={e => setFullName(e.target.value)}
                            required
                        />

                        <label htmlFor="phone">Номер телефона</label>
                        <input
                            className="input"
                            id="phone"
                            type="text"
                            placeholder="Введите ваш номер телефона"
                            value={phone}
                            onChange={onPhoneChange}
                            maxLength={11}
                            required
                        />
                        {phoneError && <p style={{ color: "red", marginTop: "4px" }}>{phoneError}</p>}

                        <label htmlFor="address">Адрес</label>
                        <input
                            className="input"
                            id="address"
                            type="text"
                            placeholder="Введите ваше рабочее место"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            required
                        />

                        <div className="buttNs">
                            <Button label={loading ? "Сохранение..." : "Дальше"} className="btnRegister" disabled={loading} />
                            <BtnBorder className="btnCancel" onClick={onCancel}  label="Отмена" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
