"use client";
import styles from "@/app/styles/loginPage.css";
import Image from "next/image";
import Doctor from "../../images/Doctor.png";
import Patient from "../../images/Patient-login-img.png";
import Button from "@/app/components/atoms/Button/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    const handlePatientRegister = () => {
        router.push("/pages/register/patient");
    };
    const handleDoctorRegister = () => {
        router.push("/pages/register/doctor");
    };

    return (
        <section className="section">
            <main className="container-one">
                <h1 className="main-txt">Я здесь, чтобы помогать</h1>
                <Image
                    src={Doctor}
                    alt="Doctor"
                    width={310}
                    height={300}
                    className="first-img"
                />

                <Button
                    label="Регистрация как Доктор"
                    onClick={handleDoctorRegister}
                />
                <p className="has-acc">
                    Уже есть аккаунт?{" "}
                    <Link href="login/loginDoctor" className="login">
                        Войти
                    </Link>
                </p>
            </main>

            <main className="container-two">
                <h1 className="main-txt">Я ищу медицинскую помощь</h1>
                <Image
                    src={Patient}
                    alt="Doctor"
                    width={310}
                    height={300}
                    className="second-img"
                />
                <div className="to-top">
                    <Button
                        label="Регистрация как Пациент"
                        onClick={handlePatientRegister}
                    />
                </div>
                <p className="has-acc to-top">
                    Уже есть аккаунт?{" "}
                    <Link href="login/loginPatient" className="login">
                        Войти
                    </Link>
                </p>
            </main>
        </section>
    );
}
