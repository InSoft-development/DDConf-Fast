import React from 'react';

const Checkbox = ({
    name,
    value,
    onChange,
    width = 40,
    height = 40,
    className = '',
    icon=''
}) => {

    return (
        <>
            <label 
                htmlFor={name}
                style={{
                    width: width,
                    height: height,
                }}
                className={className}
            >
                {icon}
            </label>
            <input 
                type="checkbox"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className={`hidden`}
                autoComplete='off'
            />
        </>
    );
}

export default Checkbox;