"use client";

import Image from "next/image";
import Patient from "@/app/images/Patient-login-img.png";
import { FaFacebook, FaTwitter, FaGoogle } from "react-icons/fa";
import "./loginPatient.css";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebaseConfig";
import { useRouter } from "next/navigation";

import BtnBorder from "@/app/components/atoms/btnBorder/btnBorder";
import Button from "@/app/components/atoms/Button/Button";

export default function LoginPatient() {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const handleCancel = () => {
        router.push("/pages/login");
    };
    const onLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            return;
        }
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/pages/main"); // или куда нужно после входа
        } catch (error) {
            alert("Ошибка входа: " + error.message);
        } finally {
            setLoading(false);
        }
    }; return (
        < div className="container" >
            <div className="pleft">
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

                    <div className="butt">
                        <Button label={loading ? "Вход..." : "Войти"} className="btnLogin" disabled={loading} />
                        <BtnBorder onClick={handleCancel} label="Отмена" />
                    </div>


                </form>
                <p className="loginText">
                    Нет аккаунта? <a href="/patient/register">Зарегистрироваться</a>
                </p>
            </div>

            <div className="pright">
                <h1 className="heading">Я ищу медицинскую помощь</h1>
                <Image src={Patient} alt="Patient" width={300} className="image" />
            </div>
        </div >
    );
}