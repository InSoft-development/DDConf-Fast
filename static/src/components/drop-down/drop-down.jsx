import React, { useState } from 'react';
import { CaretDownOutlined } from '@ant-design/icons'
import styles from './drop-down.module.css';

const DropDown = ({ currentProfile = 'Не выбран', availableProfiles = [] }) => {

    const [menuIsOpen, setModalState] = useState(false);

    const onArrowClickHandler = () => {
        setModalState(!menuIsOpen);
    }

    const onProfileClickHandler = () => {

    }

    return (
        <div className={`text ${styles.dropDown}`}>
            <div className='currentItem mr-6'>{currentProfile}</div>
            <div>
                <CaretDownOutlined onClick={onArrowClickHandler} className={`${menuIsOpen ? `${styles.arrowActive}`: ''}`}/>
                <ul className={`${styles.availablePoints} ${menuIsOpen ? '' : `${styles.availablePointsInActive}`}`}>
                    {availableProfiles.map(profile => (
                        <li key={profile.id} className={`${styles.listElement} ${currentProfile === profile.name ? styles.listElementActive : ''}`}>
                            <div className={styles.listContent}>{profile.name}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DropDown;
