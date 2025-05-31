import React from "react";
import "./button.css";
import Image from "next/image";

export default function Button({
    label,
    icon,
    iconPosition = "right",
    onClick,
    disabled = false,
    className = "",
    ...props
}) {
    return (
        <button
            className={`custom-button ${className}`}
            disabled={disabled}
            {...props}
            onClick={onClick}
        >
            {label}
            {icon && iconPosition === "right" && (
                <span className="button-icon right">
                    <Image src={icon} alt="icon" width={16} height={16} />
                </span>
            )}
        </button>
    );
}
