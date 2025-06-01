"use client";
import React, { useState } from "react";
import Header from "@/app/components/atoms/Header/Header";
import Footer from "@/app/components/atoms/Footer/Footer";
import "./doctors.css";

const doctorsData = [
   {
      id: 1,
      name: "Жумагулова Гульмира Асизовна",
      experience: "Стаж 30 лет",
      specialties: ["Маммолог", "Акушер", "Гинеколог"],
      reviews: 13,
      rating: 5.0,
      priceOld: "14 000 тенге",
      priceNew: "3 500 тенге",
      clinicName: "Эмирмед",
      clinicAddress: "Алматы, ул. Манаса, 53а",
      avatarUrl: "", // серый круг
   },
   {
      id: 2,
      name: "Иванов Иван Иванович",
      experience: "Стаж 20 лет",
      specialties: ["Кардиолог"],
      reviews: 10,
      rating: 4.8,
      priceOld: "15 000 тенге",
      priceNew: "5 000 тенге",
      clinicName: "МедЦентр",
      clinicAddress: "Алматы, ул. Абая, 12",
      avatarUrl: "",
   },
   {
      id: 3,
      name: "Петрова Ольга Сергеевна",
      experience: "Стаж 15 лет",
      specialties: ["Терапевт"],
      reviews: 8,
      rating: 4.5,
      priceOld: "12 000 тенге",
      priceNew: "4 000 тенге",
      clinicName: "Клиника Здоровье",
      clinicAddress: "Алматы, пр. Достык, 45",
      avatarUrl: "",
   },
   {
      id: 4,
      name: "Сидоров Алексей Петрович",
      experience: "Стаж 25 лет",
      specialties: ["Невролог"],
      reviews: 20,
      rating: 5.0,
      priceOld: "18 000 тенге",
      priceNew: "6 000 тенге",
      clinicName: "НевроМед",
      clinicAddress: "Алматы, ул. Назарбаева, 78",
      avatarUrl: "",
   },
   {
      id: 5,
      name: "Козлова Марина Андреевна",
      experience: "Стаж 18 лет",
      specialties: ["Гинеколог"],
      reviews: 17,
      rating: 4.9,
      priceOld: "14 000 тенге",
      priceNew: "4 500 тенге",
      clinicName: "Эмирмед",
      clinicAddress: "Алматы, ул. Манаса, 53а",
      avatarUrl: "",
   },
   {
      id: 6,
      name: "Николаев Сергей Викторович",
      experience: "Стаж 22 года",
      specialties: ["Кардиолог"],
      reviews: 14,
      rating: 4.7,
      priceOld: "15 000 тенге",
      priceNew: "5 200 тенге",
      clinicName: "МедЦентр",
      clinicAddress: "Алматы, ул. Абая, 12",
      avatarUrl: "",
   },
   // добавь столько докторов, сколько нужно
];

const ITEMS_PER_PAGE = 5;

export default function DoctorsPage() {
   const [selectedDirection, setSelectedDirection] = React.useState(null);
   const [selectedSpecialist, setSelectedSpecialist] = React.useState(null);
   const [selectedSorting, setSelectedSorting] = React.useState(null);

   // Пагинация
   const [currentPage, setCurrentPage] = React.useState(1);
   const totalPages = Math.ceil(doctorsData.length / ITEMS_PER_PAGE);

   // Отфильтрованные врачи (заглушка - пока без фильтрации)
   const filteredDoctors = doctorsData;

   const paginatedDoctors = filteredDoctors.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
   );

   return (
      <>
         <Header />
         <div className="doctors-page-container">
            <h1 className="page-title">Врач акушер-гинеколог в Таразе</h1>
            <p className="page-subtitle">
               Лучшие акушер-гинекологи в Таразе – цены, отзывы. Записаться онлайн и
               проконсультироваться
            </p>

            <div className="filters-row">
               <FilterDropdown
                  title="Направление"
                  options={["Кардиология", "Неврология", "Терапия", "Гинекология"]}
                  selected={selectedDirection}
                  setSelected={setSelectedDirection}
               />
               <FilterDropdown
                  title="Специалист"
                  options={["Акушер", "Кардиологи", "Доктор"]}
                  selected={selectedSpecialist}
                  setSelected={setSelectedSpecialist}
               />
               <FilterDropdown
                  title="Сортировать"
                  options={["Много отзывов", "Высокие оценки", "Большой стаж", "Сначала дешевле"]}
                  selected={selectedSorting}
                  setSelected={setSelectedSorting}
               />
            </div>

            <div className="doctors-list">
               {paginatedDoctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
               ))}
            </div>

            {/* Пагинация */}
            <Pagination
               totalPages={totalPages}
               currentPage={currentPage}
               setCurrentPage={setCurrentPage}
            />
         </div>
         <Footer />
      </>
   );
}

