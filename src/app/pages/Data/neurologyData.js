import brain from "@/app/images/Brain.png"
import userIcon from "@/app/images/Majid-Akbari.png"

export const neurologySpecialty = {
    title: "Неврология",
    emoji: brain,
    subtitle:
        "Профессиональная помощь при головной боли, бессоннице и стрессах",
    description:
        "Неврология — это направление медицины, которое занимается лечением заболеваний нервной системы. Наши врачи-неврологи помогут вам вернуть ясность мышления, спокойствие сна и жизненную энергию.",
    whenToVisit: [
        "Постоянная усталость и снижение концентрации",
        "Судороги, онемение конечностей",
        "Шум в ушах, потемнение в глазах",
        "Хронический стресс и бессонница",
        "Тремор (дрожание) рук или головы",
    ],
    whatWeTreat: [
        "Хронические и острые головные боли, мигрени",
        "Бессонница, тревожность, панические атаки",
        "Последствия стрессов и эмоционального выгорания",
        "Остеохондроз, боли в спине и шее",
        "Радикулит, невралгия, онемение конечностей",
        "Головокружения, нарушения координации",
        "Восстановление после инсультов и ЧМТ",
    ],
};

export const neurologyDoctors = [
    {
        id: 1,
        name: "Шишкин Арсений Павлович",
        specialization: "Хирург",
        experience: 15,
        price: 4800,
        rating: 4.5,
        reviews: 120,
        image: userIcon,
    },
    {
        id: 2,
        name: "Калиева Аружан Жанатовна",
        specialization: "Невролог",
        experience: 10,
        price: 5500,
        rating: 4.8,
        reviews: 96,
        image: userIcon,
    },
    {
        id: 3,
        name: "Нурланов Тимур Ермекович",
        specialization: "Невролог",
        experience: 12,
        price: 5000,
        rating: 4.7,
        reviews: 88,
        image: userIcon,
    },
    {
        id: 4,
        name: "Нурланов Тимур Ермекович",
        specialization: "Невролог",
        experience: 12,
        price: 5000,
        rating: 4.7,
        reviews: 88,
        image: userIcon,
    },
];
