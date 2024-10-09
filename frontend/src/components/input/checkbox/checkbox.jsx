import React from 'react';

const Checkbox = ({
    name,
    value,
    onChange,
    render
}) => {

    return (
        <>
            <label htmlFor={name}>
                {render()}
            </label>
            <input 
                type="checkbox"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className='hidden'
                autoComplete='off'
            />
        </>
    );
}

export default Checkbox;