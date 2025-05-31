"use client";

import { useState } from "react";
import { auth } from '@/app/firebaseConfig'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import "../../../styles/registeDoctor.css";

export default function RegisterPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);

    const role = typeof window !== "undefined" ? localStorage.getItem("role") : null;

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
            localStorage.setItem("role", role ?? "patient");
            router.push("/pages/register/doctor/experience");
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="left">
                <h1 className="heading">Я здесь, чтобы помогать</h1>
            </div>

            <div className="right">
                <h1 className="heading">Добро пожаловать! Давайте начнём.</h1>

                <form className="form" onSubmit={(e) => { e.preventDefault(); onRegister(); }}>
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

                    <label htmlFor="confirm">Подтверждение пароля</label>
                    <input
                        type="password"
                        id="confirm"
                        placeholder="Введите пароль повторно"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        required
                    />

                    <button type="submit" className="btnRegister" disabled={loading}>
                        {loading ? "Регистрация..." : "Зарегистрироваться"}
                    </button>
                </form>
            </div>
        </div>
    );
}
