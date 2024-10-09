import React from 'react';

const Password = ({
    width = 400,
    placeholder = '',
    name,
    value,
    onChange,
    className = ''
}) => {
    return (
        <input type="password" 
            id={name}        
            name={name}
            value={value || ''}
            onChange={onChange}
            className={`input ${className}`}
            placeholder={placeholder}
            style={{
                width: width
            }}
            autoComplete='new-password'
        />
    );
}

export default Password;
