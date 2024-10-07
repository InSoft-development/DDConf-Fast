import React from 'react';

const Checkbox = ({
    name,
    register,
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
                {...register(name)}
                className='hidden'
                autoComplete='off'
            />
        </>
    );
}

export default Checkbox;