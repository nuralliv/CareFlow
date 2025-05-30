"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/app/firebaseConfig";
import { ref, set } from "firebase/database";

import Options from "@/app/components/atoms/Options/Options";
import BtnBorder from "@/app/components/atoms/btnBorder/btnBorder";
import Button from "@/app/components/atoms/Button/Button";
import Image from "next/image";
import GroupImg from "@/app/images/GroupImg.png";

const options = ["Терапевт", "Педиатр", "Стоматолог", "Хирург", "Кардиолог", "Другое"];

export default function SpecialityPage() {
    const router = useRouter();
    const [selected, setSelected] = useState(null);
    const user = auth.currentUser;

    const saveAndNext = async () => {
        if (!user) {
            alert("Ошибка: пользователь не авторизован");
            return;
        }
        if (selected) {
            await set(ref(db, `users/${user.uid}/speciality`), selected);
        }
        router.push("/pages/register/doctor/work-days");
    };

    const skip = () => {
        router.push("/pages/register/doctor/work-days");
    };

    return (
        <section className="container">
            <main className="left">
                <Image src={GroupImg} width={130} height={130} className="group-img1" alt="group-img" />

                <div className="head-texts">
                    <p>Поможем настроить ваш личный кабинет.</p>
                    <h2>Ваша специальность:</h2>
                </div>

                <div className="options-spe">
                    {options.map((label) => (
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
                    <Button label="Дальше" className="btn-next" onClick={saveAndNext} disabled={!selected} />
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
