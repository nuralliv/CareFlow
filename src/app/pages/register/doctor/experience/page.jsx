import "./experience.css";
import BtnBorder from "@/app/components/atoms/btnBorder/btnBorder";
import Button from "@/app/components/atoms/Button/Button";
import Image from "next/image";
import GroupImg from "@/app/images/GroupImg.png";
import Options from "@/app/components/atoms/Options/Options";

export default function RegisterPage() {
    return (
        <section className="container">
            <main className="left">
                <Image src={GroupImg} width={140} height={140} className="group-img1" alt="group-img"/>

                <div className="head-texts">
                    <p>Поможем настроить ваш личный кабинет.</p>
                    <h2>Опыт работы:</h2>
                </div>

                <div className="options-spe">
                    <Options label="До 1 года" className="" />
                    <Options label="1–3 года" className="" />
                    <Options label="3–5 лет" className="" />
                    <Options label="Более 5 лет" className="" />
                </div>

                <div className="btns">
                    <BtnBorder label="Пропустить" className="btn-skip" />
                    <Button label="Дальше" className="btn-next" />
                </div>

                <Image src={GroupImg} width={140} height={140} className="group-img2" alt="group-img"/>
            </main>

            <main className="right">
                <h1 className="cf">CF</h1>
                <p className="cf-text">
                    CareFlow — медицинский веб-сайт и <br /> приложение,
                    созданные для удобства клиник, <br /> врачей и пациентов.
                </p>
            </main>
        </section>
    );
}
