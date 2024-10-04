import React, { useEffect, useState } from 'react';
import { CaretDownOutlined, LoadingOutlined } from '@ant-design/icons'
import styles from './drop-down.module.scss';
import { Flex } from 'antd';
import classNames from 'classnames';

const DropDown = ({
    selectedOption,
    availableOptions = [],
    loading = false,
    onClick = () => { },
    activeOption = null
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

    const trimOption = (optionName, value) => {

        if(optionName.length >= value){
            return optionName.substring(0 , value - 1) + ' ...';
        }

        return optionName;        
    }

    return (
        <Flex align='center'>
            <div className={`text_type_main_default mr-10 ${styles.dropDown}`}
                onClick={onArrowClickHandler}
            >
                <div className='mr-6'
                    title={selectedOption ? selectedOption : 'Не задан'}
                >{selectedOption ? trimOption(selectedOption, 12) : 'Не задан'}</div>
                <div>
                    <CaretDownOutlined
                        onClick={onArrowClickHandler}
                        className={`${menuIsOpen ? `${styles.arrowActive}` : ''}`}
                    />
                    <ul className={optionsListStyle}>
                        {availableOptions.map(option => (
                            <li key={option}
                                title={option}
                                className={`${styles.listElement} ${selectedOption === option ? styles.listElementActive : ''}`}
                                onClick={e => {
                                    e.stopPropagation();
                                    onArrowClickHandler(e);
                                    onClick(option)
                                }}
                            >
                                <div className={styles.listContent}>
                                    {trimOption(option, 20)}
                                    {activeOption === option && (
                                        <sup className={`ml-a ${styles.activeOption}`}>активный</sup>
                                    )}
                                </div>
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


