
import React from "react";
import "./btnBorder.css";

export default function BtnBorder({ label, disabled = false, className = "", ...props }) {
    return (
        <button
            className={`border-button ${className}`}
            disabled={disabled}
            {...props}
        >
            {label}
        </button>
    );
}