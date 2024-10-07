import React from 'react';

const Number = ({
    width = 400,
    placeholder = '',
    name,
    register
}) => {
    return (
        <input type="number" 
            id={name}
            name={name}
            {...register(name)}
            className='input'
            placeholder={placeholder}
            style={{
                width: width
            }}
            autoComplete='off'
        />
    );
}

export default Number;