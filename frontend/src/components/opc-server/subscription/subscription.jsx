import React from 'react';
import styles from './subscription.module.scss';
import { DeleteOutlined } from '@ant-design/icons';

const Subscription = ({subscriptionId: id, register, removeSubscription}) => {
    return (
        <div className={styles.wrapper}>
           <h3 className='text_type_main_medium text_bold'>Подписка {id + 1}</h3>
           <button type='button' className='btn-red btn-round' onClick={e => {
                e.preventDefault();
                removeSubscription(id);
           }}>
                <DeleteOutlined/>
           </button>
           1
        </div>
    );
}

export default Subscription;
