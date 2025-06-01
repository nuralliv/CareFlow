"use client";

import React, { createContext, useState, useContext } from "react";

const DoctorRegistrationContext = createContext();

export function DoctorRegistrationProvider({ children }) {
   const [doctorData, setDoctorData] = useState({ role: "doctor" });

   return (
      <DoctorRegistrationContext.Provider value={{ doctorData, setDoctorData }}>
         {children}
      </DoctorRegistrationContext.Provider>
   );
}

export function useDoctorRegistration() {
   const context = useContext(DoctorRegistrationContext);
   if (!context) {
      throw new Error(
         "useDoctorRegistration must be used within a DoctorRegistrationProvider"
      );
   }
   return context;
}