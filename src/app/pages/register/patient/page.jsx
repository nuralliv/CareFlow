"use client";

import Image from "next/image";
import Patient from "@/app/images/Patient-login-img.png";
import { FaFacebook, FaTwitter, FaGoogle } from "react-icons/fa";
import BtnBorder from "@/app/components/atoms/btnBorder/btnBorder";
import Button from "@/app/components/atoms/Button/Button";
import { useState } from "react";
import { auth, db } from "@/app/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { useRouter } from "next/navigation";
import "./patientRegister.css";

export default function PatientRegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const handleCancel = () => {
    router.push("/pages/login");
  };

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
      const user = userCredential.user;

      // Записываем базовые данные в patients/{uid}
      await set(ref(db, `patients/${user.uid}`), {
        uid: user.uid,
        email: user.email,
        isPatient: true,
      });

      router.push("/pages/register/patient/patient-name");
    } catch (error) {
      alert("Ошибка: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="left">
        <div className="left-top">
        <h1 className="heading">Я ищу медицинскую помощь</h1>
        <Image src={Patient} alt="Patient" width={300} className="image" />
        </div>
        <div className="left-bottom">
        <h1 className="heading">Добро пожаловать! Давайте начнём.</h1>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            onRegister();
          }}
        >
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
          <div className="flex w-full justify-center my-[25px] gap-5 align-middle">
            <div className="iconDiv"><FaGoogle className="icon" /></div>
            <div className="iconDiv"><FaFacebook className="icon" /></div>
            <div className="iconDiv"><FaTwitter className="icon" /></div>
          </div>
          <div className="buttNs ">
            <Button label={loading ? "Регистрация..." : "Зарегистрироваться"} className="btnRegister" disabled={loading} />
            <BtnBorder  className="btnCancel" onClick={handleCancel} label="Отмена" />
          </div>
        </form>
        <p className="loginText">Уже есть аккаунт? <a href="/pages/login/loginPatient">Войти</a></p>
        </div>
      </div>

      <div className="right">
        <h1 className="heading">Я ищу медицинскую помощь</h1>
        <Image src={Patient} alt="Patient" width={300} className="image" />
      </div>
    </div>
  );
}
