import Image from "next/image";
import Patient from "@/app/images/Patient-login-img.png";
import { FaFacebook, FaTwitter, FaGoogle } from "react-icons/fa";
import "./patientRegister.css";
import BtnBorder from "@/app/components/atoms/btnBorder/btnBorder";
import Button from "@/app/components/atoms/Button/Button";

export default function RegisterPage() {
    return (
        <div className="container">
            <div className="left">
                
                <h1 className="heading">Добро пожаловать! Давайте начнём.</h1>

                <form className="form">
                    <label htmlFor="email">Email</label>
                    <input
                        className="input"
                        type="email"
                        id="email"
                        placeholder="Введите ваш email"
                    />

                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Введите ваш пароль"
                    />

                    <label htmlFor="confirm">Пароль</label>
                    <input
                        type="password"
                        id="confirm"
                        placeholder="Введите пароль повторно"
                    />

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

                <div className="buttons">
                    <Button
                        label="Зарегистрироваться"
                        className="btnRegister"
                    />
                    <BtnBorder label="Отмена" />
                </div>

                <p className="loginText">
                    Уже есть аккаунт? <a href="">Войти</a>
                </p>
            </div>

            <div className="right">

                <h1 className="heading">Я ищу медицинскую помощь</h1>
                <Image
                    src={Patient}
                    alt="Doctor"
                    width={300}
                    className="image"
                />

            </div>
        </div>
    );
}
