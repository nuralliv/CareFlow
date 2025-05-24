
import React from "react";
import "./button.css";

export default function Button({ label,  onClick,  disabled = false, className = "", ...props }) {
    return (
        <button
            className={`custom-button ${className}`}
            disabled={disabled}
            {...props}
            onClick={onClick}

        >
            {label}
        </button>
    );
}
