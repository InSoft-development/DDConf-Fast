import React, { useState } from 'react';
import { CaretDownOutlined, LoadingOutlined } from '@ant-design/icons'
import styles from './drop-down.module.css';
import { Flex } from 'antd';
import classNames from 'classnames';

const DropDown = ({
    selectedOption = 'Не выбран',
    availableOptions = [],
    loading = false,
    onClick = () => { }
}) => {

    const [menuIsOpen, setModalState] = useState(false);

    const onArrowClickHandler = () => {
        setModalState(!menuIsOpen);
    }

    const optionsListStyle = classNames([
        [styles.availableOptions],
        {
            [styles.availableOptionsHidden] : !menuIsOpen
        }
    ])

    return (
        <Flex align='center'>
            <div className={`text mr-10 ${styles.dropDown}`}>
                <div className='mr-6'>{selectedOption}</div>
                <div>
                    <CaretDownOutlined
                        onClick={onArrowClickHandler}
                        className={`${menuIsOpen ? `${styles.arrowActive}` : ''}`} 
                    />
                    <ul className={optionsListStyle}>
                        {availableOptions.map(option => (
                            <li key={option}
                                className={`${styles.listElement} ${selectedOption === option ? styles.listElementActive : ''}`}
                                onClick={e => onClick(option)}
                            >
                                <div className={styles.listContent}>{option}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {loading && (
                <LoadingOutlined style={{ fontSize: 15 }} />
            )}
        </Flex>
    );
}

export default DropDown;
