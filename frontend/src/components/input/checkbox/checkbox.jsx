import React from 'react';
import styles from './checkbox.module.scss';
import classNames from 'classnames';

const Checkbox = ({
    name,
    value,
    onChange,
    width = 40,
    height = 40,
    className = '',
    icon=''
}) => {

    const checkboxClasses = classNames(
        styles.checkbox,
    );

    return (
        <>
            <label htmlFor={name} style={{
                width: width,
                height: height,
            }}
            className={checkboxClasses}>
                {icon}
            </label>
            <input 
                type="checkbox"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className={`hidden ${className}`}
                autoComplete='off'
            />
        </>
    );
}

export default Checkbox;