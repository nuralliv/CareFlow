import Image from "next/image";
import Patient from "@/app/images/Patient-login-img.png";
import { FaFacebook, FaTwitter, FaGoogle } from "react-icons/fa";
import "./patientName.css";
import BtnBorder from "@/app/components/atoms/btnBorder/btnBorder";
import Button from "@/app/components/atoms/Button/Button";

export default function PatientNamePage() {
    return (
        <div className="container">
            <div className="left">
                
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
