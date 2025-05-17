import styles from "@/app/styles/loginPage.css";
import Image from "next/image";
import Doctor from "../../images/Doctor.png";
import Patient from "../../images/Patient-login-img.png";
import Button from "@/app/components/atoms/Button/Button";

export default function Home() {
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

                <Button label="Регистрация как Доктор" />
                <p className="has-acc">
                    Уже есть аккаунт?{" "}
                    <a href="" className="login">
                        Войти
                    </a>
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
                    <Button label="Регистрация как Пациент" />
                </div>
                <p className="has-acc to-top">
                    Уже есть аккаунт?{" "}
                    <a href="/login" className="login">
                        Войти
                    </a>
                </p>
            </main>
        </section>
    );
}
