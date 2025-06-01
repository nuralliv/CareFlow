"use client";

import Image from "next/image";
import Doctor from "@/app/images/Doctor.png";
import { FaFacebook, FaTwitter, FaGoogle } from "react-icons/fa";
import "./loginDoctor.css";
import Button from "@/app/components/atoms/Button/Button";
import BtnBorder from "@/app/components/atoms/btnBorder/btnBorder";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebaseConfig";
import { useRouter } from "next/navigation";

export default function LoginDoctor() {
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
            // Можно добавить проверку роли в базе, если нужно
            router.push("/pages/main"); // или куда надо после логина
        } catch (error) {
            alert("Ошибка входа: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="left">
                <h1 className="heading">Я здесь, чтобы помогать</h1>
                <Image src={Doctor} alt="Doctor" width={300} className="image" />
            </div>

            <div className="right">
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

                    <Button label={loading ? "Вход..." : "Войти"} className="btnLogin" disabled={loading} />
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
                    Нет аккаунта? <a href="/doctor/register">Зарегистрироваться</a>
                </p>
            </div>
        </div>
    );
}
