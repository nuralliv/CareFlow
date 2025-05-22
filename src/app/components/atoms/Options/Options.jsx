import './options.css';

export default function Options({ label, disabled = false, className = "", ...props }) {
    return (
        <button
            className={`options ${className}`}
            disabled={disabled}
            {...props}
        >
            {label}
        </button>
    );
}