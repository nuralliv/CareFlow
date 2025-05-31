"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/app/firebaseConfig";
import { ref, update } from "firebase/database";
import BtnBorder from "@/app/components/atoms/btnBorder/btnBorder";
import Button from "@/app/components/atoms/Button/Button";
import Options from "@/app/components/atoms/Options/Options";
import Image from "next/image";
import GroupImg from "@/app/images/GroupImg.png";
import "./what-prefer.css";

const options = ["Онлайн", "Очная встреча", "Пока не знаю"];

export default function WhatPreferPage() {
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const user = auth.currentUser;

  const onSelect = (label) => setSelected(label);

  const saveAndFinish = async () => {
    if (!user) {
      alert("Пожалуйста, войдите в систему");
      return;
    }
    if (selected) {
      await update(ref(db, `patients/${user.uid}`), {
        consultationFormat: selected,
        isPatient: true,
        email: user.email,
        uid: user.uid,
      });
    }
    alert("Регистрация пациента завершена!");
    router.push("/"); // Редирект куда надо
  };

  const skip = () => {
    router.push("/");
  };

  return (
    <section className="container">
      <main className="left">
        <Image src={GroupImg} width={130} height={130} alt="group-img" />

        <div className="head-texts">
          <p>Расскажите немного о себе.</p>
          <h2>Какой формат консультаций вы предпочитаете?</h2>
        </div>

        <div className="options-spe">
          {options.map((label) => (
            <Options
              key={label}
              label={label}
              className={selected === label ? "selected" : ""}
              onClick={() => onSelect(label)}
            />
          ))}
        </div>

        <div className="btns">
          <BtnBorder label="Пропустить" className="btn-skip" onClick={skip} />
          <Button label="Завершить" className="btn-next" onClick={saveAndFinish} disabled={!selected} />
        </div>

        <Image src={GroupImg} width={130} height={130} alt="group-img" />
      </main>

      <main className="right">
        <h1 className="cf">CF</h1>
        <p className="cf-text">
          CareFlow — медицинский веб-сайт и <br />
          приложение, созданные для удобства клиник, <br />
          врачей и пациентов.
        </p>
      </main>
    </section>
  );
}
