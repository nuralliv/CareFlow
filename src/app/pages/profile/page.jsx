"use client";
import React, { useState } from "react";
import Image from "next/image";
import profilePic from "@/app/images/user.png";
import "./profile.css";
import Button from "@/app/components/atoms/Button/Button";
import BtnDelete from "@/app/components/atoms/BtnDelete/BtnDelete";

export default function DoctorProfile() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        birthDate: "",
        phoneNumber: "",
        experience: "",
        position: "",
        servicePrice: "",
        clinicAddress: "",
        diploma: "",
        certification: "",
        qualification: "",
        awards: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0]?.name });
    };

    return (
        <div className="container">
            <div className="header">
                <div className="profile-info">
                    <Image
                        src={profilePic}
                        alt="Profile"
                        width={70}
                        height={70}
                        className="avatar"
                    />
                    <div>
                        <h2>Аяулым Ахтанберды</h2>
                        <p>Врач - Кардиолог</p>
                    </div>
                </div>
                <div className="buttons">
                    <Button label="Загрузить новое фото"/>
                    <BtnDelete label="Удалить"/>
                </div>
            </div>

            <div className="section">
                <h3>Личная информация</h3>
                <div className="form-row">
                    <input
                        name="firstName"
                        placeholder="Имя"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <input
                        name="lastName"
                        placeholder="Фамилия"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <input
                        name="birthDate"
                        placeholder="Дата рождения"
                        value={formData.birthDate}
                        onChange={handleChange}
                    />
                    <input
                        name="phoneNumber"
                        placeholder="Номер телефона"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="section">
                <h3>Профессиональные данные</h3>
                <div className="form-row">
                    <input
                        name="experience"
                        placeholder="Опыт работы"
                        value={formData.experience}
                        onChange={handleChange}
                    />
                    <input
                        name="position"
                        placeholder="Должность"
                        value={formData.position}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <input
                        name="servicePrice"
                        placeholder="Цена за услуги"
                        value={formData.servicePrice}
                        onChange={handleChange}
                    />
                    <input
                        name="clinicAddress"
                        placeholder="Место приёма"
                        value={formData.clinicAddress}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="section">
                <h3>Профессиональные данные</h3>
                <div className="form-row">
                    <label>
                        Диплом об образовании:{" "}
                        <input
                            type="file"
                            name="diploma"
                            onChange={handleFileChange}
                        />
                    </label>
                    <label>
                        Лицензии и сертификаты:{" "}
                        <input
                            type="file"
                            name="certification"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        Удостоверение о повышении квалификации:{" "}
                        <input
                            type="file"
                            name="qualification"
                            onChange={handleFileChange}
                        />
                    </label>
                    <label>
                        Награды, грамоты:{" "}
                        <input
                            type="file"
                            name="awards"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
}
