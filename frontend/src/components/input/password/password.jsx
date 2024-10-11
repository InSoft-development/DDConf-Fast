import React from 'react';

const Password = ({
    width = 400,
    height = 40,
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
                width: width,
                height: height
            }}
            autoComplete='new-password'
        />
    );
}

export default Password;
