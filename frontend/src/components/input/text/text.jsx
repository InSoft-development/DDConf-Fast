import React from 'react';

const Text = ({
    width = 400,
    placeholder = '',
    name,
    register,
    className = ''
}) => {
    return (
        <input type="text" 
            id={name}
            name={name}
            {...register(name)}
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
