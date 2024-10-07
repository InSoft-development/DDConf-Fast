import React from 'react';

const Select = ({
    defaultValue,
    options,
    name,
    register,
    width = 400
}) => {
    return (
        <select
            name={name} 
            id={name} 
            defaultValue={defaultValue}
            className='input'
            {...register(name)}
            style={{
                width: width
            }}
        >
            {options.map(({value, text}, index) => (
                <option key={index} value={value}>{text}</option>
            ))}
        </select>
    );
}

export default Select;
