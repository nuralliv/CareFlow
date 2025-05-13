import styles from '@/app/styles/loginPage.css'
import Image from 'next/image';
import Doctor from "../../images/Doctor.png"
import Patient from "../../images/Patient-login-img.png"

export default function Home() {
  return (
    <section className="section">
        <main className="container-one">
          <h1 className="main-txt">Я здесь, чтобы помогать</h1>
          <Image src={Doctor} alt="Doctor" width={310} height={300} className="first-img" />

          <a href="" className="btn-register">
            Регистрация как Доктор
          </a>
          <p className="has-acc">
            Уже есть аккаунт?{' '}
            <a href="/login" className="login">
              Войти
            </a>
          </p>
        </main>

        <main className="container-two">
          <h1 className="main-txt">Я ищу медицинскую помощь</h1>
          <Image src={Patient} alt="Doctor" width={310} height={300} className="second-img" />
          <a href="/register/patient" className="btn-register">
            Регистрация как Пациент
          </a>
          <p className="has-acc">
            Уже есть аккаунт?{' '}
            <a href="/login" className="login">
              Войти
            </a>
          </p>
      </main>
    </section>
  );
}