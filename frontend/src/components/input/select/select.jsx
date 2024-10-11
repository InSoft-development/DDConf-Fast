import React from 'react';

const Select = ({
    options,
    name,
    value,
    onChange,
    width = 400,
    height = 40
}) => {
    return (
        <select
            name={name} 
            id={name} 
            className='input'
            value={value || 'anonymous'}
            onChange={onChange}
            style={{
                width: width,
                height: height
            }}
        >
            {options.map(({value, text}, index) => (
                <option key={index} value={value}>{text}</option>
            ))}
        </select>
    );
}

export default Select;