function FilterDropdown({ title, options, selected, setSelected }) {
   const [open, setOpen] = React.useState(false);

   const toggleOpen = () => setOpen(!open);

   const onSelect = (option) => {
      setSelected(option === selected ? null : option);
      setOpen(false);
   };

   return (
      <div className="filter-dropdown">
         <button className="filter-button" onClick={toggleOpen}>
            {title} {selected ? `: ${selected}` : ""} ▼
         </button>
         {open && (
            <div className="dropdown-menu">
               {options.map((option) => (
                  <div
                     key={option}
                     className={`dropdown-item ${selected === option ? "selected" : ""}`}
                     onClick={() => onSelect(option)}
                  >
                     {selected === option && "✓ "} {option}
                  </div>
               ))}
            </div>
         )}
      </div>
   );
}

function DoctorCard({ doctor }) {
   return (
      <div className="doctor-card">
         <div className="avatar-container">
            {doctor.avatarUrl ? (
               <img src={doctor.avatarUrl} alt={doctor.name} className="avatar" />
            ) : (
               <div className="avatar-placeholder" />
            )}
         </div>

         <div className="doctor-info">
            <h2 className="doctor-name">{doctor.name}</h2>
            <div className="doctor-meta">
               <span>{doctor.experience}</span>
               <span> • </span>
               <span>{doctor.specialties.join(" • ")}</span>
            </div>
            <div className="reviews-rating">
               <span>{doctor.reviews} отзывов</span>
               <span>⭐ {doctor.rating.toFixed(1)}</span>
            </div>

            <div className="appointment-info">
               <div className="price-old">{doctor.priceOld}</div>
               <div className="price-new">{doctor.priceNew}</div>
            </div>

            <div className="clinic-info">
               <strong>{doctor.clinicName}</strong>
               <div>{doctor.clinicAddress}</div>
            </div>

            <div className="schedule">
               <div className="dates-row">
                  <div className="date-item">вт 13</div>
                  <div className="date-item active">ср 14</div>
                  <div className="date-item">чт 15</div>
                  <div className="date-item">пт 16</div>
                  <div className="date-item disabled">сб 17</div>
                  <div className="date-item disabled">вс 18</div>
                  <div className="date-item disabled">пн 19</div>
               </div>
               <div className="times-row">
                  {[
                     "00:00",
                     "01:00",
                     "02:00",
                     "03:00",
                     "04:00",
                     "05:00",
                     "06:00",
                     "07:00",
                     "08:00",
                     "...",
                  ].map((time) => (
                     <button key={time} className="time-button">
                        {time}
                     </button>
                  ))}
               </div>
               <div className="call-info">Вам перезвонят для подтверждения записи</div>
            </div>

            <button className="sign-up-button">Записаться 📞</button>
         </div>
      </div>
   );
}

function Pagination({ totalPages, currentPage, setCurrentPage }) {
   const pages = [];
   for (let i = 1; i <= totalPages; i++) pages.push(i);

   return (
      <div className="pagination">
         {pages.map((page) => (
            <button
               key={page}
               className={`page-btn ${page === currentPage ? "active" : ""}`}
               onClick={() => setCurrentPage(page)}
               disabled={page === currentPage}
            >
               {page}
            </button>
         ))}
      </div>
   );
}
