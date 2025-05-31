"use client";

import Image from "next/image";
import Patient from "@/app/images/Patient-login-img.png";
import { FaFacebook, FaTwitter, FaGoogle } from "react-icons/fa";
import "./loginPatient.css";
import BtnBorder from "@/app/components/atoms/btnBorder/btnBorder";
import Button from "@/app/components/atoms/Button/Button";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebaseConfig";
import { useRouter } from "next/navigation";

export default function LoginPatient() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const onLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Введите email и пароль");
            return;
        }

        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/pages/profile/Patient"); // или куда нужно после входа
        } catch (error) {
            alert("Ошибка входа: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="left">
                <h1 className="heading">
                    Пожалуйста, войдите в систему, <br /> чтобы продолжить.
                </h1>

                <form className="form" onSubmit={onLogin}>
                    <label htmlFor="email">Email</label>
                    <input
                        className="input"
                        type="email"
                        id="email"
                        placeholder="Введите ваш email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Введите ваш пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <Button label={loading ? "Вход..." : "Войти"} className="patientBtn" disabled={loading} />
                </form>

                <div className="socialIcons">
                    <div className="iconDiv">
                        <FaGoogle className="icon" />
                    </div>
                    <div className="iconDiv">
                        <FaFacebook className="icon" />
                    </div>
                    <div className="iconDiv">
                        <FaTwitter className="icon" />
                    </div>
                </div>

                <BtnBorder label="Отмена" />

                <p className="loginText">
                    Нет аккаунта? <a href="/patient/register">Зарегистрироваться</a>
                </p>
            </div>

            <div className="right">
                <h1 className="heading">Я ищу медицинскую помощь</h1>
                <Image src={Patient} alt="Patient" width={300} className="image" />
            </div>
        </div>
    );
}
