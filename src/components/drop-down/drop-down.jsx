import React, { useState } from 'react';
import { CaretDownOutlined, LoadingOutlined } from '@ant-design/icons'
import styles from './drop-down.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfile } from '../../services/actions/profile';

const DropDown = ({ currentProfile = 'Не выбран', availableProfiles = [] }) => {

    const dispatch = useDispatch();
    const [menuIsOpen, setModalState] = useState(false);
    const [nextProfile, setNextProfile] = useState(null);
    const {changeProfileRequest} = useSelector(store => store.profile);

    const onArrowClickHandler = () => {
        setModalState(!menuIsOpen);
    }

    const onProfileClickHandler = (profile) => {
        dispatch(changeProfile(profile))
        setNextProfile(profile);
    }

    return (
        <div className={`text ${styles.dropDown}`}>
            <div className='currentItem mr-6'>{currentProfile}</div>
            <div>
                <CaretDownOutlined onClick={onArrowClickHandler} className={`${menuIsOpen ? `${styles.arrowActive}`: ''}`}/>
                <ul className={`${styles.availablePoints} ${menuIsOpen ? '' : `${styles.availablePointsInActive}`}`}>
                    {availableProfiles.map(profile => (
                        <li key={profile} 
                            className={`${styles.listElement} ${currentProfile === profile ? styles.listElementActive : ''}`}
                            onClick={e => onProfileClickHandler(profile)}
                            >
                            <div className={styles.listContent}>{profile}</div>
                            {(profile === nextProfile && changeProfileRequest) ? (
                                <LoadingOutlined/>
                            ) : (
                                <></>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DropDown;
