"use client";
import React, { useState } from "react";
import "./dropdown.css";


export default function NavDropdown({ label, options = [] }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="nav-dropdown" onMouseLeave={() => setOpen(false)}>
            <button
                className="nav-button"
                onMouseEnter={() => setOpen(true)}
            >
                {label} ▾
            </button>
            {open && (
                <div className="dropdown-menu">
                    {options.map((item, index) => (
                        <div key={index} className="dropdown-item">
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
