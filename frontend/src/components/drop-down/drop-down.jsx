import React, { useEffect, useState } from 'react';
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

    useEffect(() => {

        document.addEventListener('click', onClickOutside);

        return () => { document.removeEventListener('click', onClickOutside)};

    }, [])

    const onClickOutside = (e) => {
        setModalState(false)
    }
    

    const onArrowClickHandler = (e) => {
        e.stopPropagation();
        setModalState(!menuIsOpen);
    }

    const optionsListStyle = classNames([
        'no-select',
        [styles.availableOptions],
        {
            [styles.availableOptionsHidden]: !menuIsOpen
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
                                onClick={e => {
                                    e.stopPropagation();
                                    onClick(option)
                                }}
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


