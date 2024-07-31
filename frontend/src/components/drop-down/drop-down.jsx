import React, { useState } from 'react';
import { CaretDownOutlined, LoadingOutlined } from '@ant-design/icons'
import styles from './drop-down.module.css';
import { Flex } from 'antd';

const DropDown = ({
    currentProfile = 'Не выбран',
    availableProfiles = [],
    loading = false,
    onClick = () => { }
}) => {

    const [menuIsOpen, setModalState] = useState(false);

    const onArrowClickHandler = () => {
        setModalState(!menuIsOpen);
    }

    return (
        <Flex align='center'>
            <div className={`text mr-10 ${styles.dropDown}`}>
                <div className='currentItem mr-6'>{currentProfile}</div>
                <div>
                    <CaretDownOutlined
                        onClick={onArrowClickHandler}
                        className={`${menuIsOpen ? `${styles.arrowActive}` : ''}`} />
                    <ul className={`${styles.availablePoints} ${menuIsOpen ? '' : `${styles.availablePointsInActive}`}`}>
                        {availableProfiles.map(profile => (
                            <li key={profile}
                                className={`${styles.listElement} ${currentProfile === profile ? styles.listElementActive : ''}`}
                                onClick={e => onClick(profile)}
                            >
                                <div className={styles.listContent}>{profile}</div>

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
