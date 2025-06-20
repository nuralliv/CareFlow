"use client";

import { useState } from "react";
import { auth, db } from "@/app/firebaseConfig";
import { ref, update } from "firebase/database";
import { useRouter } from "next/navigation";
import BtnBorder from "@/app/components/atoms/btnBorder/btnBorder";
import Button from "@/app/components/atoms/Button/Button";
import Options from "@/app/components/atoms/Options/Options";
import Image from "next/image";
import GroupImg from "@/app/images/GroupImg.png";
import './workTime.css'

const options = ["Утро (08:00 – 12:00)", "День (12:00 – 17:00)", "Вечер (17:00 – 21:00)"];

export default function WorkTimePage() {
    const router = useRouter();
    const [selected, setSelected] = useState(null);
    const user = auth.currentUser;

    const saveAndFinish = async () => {
        if (!user) {
            alert("Ошибка: пользователь не авторизован");
            return;
        }
        if (selected) {
            await update(ref(db, `doctors/${user.uid}`), { workTime: selected });
        }
        alert("Регистрация завершена!");
        router.push("/"); // сюда редирект на главную или профиль
    };

    const skip = () => {
        router.push("/");
    };

    return (
        <section className="container">
            <main className="wtleft">
                <Image src={GroupImg} width={140} height={140} className="group-img1" alt="group-img" />

                <div className="head-texts">
                    <p>Поможем настроить ваш личный кабинет.</p>
                    <h2>Рабочее время:</h2>
                </div>

                <div className="options-spe">
                    {options.map(label => (
                        <Options
                            key={label}
                            label={label}
                            className={selected === label ? "selected" : ""}
                            onClick={() => setSelected(label)}
                        />
                    ))}
                </div>

                <div className="btns">
                    <BtnBorder label="Пропустить" className="btn-skip" onClick={skip} />
                    <Button label="Завершить" className="btn-next" onClick={saveAndFinish} disabled={!selected} />
                </div>

                <Image src={GroupImg} width={140} height={140} className="group-img2" alt="group-img" />
            </main>

            <main className="wtright">
                <h1 className="cf">CF</h1>
                <p className="cf-text">
                    CareFlow — медицинский веб-сайт и <br /> приложение, созданные для удобства клиник, <br /> врачей и пациентов.
                </p>
            </main>
        </section>
    );
}
