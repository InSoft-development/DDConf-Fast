import React from "react";
import styles from './text.module.scss';

const Text = ({
    width = 400,
    height = 40,
    placeholder = "",
    name,
    value,
    onChange,
    className,
    disabled = false,
    loading,
    loadingIcon,
}) => {

    const isLoading = loading;

    return (
        <div className={styles.textWrapper}>
            <input
                type="text"
                id={name}
                name={name}
                value={value || ""}
                onChange={onChange}
                className={className}
                placeholder={placeholder}
                style={{
                    width: width,
                    height: height,
                }}
                autoComplete="off"
                disabled={disabled}
            />
            {isLoading && (
                <div className={styles.loadingIcon}
                    style={{
                        width: height,
                        height: height,
                    }}
                >
                    {loadingIcon}
                </div>
            )}
        </div>
    );
};

export default Text;
