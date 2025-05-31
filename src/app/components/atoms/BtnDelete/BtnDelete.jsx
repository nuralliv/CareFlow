
import React from "react";
import "./BtnDelete.css";

export default function BtnDelete({ label,  onClick,  disabled = false, className = "", ...props }) {
    return (
        <button
            className={`btnDelete ${className}`}
            disabled={disabled}
            {...props}
            onClick={onClick}

        >
            {label}
        </button>
    );
}
