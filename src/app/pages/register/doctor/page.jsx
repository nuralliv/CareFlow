import Image from "next/image";
import Doctor from "../../../images/Doctor.png"; 
import { FaInstagram, FaFacebook, FaTwitter, FaGoogle } from "react-icons/fa";
import "../../../styles/registeDoctor.css"; 

export default function RegisterPage() {
    return (
        <div className="container">
            <div className="left">
                <h1 className="heading">Я здесь, чтобы помогать</h1>
                <Image
                    src={Doctor}
                    alt="Doctor"
                    width={300}
                    className="image"
                />
            </div>

            <div className="right">
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
                    <FaGoogle className="icon" />
                    <FaFacebook className="icon" />
                    <FaTwitter className="icon" />
                </div>

                <div className="buttons">
                    <button className="primary">Зарегистрироваться</button>
                    <button className="secondary">Отмена</button>
                </div>

                <p className="loginText">
                    Уже есть аккаунт? <a href="/login">Войти</a>
                </p>
            </div>
        </div>
    );
}
