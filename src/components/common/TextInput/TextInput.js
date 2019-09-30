import React from 'react';
import './TextInput.css';

const TextInput = ({ label, value, touched, isValid, error, onChange, config }) => {
    return (
        <div className={`field ${!isValid && touched ? 'error': ''}`}>
            {
                label &&
                <label>
                    {label}
                </label>
            }
            {
                !isValid && touched && <p className="error-message">{error}</p>
            }
            <input
                value={value}
                onChange={onChange}
                {...config}
            />
        </div>
    )
};

export default TextInput;