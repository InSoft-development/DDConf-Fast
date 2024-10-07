import React from 'react';

const Password = ({
    width = 400,
    placeholder = '',
    name,
    register,
    className = ''
}) => {
    return (
        <input type="password" 
            id={name}        
            name={name}
            {...register(name)}
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
