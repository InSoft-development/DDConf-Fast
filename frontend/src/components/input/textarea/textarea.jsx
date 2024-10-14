import React from 'react';

const Textarea = ({
    name,
    value,
    onChange,
    resize = 'vertical',
    maxHeight = 200,
    placeholder = ''
}) => {
    return (
        <textarea
            name={name}
            id={name}
            value={value}
            onChange={onChange}
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
