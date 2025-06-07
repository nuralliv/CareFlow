"use client";

import { useState } from "react";
import { auth, db } from "@/app/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, update } from "firebase/database";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DoctorImg from "@/app/images/Doctor.png";
import { FaFacebook, FaTwitter, FaGoogle } from "react-icons/fa";
import BtnBorder from "@/app/components/atoms/btnBorder/btnBorder";
import Button from "@/app/components/atoms/Button/Button";
import "../../../styles/registeDoctor.css";

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const handleCancel = () => {
        router.push("/pages/login");
    };
    const onRegister = async () => {
        if (!email || !password) {
            alert("Введите email и пароль");
            return;
        }
        if (password !== confirm) {
            alert("Пароли не совпадают");
            return;
        }
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Записываем базовые данные сразу
            await update(ref(db, `doctors/${user.uid}`), {
                uid: user.uid,
                email: user.email,
                role: "doctor",
            });

            router.push("/pages/register/doctor/name");
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="dleft">
                <h1 className="heading">Я здесь, чтобы помогать</h1>
                <Image src={DoctorImg} alt="Doctor" width={300} className="image" />
            </div>

            <div className="dright">
                <div className="dright-top">
                    <h1 className="heading">Я здесь, чтобы помогать</h1>
                    <Image src={DoctorImg} alt="Doctor" width={300} className="image" />
                </div>
                <div className="dright-bottom"><h1 className="heading">Добро пожаловать! Давайте начнём.</h1>
                    <form className="form" onSubmit={e => { e.preventDefault(); onRegister(); }}>
                        <label htmlFor="email">Email</label>
                        <input
                            className="input"
                            type="email"
                            id="email"
                            placeholder="Введите ваш email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />

                        <label htmlFor="password">Пароль</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Введите ваш пароль"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />

                        <label htmlFor="confirm">Подтверждение пароля</label>
                        <input
                            type="password"
                            id="confirm"
                            placeholder="Введите пароль повторно"
                            value={confirm}
                            onChange={e => setConfirm(e.target.value)}
                            required
                        />

                        <div className="socialIcons">
                            <div className="iconDiv"><FaGoogle className="icon" /></div>
                            <div className="iconDiv"><FaFacebook className="icon" /></div>
                            <div className="iconDiv"><FaTwitter className="icon" /></div>
                        </div>

                        <div className="buttNs ">
                            <Button label={loading ? "Регистрация..." : "Зарегистрироваться"} className="btnRegister" disabled={loading} />
                            <BtnBorder className="btnCancel" onClick={handleCancel} label="Отмена" />
                        </div>
                    </form>
                    <p className="loginText">Уже есть аккаунт? <a href="/pages/login/loginDoctor">Войти</a></p></div>
            </div>
        </div>
    );
}
