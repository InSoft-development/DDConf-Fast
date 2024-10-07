import React from 'react';

const Textarea = ({
    register,
    name,
    resize = 'vertical',
    maxHeight = 200,
    placeholder = ''
}) => {
    return (
        <textarea
            name={name}
            id={name}
            {...register(name)}
            className='input'
            style={{
                resize: resize,
                maxHeight: maxHeight,
                minHeight: 60
            }}
            placeholder={placeholder}
        ></textarea>
    );
}

export default Textarea;
