import React from "react";
import "./Footer.css";
import Image from "next/image";
import call from "@/app/images/call.svg";
import pochta from "@/app/images/pochta.svg";
import location from "@/app/images/location.svg";
import footer from "@/app/images/footicon.svg";
import Icon from "@/app/images/Icon.svg";
import Link from "next/link";
import inst from "@/app/images/insta.svg"
import facebook from "@/app/images/facebook.svg"
import twitter from "@/app/images/twitter.svg"

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-column">
                    <h2>Подписка на новости</h2>
                    <p>
                        Подпишитесь на рассылку, чтобы получать последние
                        новости и обновления. Мы не рассылаем спам.
                    </p>
                    <div className="newsletter-input">
                        <input type="email" placeholder="Введите ваш email" />
                        <Image className="foot-icon" src={footer}/>
                    </div>
                </div>

                <div className="footer-column">
                    <h2>Компания</h2>
                    <ul>
                        <li>Про нас</li>
                        <li>Новости</li>
                        <li>Сервисы</li>
                        <li>Докторы</li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h2>Услуги</h2>
                    <ul>
                        <li>Кардиология</li>
                        <li>Неврология</li>
                        <li>Терапия</li>
                        <li>Гинекология</li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h2>Контакты</h2>
                    <ul>
                        <li className="ic">
                            <Image className="icons" src={call} /> +7 (771) 537
                            7055
                        </li>
                        <li className="ic">
                            <Image className="icons" src={pochta} />{" "}
                            careflow@gmail.com
                        </li>
                        <li className="ic">
                            <Image className="icons" src={location} />{" "}
                            Казахстан, Тараз, ул. Пушкина 154
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer-logo">
                <div className="logo-section">
                    <Image src={Icon} alt="CareFlow Logo" className="logo" height={24} />
                    <span className="logo-txt">CareFlow</span>
                </div>
                <span className="foot-txt">2025 Все права защищены.</span>
                <div className="footer-socials">
                    <Link href="#"><Image src={inst}/></Link>
                    <Link href="#"><Image src={twitter}/></Link>
                    <Link href="#"><Image src={facebook}/></Link>
                </div>
            </div>
        </footer>
    );
}
