import "./work.css";
import BtnBorder from "@/app/components/atoms/btnBorder/btnBorder";
import Button from "@/app/components/atoms/Button/Button";
import Image from "next/image";
import GroupImg from "@/app/images/GroupImg.png";
import Options from "@/app/components/atoms/Options/Options";

export default function DoctorSpecialityPage() {
    return (
        <section className="container">
            <main className="left">
                <Image src={GroupImg} width={130} height={130} className="group-img1" alt="group-img"/>

                <div className="head-texts">
                    <p>Поможем настроить ваш личный кабинет.</p>
                    <h2>В каком направлении вы работаете?</h2>
                </div>

                <div className="options-spe">
                    <Options label="Кардиология" className="" />
                    <Options label="Неврология" className="" />
                    <Options label="Терапия" className="" />
                    <Options label="Гинекология" className="" />
                </div>

                <div className="btns">
                    <BtnBorder label="Пропустить" className="btn-skip" />
                    <Button label="Дальше" className="btn-next" />
                </div>

                <Image src={GroupImg} width={130} height={130} className="group-img2" alt="group-img"/>
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
