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

const options = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

export default function WorkDaysPage() {
    const router = useRouter();
    const [selected, setSelected] = useState([]);
    const user = auth.currentUser;

    const toggleOption = (label) => {
        if (selected.includes(label)) {
            setSelected(selected.filter(item => item !== label));
        } else {
            setSelected([...selected, label]);
        }
    };

    const saveAndNext = async () => {
        if (!user) {
            alert("Ошибка: пользователь не авторизован");
            return;
        }
        if (selected.length) {
            await update(ref(db, `doctors/${user.uid}`), { workDays: selected });
        }
        router.push("/pages/register/doctor/work-time");
    };

    const skip = () => {
        router.push("/pages/register/doctor/work-time");
    };

    return (
        <section className="container">
            <main className="left">
                <Image src={GroupImg} width={130} height={130} className="group-img1" alt="group-img" />

                <div className="head-texts">
                    <p>Поможем настроить ваш личный кабинет.</p>
                    <h2>Рабочие дни:</h2>
                </div>

                <div className="options-spe">
                    {options.map(label => (
                        <Options
                            key={label}
                            label={label}
                            className={selected.includes(label) ? "selected" : ""}
                            onClick={() => toggleOption(label)}
                        />
                    ))}
                </div>

                <div className="btns">
                    <BtnBorder label="Пропустить" className="btn-skip" onClick={skip} />
                    <Button label="Дальше" className="btn-next" onClick={saveAndNext} disabled={selected.length === 0} />
                </div>

                <Image src={GroupImg} width={130} height={130} className="group-img2" alt="group-img" />
            </main>

            <main className="right">
                <h1 className="cf">CF</h1>
                <p className="cf-text">
                    CareFlow — медицинский веб-сайт и <br /> приложение, созданные для удобства клиник, <br /> врачей и пациентов.
                </p>
            </main>
        </section>
    );
}
