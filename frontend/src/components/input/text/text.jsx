import React from 'react';

const Text = ({
    width = 400,
    placeholder = '',
    name,
    value,
    onChange,
    className = ''
}) => {
    return (
        <input type="text" 
            id={name}
            name={name}
            value={value || ''}
            onChange={onChange}
            className={`input ${className}`}
            placeholder={placeholder}
            style={{
                width: width
            }}
            autoComplete='off'
        />
    );
}

export default Text;
