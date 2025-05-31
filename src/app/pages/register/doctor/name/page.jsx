import Image from "next/image";
import Doctor from "../../../../images/Doctor.png";
import { FaFacebook, FaTwitter, FaGoogle } from "react-icons/fa";
import "./name.css";
import BtnBorder from "@/app/components/atoms/btnBorder/btnBorder";
import Button from "@/app/components/atoms/Button/Button";

export default function DoctorNamePage() {
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
                    <label htmlFor="text">ФИО</label>
                    <input
                        className="input"
                        type="text"
                        placeholder="Введите ФИО"
                    />

                    <label htmlFor="text">Номер телефона</label>
                    <input
                        type="text"
                        placeholder="Введите ваш номер телефона"
                    />

                    <label htmlFor="text">Адрес</label>
                    <input
                        type="text"
                        placeholder="Введите ваше рабочее место"
                    />
                </form>

                <div className="socialIcons">
                </div>

                <div className="buttons">
                    <Button
                        label="Зарегистрироваться"
                        className="btnRegister"
                    />
                    <BtnBorder label="Отмена" />
                </div>

                <p className="loginText">
                    Уже есть аккаунт? <a href="/login">Войти</a>
                </p>
            </div>
        </div>
    );
}
