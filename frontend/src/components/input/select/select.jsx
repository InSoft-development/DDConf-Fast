import React from 'react';
import styles from './select.module.scss';

const Select = ({
    options,
    name,
    value,
    onChange,
    loading,
    loadingIcon,
    width = 400,
    height = 42,
    disabled = false,
    defaultValue = undefined,
    className = ''
}) => {

    const isLoading = loading;

    return (
        <div className={styles.selectWrapper}>
            <select
                disabled={disabled}
                name={name}
                id={name}
                className={className}
                value={value}
                onChange={onChange}
                style={{
                    width: width,
                    height: height
                }}
            >
                {defaultValue && (
                    <option disabled hidden selected>{defaultValue}</option>
                )}
                {options.map(({ value, text }, index) => (
                    <option key={index} value={value}>{text}</option>
                ))}
            </select>
            {isLoading && (
                <div className={styles.loadingIcon}
                    style={{
                        width: height,
                        height: height
                    }}
                >
                    {loadingIcon}
                </div>
            )}
        </div>
    );
}

export default Select;
