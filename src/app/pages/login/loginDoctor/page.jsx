import Image from "next/image";
import Doctor from "/public/images/Doctor.png";
import { FaFacebook, FaTwitter, FaGoogle } from "react-icons/fa";
import "./loginDoctor.css";
import Button from "@/app/components/atoms/Button/Button";
import BtnBorder from "@/app/components/atoms/btnBorder/btnBorder";

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
                <h1 className="heading">
                    Пожалуйста, войдите в систему, <br /> чтобы продолжить.
                </h1>

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
                    <Button label="Войти" className="btnLogin" />
                    <BtnBorder label="Отмена" />
                </div>

                <p className="loginText">
                    Нет аккаунта? <a href="/login">Зарегистрироваться</a>
                </p>
            </div>
        </div>
    );
}
